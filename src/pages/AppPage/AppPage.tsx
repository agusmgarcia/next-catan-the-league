import papyrusBlur from "#public/assets/papyrus.blur.svg";
import papyrus from "#public/assets/papyrus.webp";
import { Icon, Image } from "#src/components";
import { Alert } from "#src/components";

import useAppPage from "./AppPage.hooks";
import type AppPageProps from "./AppPage.types";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function AppPage(props: AppPageProps) {
  const { children, user, userError, userLoading, ...rest } = useAppPage(props);

  return (
    <main {...rest} className="h-dvh w-screen overflow-hidden bg-black">
      <div className="mx-auto h-full max-w-360 overflow-hidden">
        {/* UNAUTHENTICATED LAYOUT */}
        {!userLoading && !userError && !user && children}

        {/* AUTHENTICATED LAYOUT */}
        {(userLoading || !!userError || !!user) && (
          <div className="flex size-full flex-col overflow-hidden">
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="relative z-0 flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
              <div className="absolute inset-0 -z-1">
                <Image
                  alt="papyrus"
                  blurSrc={papyrusBlur.src}
                  loading="lazy"
                  src={papyrus.src}
                />
              </div>

              {/* LOADING */}
              {userLoading && (
                <Icon
                  className="size-16 animate-spin text-interface-red"
                  variant="spinner"
                />
              )}

              {/* ERROR */}
              {!userLoading && !!userError && (
                <Alert variant="error">{userError}</Alert>
              )}

              {/* CHILDREN */}
              {!userLoading && !userError && children}
            </div>

            {/* FOOTER */}
            <Footer />
          </div>
        )}
      </div>
    </main>
  );
}
