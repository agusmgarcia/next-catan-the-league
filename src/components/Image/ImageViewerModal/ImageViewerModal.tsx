/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";

import { Modal } from "#src/components";

import useImageViewerModal from "./ImageViewerModal.hooks";
import type ImageViewerModalProps from "./ImageViewerModal.types";

export default function ImageViewerModal(props: ImageViewerModalProps) {
  const { containerRef, imageAlt, imageSrc, imageStatus, ...rest } =
    useImageViewerModal(props);

  return (
    <Modal {...rest}>
      <div
        ref={containerRef}
        className="size-full overflow-x-hidden overflow-y-auto rounded-lg"
      >
        <img
          alt={imageAlt}
          className={twMerge(
            "block w-full bg-gray-300 object-cover",
            imageStatus === "loading" && "animate-pulse",
          )}
          src={imageSrc}
        />
      </div>
    </Modal>
  );
}
