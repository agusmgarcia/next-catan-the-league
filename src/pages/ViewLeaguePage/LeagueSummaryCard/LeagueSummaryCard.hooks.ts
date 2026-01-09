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

    const match = matches.find((m) => m.leagueId === league?.id);

    return (
      league?.players
        .map((player) => ({
          ...player,
          name: recordOfUsers[player.id]?.name || "Unknown",
          points: match?.players.find((p) => p.id === player.id)?.points || 0,
        }))
        .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points)) || []
    );
  }, [league?.id, league?.players, matches, users]);

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
