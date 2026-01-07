import { sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league } = useLeague();
  const { users } = useUsers();
  const { matches } = useMatches();

  const [ready, setReady] = useState(false);

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
        .map((player, index) => ({
          ...player,
          name: recordOfUsers[player.id]?.name || "Unknown",
          victoryPoints: match?.players.at(index)?.victoryPoints || 0,
        }))
        .sort((p1, p2) =>
          sorts.byNumberDesc(p1.victoryPoints, p2.victoryPoints),
        ) || []
    );
  }, [league?.id, league?.players, matches, users]);

  useEffect(() => {
    setReady(true);
  }, []);

  return { ...props, players, ready };
}
