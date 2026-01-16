import { errors } from "@agusmgarcia/react-essentials-utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  useLeague,
  useLeagues,
  useMatches,
  useProfile,
  useUser,
  useUsers,
} from "#src/store";

import type AuthenticatedLayoutProps from "./AuthenticatedLayout.types";

export default function useAuthenticatedLayout(
  props: AuthenticatedLayoutProps,
) {
  const pathname = usePathname();

  const { leagueError, leagueLoading } = useLeague();
  const { leaguesError, leaguesLoading } = useLeagues();
  const { matchesError, matchesLoading } = useMatches();
  const { profileError, profileLoading } = useProfile();
  const { userError, userLoading } = useUser();
  const { usersError, usersLoading } = useUsers();

  const error = useMemo(
    () =>
      errors.getMessage(
        leagueError ||
          leaguesError ||
          matchesError ||
          profileError ||
          userError ||
          usersError,
      ),
    [
      leagueError,
      leaguesError,
      matchesError,
      profileError,
      userError,
      usersError,
    ],
  );

  const loading = useMemo(
    () =>
      leagueLoading ||
      leaguesLoading ||
      matchesLoading ||
      profileLoading ||
      userLoading ||
      usersLoading,
    [
      leagueLoading,
      leaguesLoading,
      matchesLoading,
      profileLoading,
      userLoading,
      usersLoading,
    ],
  );

  const padding = useMemo(
    () => !/^\/profiles\/(.+)\/view$/.test(pathname),
    [pathname],
  );

  return { ...props, error, loading, padding };
}
