import { createReactStore } from "@agusmgarcia/react-essentials-store";

import { LeagueIdSlice } from "./LeagueIdSlice";
import { LeagueSlice, type LeagueSliceTypes } from "./LeagueSlice";
import { LeaguesSlice, type LeaguesSliceTypes } from "./LeaguesSlice";
import {
  MatchesForApprovalSlice,
  type MatchesForApprovalSliceTypes,
} from "./MatchesForApprovalSlice";
import { MatchesSlice, type MatchesSliceTypes } from "./MatchesSlice";
import { UserSlice, type UserSliceTypes } from "./UserSlice";
import { UsersSlice, type UsersSliceTypes } from "./UsersSlice";

export type League = NonNullable<LeagueSliceTypes.Response>;
export type Leagues = NonNullable<LeaguesSliceTypes.Response>;
export type Matches = NonNullable<MatchesSliceTypes.Response>;
export type MatchesForApproval =
  NonNullable<MatchesForApprovalSliceTypes.Response>;
export type User = NonNullable<UserSliceTypes.Response>;
export type Users = NonNullable<UsersSliceTypes.Response>;

const { useSelector, ...reactStore } = createReactStore({
  slices: {
    league: LeagueSlice,
    leagueId: LeagueIdSlice,
    leagues: LeaguesSlice,
    matches: MatchesSlice,
    matchesForApproval: MatchesForApprovalSlice,
    user: UserSlice,
    users: UsersSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useLeague() {
  const { leaguesError, leaguesLoading } = useLeagues();

  return {
    league: useSelector((state) => state.league.response),
    leagueError:
      useSelector((state) => state.leagueId.error || state.league.error) ||
      leaguesError,
    leagueLoading:
      useSelector((state) => state.leagueId.loading || state.league.loading) ||
      leaguesLoading,
    setLeagueId: useSelector((state) => state.leagueId.set),
  };
}

export function useLeagues() {
  const { userError, userLoading } = useUser();

  return {
    leagues: useSelector((state) => state.leagues.response),
    leaguesError: useSelector((state) => state.leagues.error) || userError,
    leaguesLoading:
      useSelector((state) => state.leagues.loading) || userLoading,
  };
}

export function useMatches() {
  return {
    matches: useSelector((state) => state.matches.response),
    matchesError: useSelector(
      (state) => state.leagueId.error || state.matches.error,
    ),
    matchesLoading: useSelector(
      (state) => state.leagueId.loading || state.matches.loading,
    ),
  };
}

export function useMatchesForApproval() {
  const { userError, userLoading } = useUser();

  return {
    matchesForApproval: useSelector(
      (state) => state.matchesForApproval.response,
    ),
    matchesForApprovalError:
      useSelector((state) => state.matchesForApproval.error) || userError,
    matchesForApprovalLoading:
      useSelector((state) => state.matchesForApproval.loading) || userLoading,
  };
}

export function useUser() {
  return {
    login: useSelector((state) => state.user.login),
    logout: useSelector((state) => state.user.logout),
    user: useSelector((state) => state.user.response),
    userError: useSelector((state) => state.user.error),
    userLoading: useSelector((state) => state.user.loading),
  };
}

export function useUsers() {
  const { userError, userLoading } = useUser();

  return {
    users: useSelector((state) => state.users.response),
    usersError: useSelector((state) => state.users.error) || userError,
    usersLoading: useSelector((state) => state.users.loading) || userLoading,
  };
}
