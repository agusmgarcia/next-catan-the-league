import { twMerge } from "tailwind-merge";

import useButton from "./Button.hooks";
import type ButtonProps from "./Button.types";

export default function Button(props: ButtonProps) {
  const { children, className, variant, ...rest } = useButton(props);

  if (variant === "raw")
    return (
      <button
        {...rest}
        className={twMerge(
          "h-14 w-full cursor-pointer p-4 transition-colors",
          "disabled:cursor-default disabled:bg-gray-500",
          className,
        )}
      >
        {children}
      </button>
    );
}
