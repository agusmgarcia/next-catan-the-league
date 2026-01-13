import victoryPoint from "#public/assets/victoryPoint.webp";

import { Image } from "../Image";
import useVictoryPointImage from "./VictoryPointImage.hooks";
import type VictoryPointImageProps from "./VictoryPointImage.types";

export default function VictoryPointImage(props: VictoryPointImageProps) {
  const { ...rest } = useVictoryPointImage(props);

  return (
    <Image
      {...rest}
      alt="victory points"
      className="size-7 max-h-7 min-h-7 max-w-7 min-w-7"
      src={victoryPoint.src}
    />
  );
}
