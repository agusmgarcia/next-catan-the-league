import { errors } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import unknown from "#public/assets/unknown.webp";
import { useLeague, type Users, useUsers } from "#src/store";

import type PodiumProps from "./Podium.types";

export default function usePodium(props: PodiumProps) {
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

    return [
      league?.players?.at(1),
      league?.players?.at(0),
      league?.players?.at(2),
    ].map((player) =>
      !!player
        ? {
            ...player,
            name: recordOfUsers[player.id]?.name || "Unknown",
            photoURL: recordOfUsers[player.id]?.photoURL || unknown.src,
          }
        : undefined,
    );
  }, [league?.players, users]);

  const leagueCompleted = useMemo(
    () => !!league?.completedAt,
    [league?.completedAt],
  );

  useEffect(() => {
    setReady(!playersLoading && !playersError);
  }, [playersError, playersLoading]);

  return {
    ...props,
    leagueCompleted,
    players,
    playersError,
    playersLoading,
    ready,
  };
}
