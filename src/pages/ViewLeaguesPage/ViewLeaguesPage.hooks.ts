import type ViewLeaguesPageProps from "./ViewLeaguesPage.types";

export default function useViewLeaguesPage(props: ViewLeaguesPageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
  };
}
