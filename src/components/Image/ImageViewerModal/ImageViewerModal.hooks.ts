import { useCallback, useState } from "react";

import type ImageViewerModalProps from "./ImageViewerModal.types";

export default function useImageViewerModal(props: ImageViewerModalProps) {
  const [status, setStatus] = useState<Status>("loading");

  const containerRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;

    const image = container.querySelector("img");
    if (!image) return;

    const centerImage = () => {
      setStatus("loaded");
      container.scrollTo({
        behavior: "instant",
        left: (image.offsetWidth - container.offsetWidth) / 2,
        top: (image.offsetHeight - container.offsetHeight) / 2,
      });
    };

    if (image.complete) {
      centerImage();
      return;
    }

    image.addEventListener("load", centerImage);
  }, []);

  return { ...props, containerRef, imageStatus: status };
}

type Status = "error" | "loaded" | "loading";
