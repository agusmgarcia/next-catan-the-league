import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league } = useLeague();
  const { matches: matchesFromStore } = useMatches();
  const { users: usersFromStore } = useUsers();

  const [ready, setReady] = useState(false);
  const [transitions, setTransitions] = useState(false);

  const players = useMemo(() => {
    const users = usersFromStore.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    const matches = matchesFromStore
      .filter((m) => m.leagueId === league?.id)
      .filter((m) => m.players.every((p) => !!p.approved));

    return (
      league?.players
        .map((p) => ({
          ...p,
          name: users[p.id]?.name || "Unknown",
          points: matches
            .map((m) => m.players.find((mp) => mp.id === p.id)?.points || 0)
            .reduce((result, points) => result + points, 0),
          profileId: users[p.id]?.profileId || "",
          victoryCounts: matches.filter((m) => m.winnerId === p.id).length,
        }))
        .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
        .sort((p1, p2) =>
          sorts.byNumberDesc(p1.victoryCounts, p2.victoryCounts),
        ) || []
    );
  }, [league?.id, league?.players, matchesFromStore, usersFromStore]);

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
