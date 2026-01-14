import useViewLeaguesPage from "./ViewLeaguesPage.hooks";
import type ViewLeaguesPageProps from "./ViewLeaguesPage.types";

export default function ViewLeaguesPage(props: ViewLeaguesPageProps) {
  const { ...rest } = useViewLeaguesPage(props);

  return <div {...rest} />;
}
