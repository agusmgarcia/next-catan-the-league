import useImage from "./Image.hooks";
import type ImageProps from "./Image.types";

export default function Image(props: ImageProps) {
  const { ...rest } = useImage(props);

  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...rest} />;
}
