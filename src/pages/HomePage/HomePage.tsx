import { Layout } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";

export default function HomePage(props: HomePageProps) {
  const { ...rest } = useHomePage(props);

  return <Layout {...rest} />;
}
