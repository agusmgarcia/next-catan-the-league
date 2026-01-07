import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function useApproveMatchesPage(props: ApproveMatchesPageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
    heading: "Approve matches",
    title: ["Leagues", "Approve"],
  };
}
