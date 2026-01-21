import { strings } from "@agusmgarcia/react-essentials-utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useLeague, useMatches } from "#src/store";

import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function useViewLeaguePage(props: ViewLeaguePageProps) {
  const leagueIdFromParams = useParams()?.id;

  const { league: leagueFromStore, leagueId, setLeagueId } = useLeague();
  const { matches } = useMatches();

  const league = useMemo(
    () =>
      !!leagueFromStore?.id
        ? {
            id: leagueFromStore.id,
            matchesCount: strings.replace(
              "${matchesLength} of ${totalMatches} ${totalMatches?match:matches}",
              {
                matchesLength: matches.filter(
                  (m) =>
                    m.leagueId === leagueFromStore.id &&
                    m.players.every((p) => !!p.approved),
                ).length,
                totalMatches: leagueFromStore.matchesCount,
              },
            ),
          }
        : undefined,
    [leagueFromStore?.id, leagueFromStore?.matchesCount, matches],
  );

  useEffect(() => {
    if (leagueId === leagueIdFromParams) return;
    if (Array.isArray(leagueIdFromParams)) return;
    if (!leagueIdFromParams) return;
    setLeagueId(leagueIdFromParams);
  }, [leagueId, leagueIdFromParams, setLeagueId]);

  return { ...props, league };
}
