import { errors } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { replace } = useRouter();

  const {
    league,
    leagueError: leagueErrorFromStore,
    leagueLoading,
  } = useLeague();

  const leagueError = useMemo(
    () => errors.getMessage(leagueErrorFromStore),
    [leagueErrorFromStore],
  );

  useEffect(() => {
    if (leagueLoading) return;
    if (!!leagueError) return;
    if (!league) replace("/leagues/create");
    else replace(`/leagues/${league.id}/view`);
  }, [league, leagueError, leagueLoading, replace]);

  return { ...props, leagueError, leagueLoading };
}
