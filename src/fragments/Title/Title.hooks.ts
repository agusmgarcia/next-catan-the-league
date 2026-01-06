import { useMemo } from "react";

import type TitleProps from "./Title.types";

export default function useTitle({ children, ...rest }: TitleProps) {
  const title = useMemo(
    () =>
      `Catan - The League${Array.isArray(children) ? (!!children.length ? ` :: ${children.join(" :: ")}` : "") : !!children ? ` :: ${children}` : ""}`,
    [children],
  );

  return { ...rest, title };
}
