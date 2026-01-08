import NextJSLink from "next/link";
import { twMerge } from "tailwind-merge";

import useAnchor from "./Anchor.hooks";
import type AnchorProps from "./Anchor.types";

export default function Anchor(props: AnchorProps) {
  const { className, ...rest } = useAnchor(props);

  return <NextJSLink className={twMerge("underline", className)} {...rest} />;
}
