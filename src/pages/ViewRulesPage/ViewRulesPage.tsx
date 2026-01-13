import { Layout } from "#src/fragments";

import useViewRulesPage from "./ViewRulesPage.hooks";
import type ViewRulesPageProps from "./ViewRulesPage.types";

export default function ViewRulesPage(props: ViewRulesPageProps) {
  const { ...rest } = useViewRulesPage(props);

  return <Layout {...rest} />;
}
