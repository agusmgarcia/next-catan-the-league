import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLeague } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { replace } = useRouter();

  const { leagueId } = useLeague();

  useEffect(() => {
    if (!leagueId) replace("/leagues/create");
    else replace(`/leagues/${leagueId}/view`);
  }, [leagueId, replace]);

  return { ...props };
}
