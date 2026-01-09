import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const { user, userError, userLoading } = useUser();

  useEffect(() => {
    if (userLoading || !!userError) return;
    if (!user && pathname !== "/login") replace("/login");
    else if (!!user && pathname === "/login") replace("/");
  }, [pathname, replace, user, userError, userLoading]);

  return { ...props };
}
