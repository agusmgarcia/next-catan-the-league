import { twMerge } from "tailwind-merge";

import useDivider from "./Divider.hooks";
import type DividerProps from "./Divider.types";

export default function Divider(props: DividerProps) {
  const { className, ...rest } = useDivider(props);

  return (
    <div
      {...rest}
      className={twMerge("h-0.5 rounded-lg bg-black", className)}
    />
  );
}
