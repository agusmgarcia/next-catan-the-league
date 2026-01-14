import type ViewRulesPageProps from "./ViewRulesPage.types";

export default function useViewRulesPage(props: ViewRulesPageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
  };
}
