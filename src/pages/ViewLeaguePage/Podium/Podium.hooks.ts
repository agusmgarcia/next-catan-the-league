import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type PodiumProps from "./Podium.types";

export default function usePodium(props: PodiumProps) {
  const { league } = useLeague();
  const { matches } = useMatches();
  const { users } = useUsers();

  const [ready, setReady] = useState(false);
  const [transitions, setTransitions] = useState(false);

  const players = useMemo(() => {
    const recordOfUsers = users.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    const approvedMatches = matches.filter(
      (m) => m.leagueId === league?.id && m.players.every((p) => !!p.approved),
    );

    const players = league?.players
      .map((player) => ({
        ...player,
        name: recordOfUsers[player.id]?.name || "Unknown",
        photoURL: recordOfUsers[player.id]?.photoURL || undefined,
        points: approvedMatches
          .flatMap((m) => m.players)
          .filter((p) => p.id === player.id)
          .reduce((result, player) => {
            result += player.points;
            return result;
          }, 0),
        victoryCounts: approvedMatches.filter((m) => m.winnerId === player.id)
          .length,
      }))
      .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
      .sort((p1, p2) => sorts.byNumberDesc(p1.victoryCounts, p2.victoryCounts));

    return [players?.at(1), players?.at(0), players?.at(2)];
  }, [league?.id, league?.players, matches, users]);

  const leagueCompleted = useMemo(() => false, []); // TODO:

  useEffect(() => {
    if (!window.__VIEW_LEAGUE_PAGE__PODIUM__RENDERED__) {
      window.__VIEW_LEAGUE_PAGE__PODIUM__RENDERED__ = true;
      setTransitions(true);
    }

    const handler = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(handler);
  }, []);

  return { ...props, leagueCompleted, players, ready, transitions };
}
