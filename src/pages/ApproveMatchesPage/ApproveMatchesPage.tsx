import { Layout } from "#src/fragments";

import useApproveMatchesPage from "./ApproveMatchesPage.hooks";
import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function ApproveMatchesPage(props: ApproveMatchesPageProps) {
  const { ...rest } = useApproveMatchesPage(props);

  return <Layout {...rest} />;
}
