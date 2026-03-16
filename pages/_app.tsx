import "./_app.css";

import { type AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";

import { AppPage } from "#src/pages";
import { StoreProvider } from "#src/store";

const catanFont = localFont({
  declarations: [{ prop: "size-adjust", value: "112.5%" }],
  display: "block",
  src: "../public/fonts/catan.woff2",
  style: "normal",
  variable: "--font-catan",
  weight: "normal",
});

export default function App({ Component }: AppProps<any>) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          href={`${process.env["APP_BASE_PATH"] || ""}/favicon.ico`}
          rel="icon"
          type="image/x-icon"
        />
      </Head>

      <StoreProvider>
        <AppPage className={catanFont.className}>
          <Component />
        </AppPage>
      </StoreProvider>
    </>
  );
}
