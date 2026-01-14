import { useLeague } from "#src/store";

import type ViewRulesPageProps from "./ViewRulesPage.types";

export default function useViewRulesPage(props: ViewRulesPageProps) {
  const { league } = useLeague();

  return {
    ...props,
    error: "Page not ready. Please come back later.",
    heading: league?.name,
  };
}
