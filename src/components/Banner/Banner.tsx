import { twMerge } from "tailwind-merge";

import bannerBlur from "#public/assets/banner.blur.svg";
import banner from "#public/assets/banner.webp";

import { Image } from "../Image";
import useBanner from "./Banner.hooks";
import styles from "./Banner.module.css";
import type BannerProps from "./Banner.types";

export default function Banner(props: BannerProps) {
  const { ref, ...rest } = useBanner(props);

  return (
    <Image
      {...rest}
      ref={ref}
      alt="banner"
      blurSrc={bannerBlur.src}
      className={twMerge("min-w-max", styles.banner)}
      loading="lazy"
      src={banner.src}
    />
  );
}
