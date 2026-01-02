import { errors } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import { useLeague } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { leagueError: leagueErrorFromStore, leagueLoading } = useLeague();

  const leagueError = useMemo(
    () => errors.getMessage(leagueErrorFromStore),
    [leagueErrorFromStore],
  );

  return { ...props, leagueError, leagueLoading };
}
