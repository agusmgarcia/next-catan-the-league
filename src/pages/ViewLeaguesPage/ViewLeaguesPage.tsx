import { Layout } from "#src/fragments";

import useViewLeaguesPage from "./ViewLeaguesPage.hooks";
import type ViewLeaguesPageProps from "./ViewLeaguesPage.types";

export default function ViewLeaguesPage(props: ViewLeaguesPageProps) {
  const { ...rest } = useViewLeaguesPage(props);

  return <Layout {...rest} />;
}
