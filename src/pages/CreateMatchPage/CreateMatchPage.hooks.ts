import type CreateMatchPageProps from "./CreateMatchPage.types";

export default function useCreateMatchPage(props: CreateMatchPageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
    heading: "Create match",
    title: ["Matches", "Create"],
  };
}
