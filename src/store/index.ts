import { createReactStore } from "@agusmgarcia/react-essentials-store";

import { UserSlice, type UserSliceTypes } from "./UserSlice";

export type User = NonNullable<UserSliceTypes.Response>;

const { useSelector, ...reactStore } = createReactStore({
  slices: {
    user: UserSlice,
  },
});

export const StoreProvider = reactStore.StoreProvider;

export function useUser() {
  return {
    login: useSelector((state) => state.user.login),
    logout: useSelector((state) => state.user.logout),
    user: useSelector((state) => state.user.response),
    userError: useSelector((state) => state.user.error),
    userLoading: useSelector((state) => state.user.loading),
  };
}
