import { dates } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  useLeague,
  useMatches,
  type Users,
  useUser,
  useUsers,
} from "#src/store";

import type CreateMatchPageProps from "./CreateMatchPage.types";

export default function useCreateMatchPage(props: CreateMatchPageProps) {
  const { push } = useRouter();

  const attachScreenshotInputRef = useRef<HTMLInputElement>(null);

  const { league } = useLeague();
  const { createMatch, matches } = useMatches();
  const { user } = useUser();
  const { users } = useUsers();

  const [state, setState] = useState(getDefaultState);
  const [submitting, setSubmitting] = useState(false);

  const completed = useMemo(() => {
    if (!league) return false;

    const matchesLength = matches.filter(
      (m) => m.leagueId === league.id && m.players.every((p) => !!p.approved),
    ).length;

    return matchesLength >= league.matchesCount;
  }, [league, matches]);

  const submitDisabled = useMemo(
    () => submitting || !league?.id || !state.winnerId || !user?.id,
    [league?.id, state.winnerId, submitting, user?.id],
  );

  const match = useMemo(() => {
    const recordOfUsers = users.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    return {
      createdAt: dates.toDateString(dates.getCurrentDate(), "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      players:
        league?.players.map((p) => ({
          admin: p.admin,
          color: p.color,
          id: p.id,
          name: recordOfUsers[p.id]?.name || "Unknown",
          photoURL: recordOfUsers[p.id]?.photoURL || undefined,
        })) || [],
    };
  }, [league?.players, users]);

  const onChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => {
    const name = event.target.name;

    if (name === "winnerId" || name === "observations")
      return setState((prevState) => ({
        ...prevState,
        [name]: event.target.value,
      }));

    if (name === "photoURL") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      return setState((prevState) => ({
        ...prevState,
        [name]: URL.createObjectURL(file),
      }));
    }

    const playerId = name.replace(/^points\.(.*)$/, "$1");

    return setState((prevState) => {
      const newState: State = {
        ...prevState,
        players: {
          ...prevState.players,
          [playerId]: {
            ...prevState.players[playerId],
            points: (event.target as HTMLInputElement).valueAsNumber,
          },
        },
      };

      const winnerIds = new Array<string>();
      let maxPoints = -1;

      const playerIds = Object.keys(newState.players);

      for (const playerId of playerIds) {
        const points = newState.players[playerId].points;
        if (isNaN(points)) continue;
        if (points < maxPoints) continue;

        if (points === maxPoints) {
          winnerIds.push(playerId);
          continue;
        }

        maxPoints = points;
        winnerIds.length = 0;
        winnerIds.push(playerId);
      }

      if (winnerIds.length !== 1) newState.winnerId = "";
      else newState.winnerId = winnerIds[0];

      newState.winnerDisabled = Object.keys(newState.winnerDisabled).reduce(
        (result, playerId) => {
          result[playerId] = !winnerIds.includes(playerId);
          return result;
        },
        {} as State["winnerDisabled"],
      );

      return newState;
    });
  }, []);

  const onAttachScreenshotClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    const attachScreenshotInput = attachScreenshotInputRef.current;
    if (!attachScreenshotInput) return;
    attachScreenshotInput.click();
  }, []);

  const onClearPhotoURLClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    setState((prevState) => ({ ...prevState, photoURL: "" }));
  }, []);

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(() => {
    if (!league?.id) return;

    setSubmitting(true);
    createMatch({
      leagueId: league.id,
      observations: state.observations,
      photoURL: state.photoURL,
      players: Object.keys(state.players).map((playerId) => ({
        approved: state.players[playerId].approved || undefined,
        id: playerId,
        points: state.players[playerId].points,
      })),
      winnerId: state.winnerId,
    })
      .then(() => push(`/leagues/${league.id}/view`))
      .catch(() => setSubmitting(false));
  }, [
    createMatch,
    league?.id,
    push,
    state.observations,
    state.photoURL,
    state.players,
    state.winnerId,
  ]);

  useEffect(() => {
    setState({
      observations: "",
      photoURL: "",
      players: match.players.reduce(
        (result, u) => {
          result[u.id] = { approved: !u.admin || user?.id === u.id, points: 0 };
          return result;
        },
        {} as State["players"],
      ),
      winnerDisabled: match.players.reduce(
        (result, user) => {
          result[user.id] = false;
          return result;
        },
        {} as State["winnerDisabled"],
      ),
      winnerId: "",
    });
  }, [match.players, user?.id]);

  useEffect(() => {
    const photoURL = state.photoURL;
    return () => URL.revokeObjectURL(photoURL);
  }, [state.photoURL]);

  return {
    ...props,
    attachScreenshotInputRef,
    completed,
    match,
    onAttachScreenshotClick,
    onChange,
    onClearPhotoURLClick,
    onSubmit,
    state,
    submitDisabled,
    submitting,
  };
}

function getDefaultState(): State {
  return {
    observations: "",
    photoURL: "",
    players: {},
    winnerDisabled: {},
    winnerId: "",
  };
}

type State = {
  observations: string;
  photoURL: string;
  players: Record<string, { approved: boolean; points: number }>;
  winnerDisabled: Record<string, boolean>;
  winnerId: string;
};
