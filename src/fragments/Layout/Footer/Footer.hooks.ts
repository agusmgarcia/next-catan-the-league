import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useUser } from "#src/store";

import type FooterProps from "./Footer.types";

export default function useFooter(props: FooterProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const links = useMemo(
    () => [
      {
        href: "/",
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
        icon: "add" as const,
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
        href: `/profiles/${user?.id || ""}/view`,
        icon: "profile" as const,
        invisible: false,
        selected: pathname === `/profiles/${user?.id || ""}/view`,
      },
    ],
    [pathname, user?.id],
  );

  return { ...props, links };
}
