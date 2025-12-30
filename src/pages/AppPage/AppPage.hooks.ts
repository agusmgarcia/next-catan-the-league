import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import type AppPageProps from "./AppPage.types";

export default function useAppPage(props: AppPageProps) {
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (pathname === "/login") return;
    replace("/login");
  }, [pathname, replace]);

  return { ...props };
}
