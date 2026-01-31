import { filters } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type CatanClientTypes } from "#src/apis";
import { useLeagues, useUser, useUsers } from "#src/store";

import type CreateLeaguePageProps from "./CreateLeaguePage.types";

export default function useCreateLeaguePage(props: CreateLeaguePageProps) {
  const { push } = useRouter();

  const { createLeague } = useLeagues();
  const { user } = useUser();
  const { users: usersFromStore } = useUsers();

  const [state, setState] = useState(getDefaultState);
  const [submitting, setSubmitting] = useState(false);

  const submitDisabled = useMemo(
    () =>
      submitting ||
      !state.name ||
      !state.matchesCount ||
      state.players.filter((p) => !!p.id).length < 2 ||
      state.players.every((p) => !p.admin) ||
      state.players.some((p) => !p.id && p.admin) ||
      state.players
        .filter((p) => !!p.id)
        .map((p) => p.id.toLowerCase())
        .filter(filters.distinct).length !==
        state.players.filter((p) => !!p.id).length,
    [state.matchesCount, state.name, state.players, submitting],
  );

  const users = useMemo(
    () =>
      usersFromStore.reduce(
        (result, user) => {
          result[user.id] = user.photoURL;
          return result;
        },
        {} as Record<string, string>,
      ),
    [usersFromStore],
  );

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const name = event.target.name;
      if (name === "name") {
        setState((prevState) => ({ ...prevState, [name]: event.target.value }));
        return;
      }

      if (name === "matchesCount") {
        setState((prevState) => ({
          ...prevState,
          [name]: event.target.valueAsNumber,
        }));
        return;
      }

      const [playerIndex, property] = name
        .replace(/^players\.(\d+)\.(\w+)$/, "$1.$2")
        .split(".");

      setState((prevState) => ({
        ...prevState,
        players: prevState.players.map((p, i) => {
          if (i !== +playerIndex) return p;

          if (property === "admin")
            return { ...p, [property]: event.target.checked };

          if (property === "id")
            return {
              ...p,
              admin: !!event.target.value ? p.admin : false,
              [property]: event.target.value,
            };

          return p;
        }),
      }));
    },
    [],
  );

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(() => {
    setSubmitting(true);
    createLeague({ ...state, players: state.players.filter((p) => !!p.id) })
      .then((leagueId) => push(`/leagues/${leagueId}/view`))
      .catch(() => setSubmitting(false));
  }, [createLeague, push, state]);

  useEffect(() => {
    if (!user) return;

    setState((prevState) => ({
      matchesCount: 0,
      name: "",
      players: prevState.players.map((p) =>
        p.color === user.defaultColor
          ? {
              admin: true,
              color: user.defaultColor,
              id: user.id,
            }
          : p,
      ),
    }));
  }, [user]);

  return {
    ...props,
    onChange,
    onSubmit,
    state,
    submitDisabled,
    submitting,
    users,
  };
}

function getDefaultState(): State {
  return {
    matchesCount: 0,
    name: "",
    players: [
      {
        admin: false,
        color: "blue",
        id: "",
      },
      {
        admin: false,
        color: "orange",
        id: "",
      },
      {
        admin: false,
        color: "red",
        id: "",
      },
      {
        admin: false,
        color: "white",
        id: "",
      },
      {
        admin: false,
        color: "brown",
        id: "",
      },
      {
        admin: false,
        color: "green",
        id: "",
      },
    ],
  };
}

type State = {
  matchesCount: number;
  name: string;
  players: {
    admin: boolean;
    color: CatanClientTypes.PlayerColor;
    id: string;
  }[];
};
