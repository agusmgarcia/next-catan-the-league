import { twMerge } from "tailwind-merge";

import useAlert from "./Alert.hooks";
import type AlertProps from "./Alert.types";

export default function Alert(props: AlertProps) {
  const { variant, ...rest } = useAlert(props);

  return (
    <div
      {...rest}
      className={twMerge(
        "w-full rounded-lg border-4 p-4",
        variant === "error" && "border-interface-red bg-interface-red/50",
      )}
    />
  );
}
