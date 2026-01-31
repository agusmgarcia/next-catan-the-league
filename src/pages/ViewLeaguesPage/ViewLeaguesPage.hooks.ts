import { sorts, strings } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import {
  useLeague,
  useLeagues,
  useMatches,
  type Users,
  useUsers,
} from "#src/store";

import type ViewLeaguesPageProps from "./ViewLeaguesPage.types";

export default function useViewLeaguesPage(props: ViewLeaguesPageProps) {
  const { league } = useLeague();
  const { users: usersFromStore } = useUsers();
  const { leagues: leaguesFromStore } = useLeagues();
  const { matches: matchesFromStore } = useMatches();

  const users = useMemo(
    () =>
      usersFromStore.reduce(
        (result, user) => {
          result[user.id] = user;
          return result;
        },
        {} as Record<string, Users[number]>,
      ),
    [usersFromStore],
  );

  const leagues = useMemo(
    () =>
      leaguesFromStore
        .map((l) => {
          const matches = matchesFromStore
            .filter((m) => m.leagueId === l.id)
            .filter((m) => m.players.every((p) => !!p.approved));

          return {
            active: l.id === league?.id,
            completed: matches.length >= l.matchesCount,
            id: l.id,
            matchesCount:
              matches.length !== l.matchesCount
                ? strings.replace(
                    "${matchesLength} of ${totalMatches} ${totalMatches?match:matches}",
                    {
                      matchesLength: matches.length,
                      totalMatches: l.matchesCount,
                    },
                  )
                : strings.replace(
                    "${totalMatches} ${totalMatches?match:matches}",
                    { totalMatches: l.matchesCount },
                  ),
            name: l.name,
            players: l.players
              .map((p) => ({
                color: p.color,
                id: p.id,
                photoURL: users[p.id]?.photoURL,
                points: matches
                  .map(
                    (m) => m.players.find((mp) => mp.id === p.id)?.points || 0,
                  )
                  .reduce((result, points) => result + points, 0),
                victoriesCount: matches.filter((m) => m.winnerId === p.id)
                  .length,
              }))
              .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
              .sort((p1, p2) =>
                sorts.byNumberDesc(p1.victoriesCount, p2.victoriesCount),
              ),
            updatedAt: l.updatedAt,
          };
        })
        .sort((l1, l2) => sorts.byBooleanAsc(l1.active, l2.active)),
    [league?.id, leaguesFromStore, matchesFromStore, users],
  );

  return { ...props, leagues };
}
