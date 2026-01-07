import { Layout } from "#src/fragments";

import useViewProfilePage from "./ViewProfilePage.hooks";
import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function ViewProfilePage(props: ViewProfilePageProps) {
  const { ...rest } = useViewProfilePage(props);

  return <Layout {...rest} />;
}
