import Head from "next/head";
import { twMerge } from "tailwind-merge";

import { Modal } from "#src/components";

import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { UnauthenticatedLayout } from "./UnauthenticatedLayout";

export default function AppPage(props: AppPageProps) {
  const { children, className, user, ...rest } = useAppPage(props);

  return (
    <main
      {...rest}
      className={twMerge("h-dvh w-screen overflow-hidden bg-black", className)}
    >
      <div className="mx-auto h-full max-w-3xl overflow-hidden">
        {/* TITLE */}
        <Head>
          <title>Catan - The League</title>
        </Head>

        {/* UNAUTHENTICATED LAYOUT */}
        {!user && <UnauthenticatedLayout />}

        {/* AUTHENTICATED LAYOUT */}
        {!!user && <AuthenticatedLayout>{children}</AuthenticatedLayout>}

        {/* MODAL PROVIDER */}
        <Modal.Provider />
      </div>
    </main>
  );
}
