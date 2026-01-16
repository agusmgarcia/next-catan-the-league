import { twMerge } from "tailwind-merge";

import papyrusBlur from "#public/assets/papyrus.blur.svg";
import papyrus from "#public/assets/papyrus.webp";
import { Alert, Icon, Image, Typography } from "#src/components";

import useAuthenticatedLayout from "./AuthenticatedLayout.hooks";
import type AuthenticatedLayoutProps from "./AuthenticatedLayout.types";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function AuthenticatedLayout(props: AuthenticatedLayoutProps) {
  const { children, error, loading, padding, ...rest } =
    useAuthenticatedLayout(props);

  return (
    <div
      {...rest}
      className="relative z-0 flex size-full flex-col overflow-hidden"
    >
      {/* HEADER */}
      <Header />

      {/* BODY */}
      <div
        className={twMerge(
          "flex-1 overflow-hidden",
          !!padding && "p-4",
          !!loading && "flex items-center justify-center",
        )}
      >
        {/* PAPYRUS */}
        <div className="absolute inset-0 -z-1">
          <Image
            alt="papyrus"
            blurSrc={papyrusBlur.src}
            loading="lazy"
            src={papyrus.src}
          />
        </div>

        {/* LOADING */}
        {!!loading && (
          <Icon
            className="size-16 animate-spin text-interface-red"
            variant="spinner"
          />
        )}

        {/* ERROR */}
        {!loading && !!error && (
          <Alert variant="error">
            {typeof error === "string" ? (
              <Typography>{error}</Typography>
            ) : (
              <>{error}</>
            )}
          </Alert>
        )}

        {/* CHILDREN */}
        {!loading && !error && children}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
