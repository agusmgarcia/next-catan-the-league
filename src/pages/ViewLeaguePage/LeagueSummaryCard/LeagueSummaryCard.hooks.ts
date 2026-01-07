import { errors } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague, type Users, useUsers } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league, leagueError, leagueLoading } = useLeague();
  const { users, usersError, usersLoading } = useUsers();

  const [ready, setReady] = useState(false);

  const playersError = useMemo(
    () => errors.getMessage(leagueError || usersError),
    [leagueError, usersError],
  );

  const playersLoading = useMemo(
    () => leagueLoading || usersLoading,
    [leagueLoading, usersLoading],
  );

  const players = useMemo(() => {
    const recordOfUsers = users.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    // TODO: sort players by victory points.

    return (
      league?.players.map((player) => ({
        ...player,
        name: recordOfUsers[player.id]?.name || "Unknown",
        victoryPoints: 0, // TODO: get points
      })) || []
    );
  }, [league?.players, users]);

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
