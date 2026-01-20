import { twMerge } from "tailwind-merge";

import useButton from "./Button.hooks";
import type ButtonProps from "./Button.types";

export default function Button(props: ButtonProps) {
  const { children, className, variant, ...rest } = useButton(props);

  if (!variant || variant === "primary")
    return (
      <button
        {...rest}
        className={twMerge(
          "h-14 w-full cursor-pointer rounded-lg border border-interface-red bg-interface-red p-4 text-white transition-colors",
          "disabled:cursor-default disabled:border-gray-500 disabled:bg-gray-500",
          className,
        )}
      >
        {children}
      </button>
    );

  if (variant === "secondary")
    return (
      <button
        {...rest}
        className={twMerge(
          "h-14 w-full cursor-pointer rounded-lg border bg-white p-4 text-black transition-colors",
          "disabled:cursor-default disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500",
          className,
        )}
      >
        {children}
      </button>
    );

  if (variant === "raw")
    return (
      <button
        {...rest}
        className={twMerge(
          "cursor-pointer",
          "disabled:cursor-default",
          className,
        )}
      >
        {children}
      </button>
    );
}
