import { errors } from "@agusmgarcia/react-essentials-utils";
import { useEffect, useMemo, useState } from "react";

import { useLeague } from "#src/store";

import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function useLeagueSummaryCard(props: LeagueSummaryCardProps) {
  const {
    league,
    leagueError: leagueErrorFromStore,
    leagueLoading,
  } = useLeague();

  const [ready, setReady] = useState(false);

  const leagueError = useMemo(
    () => errors.getMessage(leagueErrorFromStore),
    [leagueErrorFromStore],
  );

  useEffect(() => {
    setReady(!leagueLoading && !leagueError);
  }, [leagueLoading, leagueError]);

  return { ...props, league, leagueError, leagueLoading, ready };
}
