import { twMerge } from "tailwind-merge";

import { Anchor, Icon } from "#src/components";

import useFooter from "./Footer.hooks";
import type FooterProps from "./Footer.types";

export default function Footer(props: FooterProps) {
  const { links, ...rest } = useFooter(props);

  return (
    <div
      {...rest}
      className="relative flex h-14 w-full items-center border-t bg-interface-red noise-5 custom-shadow-top-2xl"
    >
      {links.map((link) => (
        <Anchor
          key={link.href}
          className={twMerge(
            "flex h-14 w-full items-center justify-center border-y-4 border-y-transparent text-white",
            link.invisible && "invisible",
            link.selected && "border-t-transparent border-b-white",
          )}
          href={link.href}
        >
          <Icon className="size-8" variant={link.icon} />
        </Anchor>
      ))}

      <Anchor
        className="absolute -top-5 left-1/2 size-fit -translate-x-1/2 rounded-full bg-interface-red noise-5 text-white"
        href={`#`}
      >
        <Icon className="size-18" variant="add" />
      </Anchor>
    </div>
  );
}
