import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLeague, useProfile, useUser } from "#src/store";

import type HeaderProps from "./Header.types";

export default function useHeader(props: HeaderProps) {
  const pathname = usePathname();

  const { league } = useLeague();
  const { profile } = useProfile();
  const { logout, user } = useUser();

  const page = useMemo(() => {
    if (pathname === "/") return "home";
    if (/^\/profiles\/(.+)\/view$/.test(pathname)) return "viewProfile";
    if (/^\/leagues\/(\w+)\/view$/.test(pathname)) return "viewLeague";
    if (/^\/leagues\/(\w+)\/rules$/.test(pathname)) return "viewRules";
    if (/^\/leagues\/(\w+)\/matches\/create$/.test(pathname))
      return "createMatch";
    if (pathname === "/leagues/matches/approve") return "approveMatches";
    if (pathname === "/leagues/matches/past") return "viewPastMatches";
    if (pathname === "/leagues/create") return "createLeague";
    if (pathname === "/leagues/view") return "viewLeagues";
  }, [pathname]);

  const header = useMemo(() => {
    switch (page) {
      case "approveMatches":
        return "Approve matches";

      case "createMatch":
      case "home":
      case "viewLeague":
      case "viewRules":
        return league?.name || "";

      case "createLeague":
        return "Create league";

      case "viewLeagues":
        return "View leagues";

      case "viewPastMatches":
        return "View past matches";

      case "viewProfile":
        return "Profile";
    }
  }, [league?.name, page]);

  const iconLeft = useMemo(() => {
    const href =
      page === "viewPastMatches"
        ? "/leagues/matches/approve"
        : page === "viewLeagues"
          ? !league?.id
            ? "/leagues/create"
            : `/leagues/${league.id}/view`
          : page === "createLeague"
            ? !league?.id
              ? undefined
              : "/leagues/view"
            : undefined;

    if (!href) return undefined;
    return { href, icon: "arrowLeft" as const };
  }, [league?.id, page]);

  const iconRight = useMemo(() => {
    if (
      page === "home" ||
      page === "viewLeague" ||
      page === "viewRules" ||
      page === "createMatch"
    )
      return { href: "/leagues/view", icon: "switch" as const };

    if (page === "approveMatches")
      return { href: "/leagues/matches/past", icon: "hourglass" as const };

    if (
      page === "viewProfile" &&
      !!user?.profileId &&
      !!profile?.id &&
      user.profileId === profile.id
    )
      return { icon: "logout" as const, onClick: () => logout() };

    return undefined;
  }, [logout, page, profile?.id, user?.profileId]);

  return {
    ...props,
    header,
    iconLeft,
    iconRight,
  };
}
