import Head from "next/head";

import { HomePage } from "#src/pages";

export default function Home() {
  return (
    <>
      <Head>
        <title>Catan - The League :: Home</title>
      </Head>

      <HomePage />
    </>
  );
}
