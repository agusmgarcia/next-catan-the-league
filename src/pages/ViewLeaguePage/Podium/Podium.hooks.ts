import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type PodiumProps from "./Podium.types";

export default function usePodium(props: PodiumProps) {
  const { league } = useLeague();
  const { matches: matchesFromStore } = useMatches();
  const { users: usersFromStore } = useUsers();

  const [ready, setReady] = useState(false);
  const [transitions, setTransitions] = useState(false);

  const matches = useMemo(
    () =>
      matchesFromStore
        .filter((m) => m.leagueId === league?.id)
        .filter((m) => m.players.every((p) => !!p.approved)),
    [league?.id, matchesFromStore],
  );

  const players = useMemo(() => {
    const users = usersFromStore.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    const players = league?.players
      .map((p) => ({
        ...p,
        name: users[p.id]?.name || "Unknown",
        photoURL: users[p.id]?.photoURL || undefined,
        points: matches
          .map((m) => m.players.find((mp) => mp.id === p.id)?.points || 0)
          .reduce((result, points) => result + points, 0),
        victoriesCount: matches.filter((m) => m.winnerId === p.id).length,
      }))
      .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
      .sort((p1, p2) =>
        sorts.byNumberDesc(p1.victoriesCount, p2.victoriesCount),
      );

    return [players?.at(1), players?.at(0), players?.at(2)];
  }, [league?.players, matches, usersFromStore]);

  const completed = useMemo(
    () => (!!league?.id ? matches.length >= league.matchesCount : false),
    [league?.id, league?.matchesCount, matches.length],
  );

  useEffect(() => {
    if (!window.__VIEW_LEAGUE_PAGE__PODIUM__RENDERED__) {
      window.__VIEW_LEAGUE_PAGE__PODIUM__RENDERED__ = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransitions(true);
    }

    const handler = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(handler);
  }, []);

  return { ...props, completed, players, ready, transitions };
}
