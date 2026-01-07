import { errors } from "@agusmgarcia/react-essentials-utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useUser } from "#src/store";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const { user, userError: userErrorFromStore, userLoading } = useUser();

  const userError = useMemo(
    () => errors.getMessage(userErrorFromStore),
    [userErrorFromStore],
  );

  useEffect(() => {
    if (userLoading || !!userError) return;
    if (!user && pathname !== "/login") replace("/login");
    else if (!!user && pathname === "/login") replace("/");
  }, [pathname, replace, user, userError, userLoading]);

  return { ...props };
}
