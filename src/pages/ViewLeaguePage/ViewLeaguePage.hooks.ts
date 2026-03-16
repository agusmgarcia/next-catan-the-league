import { strings } from "@agusmgarcia/react-essentials-utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague, useMatches } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueIdFromParams = useParams()?.["id"];

  const { league: leagueFromStore, leagueId, setLeagueId } = useLeague();
  const { matches: matchesFromStore } = useMatches();

  const league = useMemo(() => {
    if (!leagueFromStore?.id) return undefined;

    const matches = matchesFromStore.filter(
      (m) =>
        m.leagueId === leagueFromStore.id &&
        m.players.every((p) => !!p.approved),
    );

    return {
      completed: matches.length >= leagueFromStore.matchesCount,
      id: leagueFromStore.id,
      matchesCount:
        matches.length !== leagueFromStore.matchesCount
          ? strings.replace(
              "${matchesLength} of ${totalMatches} ${totalMatches?match:matches}",
              {
                matchesLength: matches.length,
                totalMatches: leagueFromStore.matchesCount,
              },
            )
          : strings.replace("${totalMatches} ${totalMatches?match:matches}", {
              totalMatches: leagueFromStore.matchesCount,
            }),
    };
  }, [leagueFromStore, matchesFromStore]);

  useEffect(() => {
    if (leagueId === leagueIdFromParams) return;
    if (Array.isArray(leagueIdFromParams)) return;
    if (!leagueIdFromParams) return;
    setLeagueId(leagueIdFromParams);
  }, [leagueId, leagueIdFromParams, setLeagueId]);

  return { ...props, league };
}
