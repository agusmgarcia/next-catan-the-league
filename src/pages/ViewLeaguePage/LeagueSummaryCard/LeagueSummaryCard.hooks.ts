import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league } = useLeague();
  const { users } = useUsers();
  const { matches } = useMatches();

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

    const approvedMatches = matches.filter((m) =>
      m.players.every((p) => !!p.approved),
    );

    return (
      league?.players
        .map((player) => ({
          ...player,
          name: recordOfUsers[player.id]?.name || "Unknown",
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
        .sort((p1, p2) =>
          sorts.byNumberDesc(p1.victoryCounts, p2.victoryCounts),
        ) || []
    );
  }, [league?.players, matches, users]);

  useEffect(() => {
    if (!window.__VIEW_LEAGUE_PAGE__LEAGUE_SUMMARY_CARD__RENDERED__) {
      window.__VIEW_LEAGUE_PAGE__LEAGUE_SUMMARY_CARD__RENDERED__ = true;
      setTransitions(true);
    }

    const handler = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(handler);
  }, []);

  return { ...props, players, ready, transitions };
}
