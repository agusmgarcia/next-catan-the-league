import { errors } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague } from "#src/store";

import type PodiumProps from "./Podium.types";

export default function usePodium(props: PodiumProps) {
  const { league, leagueError, leagueLoading: playersLoading } = useLeague();

  const [ready, setReady] = useState(false);

  const playersError = useMemo(
    () => errors.getMessage(leagueError),
    [leagueError],
  );

  const players = useMemo(
    () => [
      league?.players?.at(1),
      league?.players?.at(0),
      league?.players?.at(2),
    ],
    [league?.players],
  );

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
