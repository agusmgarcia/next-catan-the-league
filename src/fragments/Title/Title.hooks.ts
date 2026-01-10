import { useMemo } from "react";

import type TitleProps from "./Title.types";

export default function useTitle({
  children: childrenFromProps,
  ...rest
}: TitleProps) {
  const title = useMemo(
    () =>
      `Catan - The League${Array.isArray(childrenFromProps) ? (!!childrenFromProps.length ? ` :: ${childrenFromProps.join(" :: ")}` : "") : !!childrenFromProps ? ` :: ${childrenFromProps}` : ""}`,
    [childrenFromProps],
  );

  return { ...rest, title };
}
