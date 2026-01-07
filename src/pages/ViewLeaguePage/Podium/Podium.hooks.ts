import { errors, sorts } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import unknown from "#public/assets/unknown.webp";
import { useLeague, useMatches, type Users, useUsers } from "#src/store";

import type PodiumProps from "./Podium.types";

export default function usePodium(props: PodiumProps) {
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

    const players = league?.players
      .map((player, index) => ({
        ...player,
        name: recordOfUsers[player.id]?.name || "Unknown",
        photoURL: recordOfUsers[player.id]?.photoURL || unknown.src,
        victoryPoints: match?.players.at(index)?.victoryPoints || 0,
      }))
      .sort((p1, p2) => sorts.byNumberDesc(p1.victoryPoints, p2.victoryPoints));

    return [players?.at(1), players?.at(0), players?.at(2)];
  }, [league?.id, league?.players, matches, users]);

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
