import {
  dates,
  errors,
  sorts,
  strings,
} from "@agusmgarcia/react-essentials-utils";
import { useMemo, useState } from "react";

import unknown from "#public/assets/unknown.webp";
import {
  type Leagues,
  useLeague,
  useLeagues,
  useMatches,
  type Users,
  useUser,
  useUsers,
} from "#src/store";
import { groupByArrays } from "#src/utils";

import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function useApproveMatchesPage({
  past: pastFromProps,
  ...rest
}: ApproveMatchesPageProps) {
  const { league, leagueError, leagueLoading } = useLeague();
  const { leagues, leaguesError, leaguesLoading } = useLeagues();
  const { approveMatch, matches, matchesError, matchesLoading, rejectMatch } =
    useMatches();
  const { user, userError, userLoading } = useUser();
  const { users, usersError, usersLoading } = useUsers();

  const [state, setState] = useState<State>();

  const error = useMemo(
    () =>
      errors.getMessage(
        leagueError || leaguesError || matchesError || userError || usersError,
      ),
    [leagueError, leaguesError, matchesError, userError, usersError],
  );

  const loading = useMemo(
    () =>
      leagueLoading ||
      leaguesLoading ||
      matchesLoading ||
      userLoading ||
      usersLoading,
    [leagueLoading, leaguesLoading, matchesLoading, userLoading, usersLoading],
  );

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

    return groupByArrays(
      !!user?.id
        ? matches
            .filter(
              (m) =>
                typeof m.players.find((p) => p.id === user.id)?.approved ===
                (!pastFromProps ? "undefined" : "boolean"),
            )
            .map((m) => {
              const league = recordOfLeagues[m.leagueId];

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
                      "blue",
                    id: p1.id,
                    name: recordOfUsers[p1.id]?.name || "Unknown",
                    photoURL: recordOfUsers[p1.id]?.photoURL || unknown.src,
                    points: p1.points,
                    winner: m.winnerId === p1.id,
                  }))
                  .sort((p1, p2) => sorts.byNumberDesc(p1.points, p2.points))
                  .sort((p1, p2) => sorts.byBooleanAsc(p1.winner, p2.winner)),
              };
            })
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
          approveVisible: !m.players.find((p) => p.id === user?.id)?.approved,
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
          rejectVisible:
            m.players.find((p) => p.id === user?.id)?.approved !== false,
        })),
        name: group.values[0].league.name,
      }));
  }, [
    approveMatch,
    league?.id,
    leagues,
    matches,
    pastFromProps,
    rejectMatch,
    state?.matchId,
    state?.type,
    user?.id,
    users,
  ]);

  return {
    ...rest,
    error,
    heading: !pastFromProps ? "Approve matches" : "View past matches",
    leagues: groupOfMatches,
    loading,
    past: pastFromProps,
    title: ["Leagues", "View past"],
  };
}

type State = {
  matchId: string;
  type: "approve" | "reject";
};
