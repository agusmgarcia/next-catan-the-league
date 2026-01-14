import { twMerge } from "tailwind-merge";

import useInput from "./Input.hooks";
import type InputProps from "./Input.types";

export default function Input(props: InputProps) {
  const { className, ...rest } = useInput(props);

  if (rest.type === "number")
    return (
      <input
        {...rest}
        className={twMerge(
          "h-9 w-full cursor-text appearance-none rounded-lg border bg-white text-black",
          "transition-colors",
          "placeholder:italic",
          "disabled:cursor-default disabled:bg-gray-300 disabled:text-gray-500",
          className,
        )}
      />
    );

  if (rest.type === "radio")
    return (
      <input
        {...rest}
        className={twMerge(
          "relative size-9 max-h-9 min-h-9 max-w-9 min-w-9 cursor-pointer appearance-none rounded-full border bg-white p-2",
          "transition-colors",
          "after:absolute after:top-1/2 after:left-1/2 after:block after:size-1/2 after:-translate-1/2 after:rounded-full after:bg-white",
          "checked:cursor-default checked:after:bg-interface-red",
          "disabled:cursor-default disabled:bg-gray-300 disabled:after:bg-gray-300 disabled:checked:after:bg-gray-500",
          className,
        )}
      />
    );

  if (rest.type === "textarea")
    return (
      <textarea
        {...rest}
        className={twMerge(
          "min-h-9 w-full cursor-text appearance-none rounded-lg border bg-white px-2 pt-1 text-black",
          "transition-colors",
          "placeholder:italic",
          "disabled:cursor-default disabled:bg-gray-300 disabled:text-gray-500",
          className,
        )}
      />
    );

  if (rest.type === "text" || rest.type === "email")
    return (
      <input
        {...rest}
        className={twMerge(
          "h-9 w-full cursor-text appearance-none rounded-lg border bg-white px-2 text-black",
          "transition-colors",
          "placeholder:italic",
          "disabled:cursor-default disabled:bg-gray-300 disabled:text-gray-500",
          className,
        )}
      />
    );

  if (rest.type === "checkbox")
    return (
      <input
        {...rest}
        className={twMerge(
          "relative size-9 max-h-9 min-h-9 max-w-9 min-w-9 cursor-pointer appearance-none rounded-lg border bg-white",
          "transition-colors",
          "after:absolute after:top-1.5 after:left-3.25 after:block after:h-4.5 after:w-2.25 after:rotate-45 after:border-r-[3px] after:border-b-[3px] after:border-white after:content-['']",
          "checked:cursor-pointer checked:bg-interface-red",
          "disabled:cursor-default disabled:bg-gray-300 disabled:after:border-gray-300 disabled:checked:after:border-gray-500",
          className,
        )}
      />
    );
}
