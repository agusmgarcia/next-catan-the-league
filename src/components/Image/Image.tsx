/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import useImage from "./Image.hooks";
import type ImageProps from "./Image.types";
import { ImageViewerModal } from "./ImageViewerModal";

export default forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const { alt, className, isLoading, modalProps, viewer, ...rest } =
      useImage(props);

    return (
      <>
        <img
          {...rest}
          ref={ref}
          alt={alt}
          className={twMerge(
            "block w-full bg-gray-300 object-cover",
            isLoading && "animate-pulse",
            !!viewer && !isLoading && "cursor-pointer",
            className,
          )}
        />

        <ImageViewerModal {...modalProps} />
      </>
    );
  },
);
