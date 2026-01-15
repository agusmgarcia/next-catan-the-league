import { twMerge } from "tailwind-merge";

import bannerBlur from "#public/assets/banner.blur.svg";
import banner from "#public/assets/banner.webp";
import { Image } from "#src/components";

import useBannerImage from "./BannerImage.hooks";
import styles from "./BannerImage.module.css";
import type BannerImageProps from "./BannerImage.types";

export default function BannerImage(props: BannerImageProps) {
  const { ref, ...rest } = useBannerImage(props);

  return (
    <Image
      {...rest}
      ref={ref}
      alt="banner"
      blurSrc={bannerBlur.src}
      className={twMerge("min-w-max", styles.bannerImage)}
      loading="lazy"
      src={banner.src}
    />
  );
}
