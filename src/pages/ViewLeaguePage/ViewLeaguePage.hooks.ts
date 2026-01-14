import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLeague } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueId = useParams()?.id;
  const { replace } = useRouter();

  const { league, setLeagueId } = useLeague();

  useEffect(() => {
    if (league?.id === leagueId) return;
    if (Array.isArray(leagueId)) return;
    setLeagueId(leagueId);
    replace("/");
  }, [league?.id, leagueId, replace, setLeagueId]);

  return { ...props };
}
