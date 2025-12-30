import { useMemo } from "react";

import type ButtonProps from "./Button.types";

export default function useButton({
  type: typeFromProps,
  ...rest
}: ButtonProps) {
  const type = useMemo(() => typeFromProps || "button", [typeFromProps]);

  return { ...rest, type };
}
