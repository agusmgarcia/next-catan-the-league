import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import type ImageProps from "./Image.types";

export default function useImage({
  blurSrc: blurSrcFromProps,
  className: classNameFromProps,
  loading: loadingFromProps,
  src: srcFromProps,
  ...rest
}: ImageProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [modalOpen, setModalOpen] = useState(false);

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

  const onLoad = useCallback(() => setStatus("loaded"), []);

  const onError = useCallback(() => setStatus("error"), []);

  const onClick = useCallback<React.MouseEventHandler<HTMLImageElement>>(() => {
    if (!rest.viewer) return;
    if (status !== "loaded") return;
    setModalOpen(true);
  }, [rest.viewer, status]);

  const modalOnClose = useCallback(() => setModalOpen(false), []);

  return {
    ...rest,
    className,
    "data-src": srcFromProps,
    loading,
    modalProps: {
      heading: rest.viewer || "",
      imageAlt: rest.alt,
      imageSrc: srcFromProps,
      onClose: modalOnClose,
      open: modalOpen,
    },
    onClick,
    onError,
    onLoad,
    src,
    status,
  };
}

function isSVG(src: string): boolean {
  return src.endsWith(".svg");
}

type Status = "error" | "loaded" | "loading";
