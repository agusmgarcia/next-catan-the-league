import { Layout } from "#src/fragments";

import useCreateLeaguePage from "./CreateLeaguePage.hooks";
import type CreateLeaguePageProps from "./CreateLeaguePage.types";

export default function CreateLeaguePage(props: CreateLeaguePageProps) {
  const { ...rest } = useCreateLeaguePage(props);

  return <Layout {...rest} />;
}
