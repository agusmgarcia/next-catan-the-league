import { twMerge } from "tailwind-merge";

import papyrusBlur from "#public/assets/papyrus.blur.svg";
import papyrus from "#public/assets/papyrus.webp";
import { Alert, Icon, Image, Typography } from "#src/components";

import { Title } from "../Title";
import { Footer } from "./Footer";
import { Header } from "./Header";
import useLayout from "./Layout.hooks";
import type LayoutProps from "./Layout.types";

export default function Layout(props: LayoutProps) {
  const { children, error, heading, loading, title, ...rest } =
    useLayout(props);

  return (
    <div
      {...rest}
      className="relative z-0 flex size-full flex-col overflow-hidden"
    >
      {/* TITLE */}
      <Title>{title}</Title>

      {/* HEADER */}
      <Header>{heading}</Header>

      {/* BODY */}
      <div
        className={twMerge(
          "flex-1 overflow-hidden p-4",
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
              <Typography className="font-semibold">{error}</Typography>
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
