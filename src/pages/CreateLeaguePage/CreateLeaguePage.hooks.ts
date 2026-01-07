import type CreateLeaguePageProps from "./CreateLeaguePage.types";

export default function useCreateLeaguePage(props: CreateLeaguePageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
    heading: "Create league",
    title: ["Leagues", "Create"],
  };
}
