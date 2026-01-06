import Head from "next/head";

import useTitle from "./Title.hooks";
import type TitleProps from "./Title.types";

export default function Title(props: TitleProps) {
  const { title, ...rest } = useTitle(props);

  return (
    <Head {...rest}>
      <title>{title}</title>
    </Head>
  );
}
