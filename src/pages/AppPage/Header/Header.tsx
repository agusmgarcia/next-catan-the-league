import { Icon, Typography } from "#src/components";

import useHeader from "./Header.hooks";
import type HeaderProps from "./Header.types";

export default function Header(props: HeaderProps) {
  const { league, leagueError, leagueLoading, ...rest } = useHeader(props);

  return (
    <div
      {...rest}
      className="flex h-16 w-full items-center gap-4 border-b bg-interface-red custom-noise-5 p-4 shadow-2xl"
    >
      {leagueLoading && (
        <Icon className="size-9 animate-spin text-white" variant="spinner" />
      )}

      {!leagueLoading && (
        <Typography className="line-clamp-1 break-all text-white" variant="h1">
          {!leagueError && !!league ? league.name : "-"}
        </Typography>
      )}
    </div>
  );
}
