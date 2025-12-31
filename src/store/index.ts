import { createReactStore } from "@agusmgarcia/react-essentials-store";

import { LeaguesSlice, type LeaguesSliceTypes } from "./LeaguesSlice";
import { UserSlice, type UserSliceTypes } from "./UserSlice";

export type User = NonNullable<UserSliceTypes.Response>;
export type Leagues = NonNullable<LeaguesSliceTypes.Response>;

const { useSelector, ...reactStore } = createReactStore({
  slices: {
    leagues: LeaguesSlice,
    user: UserSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useLeagues() {
  const { userError, userLoading } = useUser();

  return {
    leagues: useSelector((state) => state.leagues.response),
    leaguesError: useSelector((state) => state.leagues.error) || userError,
    leaguesLoading:
      useSelector((state) => state.leagues.loading) || userLoading,
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
