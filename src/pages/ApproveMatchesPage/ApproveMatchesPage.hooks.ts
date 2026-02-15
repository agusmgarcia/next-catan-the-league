import { dates, sorts, strings } from "@agusmgarcia/react-essentials-utils";
import { useMemo, useState } from "react";

import {
  type Leagues,
  useLeague,
  useLeagues,
  useMatches,
  type Users,
  useUser,
  useUsers,
} from "#src/store";
import { arrays } from "#src/utils";

import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function useApproveMatchesPage({
  past: pastFromProps,
  ...rest
}: ApproveMatchesPageProps) {
  const { league } = useLeague();
  const { leagues } = useLeagues();
  const { approveMatch, matches, rejectMatch } = useMatches();
  const { user } = useUser();
  const { users } = useUsers();

  const [state, setState] = useState<State>();

  const groupOfMatches = useMemo(() => {
    const recordOfUsers = users.reduce(
      (result, user) => {
        result[user.id] = user;
        return result;
      },
      {} as Record<string, Users[number]>,
    );

    const recordOfLeagues = leagues.reduce(
      (result, league) => {
        result[league.id] = league;
        return result;
      },
      {} as Record<string, Leagues[number]>,
    );

    return arrays
      .groupBy(
        !!user?.id
          ? matches
              .filter(
                (m) =>
                  typeof m.players.find((p) => p.id === user.id)?.approved ===
                  (!pastFromProps ? "undefined" : "boolean"),
              )
              .map((m) => {
                const league = recordOfLeagues[m.leagueId];
                if (!league) return undefined;

                return {
                  createdAt: m.createdAt,
                  id: m.id,
                  league: {
                    id: league.id,
                    name: league.name,
                  },
                  observations: m.observations,
                  photoURL: m.photoURL,
                  players: m.players
                    .map((p1) => ({
                      approved: p1.approved,
                      color:
                        league.players.find((p2) => p2.id === p1.id)?.color ||
                        undefined,
                      id: p1.id,
                      name: recordOfUsers[p1.id]?.name || "Unknown",
                      photoURL: recordOfUsers[p1.id]?.photoURL || undefined,
                      points: p1.points,
                      winner: m.winnerId === p1.id,
                    }))
                    .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
                    .sort((p1, p2) => sorts.byBooleanAsc(p1.winner, p2.winner)),
                };
              })
              .filter((m) => !!m)
              .sort((m1, m2) => sorts.byNumberDesc(m1.createdAt, m2.createdAt))
          : [],
        (match) => match.league.id,
      )
      .sort((group1, group2) =>
        sorts.byBooleanAsc(
          group1.group === league?.id,
          group2.group === league?.id,
        ),
      )
      .map((group) => ({
        count: strings.replace(
          "${matchesLength} ${matchesLength?match:matches}",
          { matchesLength: group.values.length },
        ),
        id: group.group,
        matches: group.values.map((m) => ({
          approve: () => {
            setState({ matchId: m.id, type: "approve" });
            approveMatch(m.id).finally(() => setState(undefined));
          },
          approveDisabled: !!state?.matchId,
          approveLoading: state?.matchId === m.id && state.type === "approve",
          createdAt: dates.toDateString(dates.toString(m.createdAt), "en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          id: m.id,
          observations: m.observations,
          photoURL: m.photoURL,
          players: m.players,
          reject: () => {
            setState({ matchId: m.id, type: "reject" });
            rejectMatch(m.id).finally(() => setState(undefined));
          },
          rejectDisabled: !!state?.matchId,
          rejectLoading: state?.matchId === m.id && state.type === "reject",
          status: !!pastFromProps
            ? !!m.players.find((p) => p.id === user?.id)?.approved
              ? ("Approved" as const)
              : ("Rejected" as const)
            : undefined,
        })),
        name: group.values[0].league.name,
      }));
  }, [
    approveMatch,
    league,
    leagues,
    matches,
    pastFromProps,
    rejectMatch,
    state,
    user,
    users,
  ]);

  return {
    ...rest,
    leagues: groupOfMatches,
    past: pastFromProps,
  };
}

type State = {
  matchId: string;
  type: "approve" | "reject";
};
