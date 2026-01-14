import { errors } from "@agusmgarcia/react-essentials-utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague, useMatches, useUsers } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueId = useParams()?.id;
  const { replace } = useRouter();

  const { league, leagueError, leagueLoading, setLeagueId } = useLeague();
  const { matchesError, matchesLoading } = useMatches();
  const { usersError, usersLoading } = useUsers();

  const error = useMemo(
    () => errors.getMessage(leagueError || matchesError || usersError),
    [leagueError, matchesError, usersError],
  );

  const loading = useMemo(
    () => leagueLoading || matchesLoading || usersLoading,
    [leagueLoading, matchesLoading, usersLoading],
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
    loading,
  };
}
