import { createReactStore } from "@agusmgarcia/react-essentials-store";

import { LeagueIdSlice } from "./LeagueIdSlice";
import { LeagueSlice, type LeagueSliceTypes } from "./LeagueSlice";
import { LeaguesSlice, type LeaguesSliceTypes } from "./LeaguesSlice";
import { MatchesSlice, type MatchesSliceTypes } from "./MatchesSlice";
import { ProfileSlice, type ProfileSliceTypes } from "./ProfileSlice";
import { UserSlice, type UserSliceTypes } from "./UserSlice";
import { UsersSlice, type UsersSliceTypes } from "./UsersSlice";

export type League = NonNullable<LeagueSliceTypes.Response>;
export type Leagues = NonNullable<LeaguesSliceTypes.Response>;
export type Matches = NonNullable<MatchesSliceTypes.Response>;
export type Profile = NonNullable<ProfileSliceTypes.Response>;
export type User = NonNullable<UserSliceTypes.Response>;
export type Users = NonNullable<UsersSliceTypes.Response>;

const { useSelector, ...reactStore } = createReactStore({
  slices: {
    league: LeagueSlice,
    leagueId: LeagueIdSlice,
    leagues: LeaguesSlice,
    matches: MatchesSlice,
    profile: ProfileSlice,
    user: UserSlice,
    users: UsersSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useLeague() {
  return {
    league: useSelector((state) => state.league.response),
    leagueError: useSelector(
      (state) => state.leagueId.error || state.league.error,
    ),
    leagueId: useSelector((state) => state.leagueId.response),
    leagueLoading: useSelector(
      (state) => state.leagueId.loading || state.league.loading,
    ),
    setLeagueId: useSelector((state) => state.leagueId.set),
  };
}

export function useLeagues() {
  return {
    createLeague: useSelector((state) => state.leagues.createLeague),
    leagues: useSelector((state) => state.leagues.response),
    leaguesError: useSelector((state) => state.leagues.error),
    leaguesLoading: useSelector((state) => state.leagues.loading),
  };
}

export function useMatches() {
  return {
    approveMatch: useSelector((state) => state.matches.approveMatch),
    createMatch: useSelector((state) => state.matches.createMatch),
    matches: useSelector((state) => state.matches.response),
    matchesError: useSelector((state) => state.matches.error),
    matchesLoading: useSelector((state) => state.matches.loading),
    rejectMatch: useSelector((state) => state.matches.rejectMatch),
  };
}

export function useProfile() {
  return {
    profile: useSelector((state) => state.profile.response),
    profileError: useSelector((state) => state.profile.error),
    profileLoading: useSelector((state) => state.profile.loading),
    setProfileId: useSelector((state) => state.profile.setId),
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
  return {
    users: useSelector((state) => state.users.response),
    usersError: useSelector((state) => state.users.error),
    usersLoading: useSelector((state) => state.users.loading),
  };
}
