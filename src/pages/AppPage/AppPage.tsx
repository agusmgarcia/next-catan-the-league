import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";
import { Layout } from "./Layout";

export default function AppPage(props: AppPageProps) {
  const { children, ready, user, ...rest } = useAppPage(props);

  return (
    <main {...rest} className="h-dvh w-screen overflow-hidden bg-black">
      <div className="mx-auto h-full max-w-3xl overflow-hidden">
        {/* UNAUTHENTICATED LAYOUT */}
        {ready && !user && children}

        {/* AUTHENTICATED LAYOUT */}
        {ready && !!user && <Layout>{children}</Layout>}
      </div>
    </main>
  );
}
