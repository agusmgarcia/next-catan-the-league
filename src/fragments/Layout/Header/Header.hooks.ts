import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLeague } from "#src/store";

import type HeaderProps from "./Header.types";

export default function useHeader(props: HeaderProps) {
  const pathname = usePathname();

  const { league } = useLeague();

  const page = useMemo(() => {
    if (pathname === "/") return "home";
    if (pathname === "/login") return "login";
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

      case "login":
        return "";

      case "viewLeagues":
        return "View leagues";

      case "viewPastMatches":
        return "View past matches";

      case "viewProfile":
        return "Profile";
    }
  }, [league?.name, page]);

  const swtichLeagueVisible = useMemo(
    () =>
      page === "createMatch" ||
      page === "home" ||
      page === "viewLeague" ||
      page === "viewRules",
    [page],
  );

  return { ...props, header, swtichLeagueVisible };
}
