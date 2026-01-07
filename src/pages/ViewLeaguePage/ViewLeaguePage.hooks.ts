import { errors } from "@agusmgarcia/react-essentials-utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague, useMatches } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueId = useParams()?.id;
  const { replace } = useRouter();

  const { league, leagueError, leagueLoading, setLeagueId } = useLeague();
  const { matchesError, matchesLoading } = useMatches();

  const error = useMemo(
    () => errors.getMessage(leagueError || matchesError),
    [leagueError, matchesError],
  );

  const loading = useMemo(
    () => leagueLoading || matchesLoading,
    [leagueLoading, matchesLoading],
  );

  useEffect(() => {
    if (leagueLoading) return;
    if (!!leagueError) return;
    if (league?.id === leagueId) return;
    if (Array.isArray(leagueId)) return;
    setLeagueId(leagueId);
    replace("/");
  }, [league?.id, leagueError, leagueId, leagueLoading, replace, setLeagueId]);

  return {
    ...props,
    error,
    heading: league?.name,
    loading,
    title: league?.name,
  };
}
