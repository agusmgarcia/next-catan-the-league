import { Layout } from "#src/fragments";

import useCreateMatchPage from "./CreateMatchPage.hooks";
import type CreateMatchPageProps from "./CreateMatchPage.types";

export default function CreateMatchPage(props: CreateMatchPageProps) {
  const { ...rest } = useCreateMatchPage(props);

  return <Layout {...rest} />;
}
