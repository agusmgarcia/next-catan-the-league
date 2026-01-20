import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useLeague } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueIdFromParams = useParams()?.id;

  const { league, leagueId, setLeagueId } = useLeague();

  useEffect(() => {
    if (leagueId === leagueIdFromParams) return;
    if (Array.isArray(leagueIdFromParams)) return;
    if (!leagueIdFromParams) return;
    setLeagueId(leagueIdFromParams);
  }, [leagueId, leagueIdFromParams, setLeagueId]);

  return { ...props, league };
}
