import { errors, sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league, leagueError, leagueLoading } = useLeague();
  const { users, usersError, usersLoading } = useUsers();
  const { matches, matchesError, matchesLoading } = useMatches();

  const [ready, setReady] = useState(false);

  const playersError = useMemo(
    () => errors.getMessage(matchesError || leagueError || usersError),
    [leagueError, matchesError, usersError],
  );

  const playersLoading = useMemo(
    () => matchesLoading || leagueLoading || usersLoading,
    [leagueLoading, matchesLoading, usersLoading],
  );

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
    setReady(!playersLoading && !playersError);
  }, [playersLoading, playersError]);

  return {
    ...props,
    players,
    playersError,
    playersLoading,
    ready,
  };
}
