import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLeague, useUser } from "#src/store";

import type FooterProps from "./Footer.types";

export default function useFooter(props: FooterProps) {
  const pathname = usePathname();

  const { user, userLoading } = useUser();
  const { league, leagueLoading } = useLeague();

  const links = useMemo(
    () => [
      {
        href: !leagueLoading
          ? !!league?.id
            ? `/leagues/${league.id}/view`
            : "/leagues/create"
          : "/",
        icon: "home" as const,
        invisible: false,
        selected:
          pathname === "/" ||
          pathname === "/leagues/create" ||
          /^\/leagues\/(.*)\/view$/.test(pathname),
      },
      {
        href: "/leagues/view",
        icon: "list" as const,
        invisible: false,
        selected: pathname === "/leagues/view",
      },
      {
        href: "#",
        icon: "plus" as const,
        invisible: true,
        selected: false,
      },
      {
        href: "/leagues/approve",
        icon: "checkboxes" as const,
        invisible: false,
        selected: pathname === "/leagues/approve",
      },
      {
        href: !userLoading && !!user?.id ? `/profiles/${user.id}/view` : "#",
        icon: "profile" as const,
        invisible: false,
        selected: !!user?.id && pathname === `/profiles/${user.id}/view`,
      },
    ],
    [league?.id, leagueLoading, pathname, user?.id, userLoading],
  );

  return { ...props, league, leagueLoading, links };
}
