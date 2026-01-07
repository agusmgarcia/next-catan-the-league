import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function useViewProfilePage(props: ViewProfilePageProps) {
  return {
    ...props,
    error: "Page not ready. Please come back later.",
    heading: "Profile",
    title: "Profile",
  };
}
