import { Anchor, Button, Icon, Typography } from "#src/components";

import useHeader from "./Header.hooks";
import type HeaderProps from "./Header.types";

export default function Header(props: HeaderProps) {
  const { header, iconLeft, iconRight, ...rest } = useHeader(props);

  return (
    <div
      {...rest}
      className="flex h-16 w-full items-center justify-between gap-4 border-b bg-interface-red custom-noise-5 p-4 shadow-2xl"
    >
      {!!header && !!iconLeft && (
        <Anchor href={iconLeft.href}>
          <Icon className="size-8 text-white" variant={iconLeft.icon} />
        </Anchor>
      )}

      {!!header && (
        <Typography
          className="mr-auto line-clamp-1 break-all text-white"
          variant="h1"
        >
          {header}
        </Typography>
      )}

      {!!header &&
        !!iconRight &&
        (!!iconRight.href ? (
          <Anchor href={iconRight.href}>
            <Icon className="size-8 text-white" variant={iconRight.icon} />
          </Anchor>
        ) : (
          <Button
            className="size-fit p-0"
            onClick={iconRight.onClick}
            variant="raw"
          >
            <Icon className="size-8 text-white" variant={iconRight.icon} />
          </Button>
        ))}
    </div>
  );
}
