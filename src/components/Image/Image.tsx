import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import useImage from "./Image.hooks";
import type ImageProps from "./Image.types";

export default forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const { alt, className, isLoading, ...rest } = useImage(props);

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...rest}
        ref={ref}
        alt={alt}
        className={twMerge(
          "block size-full bg-gray-300 object-cover",
          isLoading && "animate-pulse",
          className,
        )}
      />
    );
  },
);
