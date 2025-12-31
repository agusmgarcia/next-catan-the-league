import { useEffect, useRef } from "react";

import type BannerProps from "./Banner.types";

export default function useBanner({
  speed: speedFromProps,
  ...rest
}: BannerProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = ref.current;
    if (!image) return;

    const parentImage = image.parentElement;
    if (!parentImage) return;

    if (!speedFromProps || speedFromProps < 0) return;

    const observer = new ResizeObserver(() => {
      const parentWidth = parentImage.getBoundingClientRect().width;
      const width = image.getBoundingClientRect().width;

      image.style.setProperty("--banner-parent-width", `${parentWidth}px`);
      image.style.setProperty(
        "--banner-animation-duration",
        `${Math.ceil((width - parentWidth) / speedFromProps)}s`,
      );
    });

    observer.observe(parentImage);
    observer.observe(image);

    return () => observer.disconnect();
  }, [speedFromProps]);

  return { ...rest, ref };
}
