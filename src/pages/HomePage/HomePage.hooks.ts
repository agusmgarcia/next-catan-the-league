import { errors } from "@agusmgarcia/react-essentials-utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { replace } = useRouter();

  const { league, leagueError, leagueLoading: loading } = useLeague();

  const error = useMemo(() => errors.getMessage(leagueError), [leagueError]);

  useEffect(() => {
    if (loading) return;
    if (!!error) return;
    if (!league) replace("/leagues/create");
    else replace(`/leagues/${league.id}/view`);
  }, [league, error, loading, replace]);

  return { ...props, error, loading, title: "Home" };
}
