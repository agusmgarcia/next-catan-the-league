import { type FormEvent, useMemo } from "react";

import type FormProps from "./Form.types";

export default function useForm({
  onSubmit: onSubmitFromProps,
  ...rest
}: FormProps) {
  const onSubmit = useMemo(
    () =>
      !!onSubmitFromProps
        ? (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmitFromProps(event);
          }
        : undefined,
    [onSubmitFromProps],
  );

  return { ...rest, onSubmit };
}
