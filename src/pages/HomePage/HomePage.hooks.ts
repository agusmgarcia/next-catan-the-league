import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLeague } from "#src/store";

import type HomePageProps from "./HomePage.types";

export default function useHomePage(props: HomePageProps) {
  const { replace } = useRouter();

  const { league } = useLeague();

  useEffect(() => {
    if (!league) replace("/leagues/create");
    else replace(`/leagues/${league.id}/view`);
  }, [league, replace]);

  return { ...props };
}
