import { Typography } from "#src/components";

import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";

export default function AppPage(props: AppPageProps) {
  const { children, ...rest } = useAppPage(props);

  return (
    <main {...rest} className="h-dvh w-screen overflow-hidden bg-black">
      <div className="relative mx-auto h-full max-w-360 overflow-hidden">
        {children}

        <Typography className="absolute right-4 bottom-4 text-white">
          v{process.env.APP_VERSION || "0.0.0"}
        </Typography>
      </div>
    </main>
  );
}
