import victoryPoint from "#public/assets/victoryPoint.webp";
import { Image } from "#src/components";

import useVictoryPointImage from "./VictoryPointImage.hooks";
import type VictoryPointImageProps from "./VictoryPointImage.types";

export default function VictoryPointImage(props: VictoryPointImageProps) {
  const { ...rest } = useVictoryPointImage(props);

  return (
    <Image
      {...rest}
      alt="victory points"
      className="max-h-7 min-h-7 max-w-7 min-w-7 rounded-full"
      height={28}
      src={victoryPoint.src}
      width={28}
    />
  );
}
