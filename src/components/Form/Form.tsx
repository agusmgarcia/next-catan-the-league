import { twMerge } from "tailwind-merge";

import useForm from "./Form.hooks";
import type FormProps from "./Form.types";

export default function Form(props: FormProps) {
  const { className, ...rest } = useForm(props);

  return (
    <form
      {...rest}
      className={twMerge(
        "w-full rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl",
        className,
      )}
    />
  );
}
