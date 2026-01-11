import { useMemo } from "react";

import type InputProps from "./Input.types";

export default function useInput({
  value: valueFromProps,
  ...rest
}: InputProps) {
  const value = useMemo(() => {
    if (rest.type !== "number") return valueFromProps;
    if (typeof valueFromProps !== "number") return "";
    if (isNaN(valueFromProps)) return "";
    return `${valueFromProps}`;
  }, [rest.type, valueFromProps]);

  return { ...rest, value };
}
