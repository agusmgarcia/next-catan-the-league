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
        href: "/",
        icon: "home" as const,
        invisible: false,
        selected:
          pathname === "/" ||
          (!!league?.id
            ? pathname === `/leagues/${league.id}/view`
            : pathname === "/leagues/create"),
      },
      {
        alert: undefined,
        href: !!league?.id ? `/leagues/${league.id}/rules` : "/#",
        icon: "rules" as const,
        invisible: false,
        selected: !!league?.id && pathname === `/leagues/${league.id}/rules`,
      },
      {
        alert: undefined,
        href: "/#",
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
        href: !!user?.profileId ? `/profiles/${user.profileId}/view` : "/#",
        icon: "profile" as const,
        invisible: false,
        selected:
          !!user?.profileId && pathname === `/profiles/${user.profileId}/view`,
      },
    ],
    [league, matches, pathname, user],
  );

  return { ...props, league, links };
}
