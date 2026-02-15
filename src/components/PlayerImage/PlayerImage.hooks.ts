import { useMemo } from "react";

import unknown from "#public/assets/unknown.webp";

import type PlayerImageProps from "./PlayerImage.types";

export default function usePlayerImage({
  alt: altFromProps,
  src: srcFromProps,
  ...rest
}: PlayerImageProps) {
  const alt = useMemo(() => altFromProps || "player's face", [altFromProps]);

  const src = useMemo(() => srcFromProps || unknown.src, [srcFromProps]);

  const width = useMemo(
    () => (rest.variant === "3rem" ? 48 : rest.variant === "3.5rem" ? 56 : 80),
    [rest.variant],
  );

  const height = useMemo(
    () => (rest.variant === "3rem" ? 48 : rest.variant === "3.5rem" ? 56 : 80),
    [rest.variant],
  );

  return { ...rest, alt, height, src, width };
}
