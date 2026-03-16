import { twMerge } from "tailwind-merge";

import bannerBlur from "#public/assets/banner.blur.svg";
import banner from "#public/assets/banner.webp";
import { Image } from "#src/components";

import useBannerImage from "./BannerImage.hooks";
import styles from "./BannerImage.module.css";
import type BannerImageProps from "./BannerImage.types";

export default function BannerImage(props: BannerImageProps) {
  const { ...rest } = useBannerImage(props);

  return (
    <Image
      {...rest}
      alt="banner"
      blurSrc={bannerBlur.src}
      className={twMerge("size-full min-w-max", styles["bannerImage"])}
      loading="lazy"
      src={banner.src}
    />
  );
}
