import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import type ImageProps from "./Image.types";

export default function useImage({
  blurSrc: blurSrcFromProps,
  className: classNameFromProps,
  loading: loadingFromProps,
  src: srcFromProps,
  ...rest
}: ImageProps) {
  const className = useMemo(
    () =>
      isSVG(srcFromProps) ||
      !loadingFromProps ||
      loadingFromProps === "eager" ||
      !blurSrcFromProps
        ? classNameFromProps
        : twMerge("lazyload", classNameFromProps),
    [blurSrcFromProps, classNameFromProps, loadingFromProps, srcFromProps],
  );

  const loading = useMemo(
    () => loadingFromProps || "eager",
    [loadingFromProps],
  );

  const src = useMemo(
    () =>
      isSVG(srcFromProps) ||
      !loadingFromProps ||
      loadingFromProps === "eager" ||
      !blurSrcFromProps
        ? srcFromProps
        : blurSrcFromProps,
    [blurSrcFromProps, loadingFromProps, srcFromProps],
  );

  return { ...rest, className, "data-src": srcFromProps, loading, src };
}

function isSVG(src: string): boolean {
  return src.endsWith(".svg");
}
