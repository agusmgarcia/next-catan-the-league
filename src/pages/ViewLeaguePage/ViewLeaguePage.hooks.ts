import { errors } from "@agusmgarcia/react-essentials-utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const { id: leagueId } = useParams();
  const { replace } = useRouter();

  const {
    league,
    leagueError: leagueErrorFromStore,
    leagueLoading,
    setLeagueId,
  } = useLeague();

  const leagueError = useMemo(
    () => errors.getMessage(leagueErrorFromStore),
    [leagueErrorFromStore],
  );

  useEffect(() => {
    if (leagueLoading) return;
    if (!!leagueError) return;
    if (league?.id === leagueId) return;
    if (Array.isArray(leagueId)) return;
    setLeagueId(leagueId);
    replace("/");
  }, [league?.id, leagueError, leagueId, leagueLoading, replace, setLeagueId]);

  return { ...props, league, leagueError, leagueLoading };
}
