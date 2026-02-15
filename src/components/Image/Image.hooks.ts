import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import { useDevicePixelRatio } from "@agusmgarcia/react-essentials-utils";
import { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import type ImageProps from "./Image.types";

export default function useImage({
  blurSrc: blurSrcFromProps,
  className: classNameFromProps,
  height: heightFromProps,
  loading: loadingFromProps,
  src: srcFromProps,
  width: widthFromProps,
  ...rest
}: ImageProps) {
  const dpr = useDevicePixelRatio();

  const [status, setStatus] = useState<Status>("loading");
  const [modalOpen, setModalOpen] = useState(false);

  const loading = useMemo(
    () =>
      loadingFromProps || (isCloudinaryImage(srcFromProps) ? "lazy" : "eager"),
    [loadingFromProps, srcFromProps],
  );

  const blurSrc = useMemo(
    () =>
      blurSrcFromProps ||
      getBlurSrcImage(srcFromProps, widthFromProps, heightFromProps, dpr),
    [blurSrcFromProps, dpr, heightFromProps, srcFromProps, widthFromProps],
  );

  const className = useMemo(
    () =>
      isSVG(srcFromProps) || loading === "eager" || !blurSrc
        ? classNameFromProps
        : twMerge("lazyload", classNameFromProps),
    [blurSrc, classNameFromProps, loading, srcFromProps],
  );

  const dataSrc = useMemo(
    () => getSrcImage(srcFromProps, widthFromProps, heightFromProps, dpr),
    [dpr, heightFromProps, widthFromProps, srcFromProps],
  );

  const src = useMemo(
    () =>
      isSVG(dataSrc) || loading === "eager" || !blurSrc ? dataSrc : blurSrc,
    [blurSrc, dataSrc, loading],
  );

  const style = useMemo(
    () => ({
      height: !!heightFromProps ? `${heightFromProps}px` : undefined,
      width: !!widthFromProps ? `${widthFromProps}px` : undefined,
    }),
    [heightFromProps, widthFromProps],
  );

  const modalImageSrc = useMemo(
    () => getModalImageSrc(srcFromProps),
    [srcFromProps],
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
    "data-src": dataSrc,
    loading,
    modalProps: {
      heading: rest.viewer || "",
      imageAlt: rest.alt,
      imageSrc: modalImageSrc,
      onClose: modalOnClose,
      open: modalOpen,
    },
    onClick,
    onError,
    onLoad,
    src,
    status,
    style,
  };
}

type Status = "error" | "loaded" | "loading";

function isSVG(src: string): boolean {
  return src.endsWith(".svg");
}

function isCloudinaryImage(src: string): boolean {
  return src.startsWith("https://res.cloudinary.com/");
}

function injectCloudinaryParameters(
  src: string,
  ...parameters: string[]
): string {
  if (!parameters.length) return src;
  return src.replace("/upload/", `/upload/${parameters.join(",")}/`);
}

function getBlurSrcImage(
  src: string,
  width: number | undefined,
  height: number | undefined,
  dpr: number,
): string | undefined {
  if (!isCloudinaryImage(src)) return undefined;

  width = !!width ? width * dpr : undefined;
  height = !!height ? height * dpr : undefined;

  if (!!width) {
    const minWidth = Math.min(width, 200);
    const percentage = minWidth / width;
    width = minWidth;
    height = !!height ? Math.ceil(height * percentage) : undefined;
  } else if (!!height) {
    const minHeight = Math.min(height, 200);
    const percentage = minHeight / height;
    height = minHeight;
    width = !!width ? Math.ceil(width * percentage) : undefined;
  } else {
    width = 200;
    height = undefined;
  }

  const parameters = new Array<string>();
  if (!!width) parameters.push(`w_${width}`);
  if (!!height) parameters.push(`h_${height}`);
  parameters.push("e_blur:1000");
  parameters.push("f_auto");
  parameters.push("q_auto:low");
  parameters.push("g_auto");
  parameters.push("c_fill");

  return injectCloudinaryParameters(src, ...parameters);
}

function getSrcImage(
  src: string,
  width: number | undefined,
  height: number | undefined,
  dpr: number,
): string {
  if (!isCloudinaryImage(src)) return src;

  const parameters = new Array<string>();
  parameters.push(!!width ? `w_${Math.ceil(width * dpr)}` : "w_iw");
  parameters.push(!!height ? `h_${Math.ceil(height * dpr)}` : "h_ih");
  parameters.push("f_auto");
  parameters.push("q_auto");
  parameters.push("g_auto");
  parameters.push("c_fill");

  return injectCloudinaryParameters(src, ...parameters);
}

function getModalImageSrc(src: string): string {
  if (!isCloudinaryImage(src)) return src;

  const parameters = new Array<string>();
  parameters.push("f_auto");
  parameters.push("q_auto");

  return injectCloudinaryParameters(src, ...parameters);
}
