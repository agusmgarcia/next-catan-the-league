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

  return { ...rest, alt, src };
}
