import { errors } from "@agusmgarcia/react-essentials-utils";
import { useMemo } from "react";

import {
  useLeague,
  useLeagues,
  useMatches,
  useUser,
  useUsers,
} from "#src/store";

import type AuthenticatedLayoutProps from "./AuthenticatedLayout.types";

export default function useAuthenticatedLayout(
  props: AuthenticatedLayoutProps,
) {
  const { leagueError, leagueLoading } = useLeague();
  const { leaguesError, leaguesLoading } = useLeagues();
  const { matchesError, matchesLoading } = useMatches();
  const { userError, userLoading } = useUser();
  const { usersError, usersLoading } = useUsers();

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

  return { ...props, error, loading };
}
