/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";

import useImage from "./Image.hooks";
import type ImageProps from "./Image.types";
import { ImageViewerModal } from "./ImageViewerModal";

export default function Image(props: ImageProps) {
  const { alt, className, modalProps, status, viewer, ...rest } =
    useImage(props);

  return (
    <>
      <img
        {...rest}
        alt={alt}
        className={twMerge(
          "block w-full bg-gray-300 object-cover",
          status === "loading" && "animate-pulse",
          !!viewer && status === "loaded" && "cursor-pointer",
          className,
        )}
      />

      <ImageViewerModal {...modalProps} />
    </>
  );
}
