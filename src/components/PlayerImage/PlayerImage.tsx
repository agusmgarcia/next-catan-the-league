import { twMerge } from "tailwind-merge";

import { Image } from "../Image";
import usePlayerImage from "./PlayerImage.hooks";
import type PlayerImageProps from "./PlayerImage.types";

export default function PlayerImage(props: PlayerImageProps) {
  const { alt, color, variant, ...rest } = usePlayerImage(props);

  return (
    <Image
      {...rest}
      alt={alt}
      className={twMerge(
        variant === "3rem"
          ? "size-12 max-h-12 min-h-12 max-w-12 min-w-12"
          : "size-14 max-h-14 min-h-14 max-w-14 min-w-14",
        "rounded-full border-4",
        color === "red"
          ? "border-player-red"
          : color === "blue"
            ? "border-player-blue"
            : color === "white"
              ? "border-black/50"
              : color === "orange"
                ? "border-player-orange"
                : color === "green"
                  ? "border-player-green"
                  : color === "brown"
                    ? "border-player-brown"
                    : "border-black",
      )}
    />
  );
}
