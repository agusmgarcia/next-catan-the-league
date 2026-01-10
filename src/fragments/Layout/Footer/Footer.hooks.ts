import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLeague, useMatches, useUser } from "#src/store";

import type FooterProps from "./Footer.types";

export default function useFooter(props: FooterProps) {
  const pathname = usePathname();

  const { user } = useUser();
  const { league } = useLeague();
  const { matches } = useMatches();

  const links = useMemo(
    () => [
      {
        alert: undefined,
        href: !!league?.id ? `/leagues/${league.id}/view` : "/leagues/create",
        icon: "home" as const,
        invisible: false,
        selected:
          pathname === "/" ||
          pathname === "/leagues/create" ||
          /^\/leagues\/(.*)\/view$/.test(pathname),
      },
      {
        alert: undefined,
        href: "/leagues/view",
        icon: "list" as const,
        invisible: false,
        selected: pathname === "/leagues/view",
      },
      {
        alert: undefined,
        href: "#",
        icon: "plus" as const,
        invisible: true,
        selected: false,
      },
      {
        alert:
          !!user?.id && !!matches
            ? matches.filter(
                (m) =>
                  typeof m.players.find((p) => p.id === user.id)?.approved ===
                  "undefined",
              ).length
            : undefined,
        href: "/leagues/matches/approve",
        icon: "checkboxes" as const,
        invisible: false,
        selected: pathname === "/leagues/matches/approve",
      },
      {
        alert: undefined,
        href: !!user?.id ? `/profiles/${user.id}/view` : "#",
        icon: "profile" as const,
        invisible: false,
        selected: !!user?.id && pathname === `/profiles/${user.id}/view`,
      },
    ],
    [league?.id, matches, pathname, user?.id],
  );

  return { ...props, league, links };
}
