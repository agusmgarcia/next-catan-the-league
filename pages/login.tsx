import Head from "next/head";

import { LoginPage } from "#src/pages";

export default function Login() {
  return (
    <>
      <Head>
        <title>Catan - The League :: Login</title>
      </Head>

      <LoginPage />
    </>
  );
}
