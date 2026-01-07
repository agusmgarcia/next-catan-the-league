import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";

export default function AppPage(props: AppPageProps) {
  const { children, ...rest } = useAppPage(props);

  return (
    <main {...rest} className="h-dvh w-screen overflow-hidden bg-black">
      <div className="mx-auto h-full max-w-3xl overflow-hidden">{children}</div>
    </main>
  );
}
