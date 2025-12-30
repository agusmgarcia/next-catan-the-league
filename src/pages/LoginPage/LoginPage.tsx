import bannerBlur from "#public/assets/banner.blur.svg";
import banner from "#public/assets/banner.webp";
import { Button, Icon, Image, Typography } from "#src/components";

import useLoginPage from "./LoginPage.hooks";
import type LoginPageProps from "./LoginPage.types";

export default function LoginPage(props: LoginPageProps) {
  const { ...rest } = useLoginPage(props);

  return (
    <div
      {...rest}
      className="relative z-0 flex size-full flex-col items-center justify-evenly"
    >
      {/* TITLE */}
      <div className="flex flex-col items-center gap-1">
        <Typography
          className="text-8xl text-yellow text-shadow-stroke-lg"
          variant="h1"
        >
          CATAN
        </Typography>

        <Typography
          className="flex items-center gap-1 text-4xl text-yellow text-shadow-stroke-md"
          variant="h2"
        >
          THE LEAGUE
        </Typography>
      </div>

      <div>
        <Button
          className="hidden items-center gap-1 rounded-lg border-2 border-white bg-[#DB4437] text-white shadow-md shadow-[#DB4437]"
          variant="raw"
        >
          <Icon variant="google" />
          Login with Google
        </Button>
      </div>

      <div className="absolute inset-0 -z-1">
        <Image
          alt="banner"
          blurSrc={bannerBlur.src}
          className="h-full max-w-max min-w-full -translate-x-[calc(50%-min(50vw,720px))] mask-b-from-black mask-b-from-50% mask-b-to-transparent object-cover blur-[0px] will-change-transform"
          loading="lazy"
          src={banner.src}
        />
      </div>
    </div>
  );
}
