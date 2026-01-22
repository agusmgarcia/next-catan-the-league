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
  const [isLoading, setLoading] = useState(true);
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

  const onLoad = useCallback(() => setLoading(false), []);

  const onError = useCallback(() => setLoading(false), []);

  const onClick = useCallback<React.MouseEventHandler<HTMLImageElement>>(() => {
    if (!rest.viewer) return;
    setModalOpen(true);
  }, [rest.viewer]);

  const modalOnClose = useCallback(() => setModalOpen(false), []);

  return {
    ...rest,
    className,
    "data-src": srcFromProps,
    isLoading,
    loading,
    modalProps: {
      heading: rest.viewer || "",
      imageSrc: srcFromProps,
      onClose: modalOnClose,
      open: modalOpen,
    },
    onClick,
    onError,
    onLoad,
    src,
  };
}

function isSVG(src: string): boolean {
  return src.endsWith(".svg");
}
