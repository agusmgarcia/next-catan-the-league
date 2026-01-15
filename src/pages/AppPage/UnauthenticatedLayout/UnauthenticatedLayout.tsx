import { twMerge } from "tailwind-merge";

import { Button, Icon, Typography } from "#src/components";

import { BannerImage } from "./BannerImage";
import useUnauthenticatedLayout from "./UnauthenticatedLayout.hooks";
import type UnauthenticatedLayoutProps from "./UnauthenticatedLayout.types";

export default function UnauthenticatedLayout(
  props: UnauthenticatedLayoutProps,
) {
  const {
    googleLoginDisabled,
    googleLogingLoading,
    googleLoginOnClick,
    ...rest
  } = useUnauthenticatedLayout(props);

  return (
    <div
      {...rest}
      className="relative z-0 flex size-full flex-col items-center justify-around"
    >
      {/* TITLE */}
      <div className="flex flex-col items-center gap-1">
        <Typography
          className="text-8xl text-interface-yellow text-shadow-stroke-8xl"
          variant="h1"
        >
          CATAN
        </Typography>

        <Typography
          className="flex items-center gap-1 text-4xl text-interface-yellow text-shadow-stroke-6xl"
          variant="h2"
        >
          THE LEAGUE
        </Typography>
      </div>

      {/* LOGIN METHODS */}
      <div className="flex flex-col gap-2">
        {/* GOOGLE */}
        <Button
          className={twMerge(
            "flex w-50 items-center justify-center gap-1 rounded-lg border-2 border-white bg-google text-white shadow-md shadow-google",
            "disabled:shadow-none",
          )}
          disabled={googleLoginDisabled}
          onClick={googleLoginOnClick}
          variant="raw"
        >
          {googleLogingLoading ? (
            <Icon className="animate-spin" variant="spinner" />
          ) : (
            <>
              <Icon variant="google" />
              Login with Google
            </>
          )}
        </Button>
      </div>

      {/* BANNER */}
      <div className="absolute inset-0 -z-1 mask-b-from-black mask-b-from-50% mask-b-to-transparent">
        <BannerImage speed={5} />
      </div>

      {/* VERSION */}
      <Typography className="absolute right-4 bottom-4 text-white">
        v{process.env.APP_VERSION || "0.0.0"}
      </Typography>
    </div>
  );
}
