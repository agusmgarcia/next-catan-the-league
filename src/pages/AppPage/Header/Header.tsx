import { Icon, Typography } from "#src/components";

import useHeader from "./Header.hooks";
import type HeaderProps from "./Header.types";

export default function Header(props: HeaderProps) {
  const { league, leagueError, leagueLoading, ...rest } = useHeader(props);

  return (
    <div
      {...rest}
      className="flex h-32 w-full flex-col items-center justify-center gap-1 border-b-4 bg-interface-red noise-30"
    >
      {/* CROWN */}
      <Icon className="size-9 text-interface-yellow" variant="crown" />

      {leagueLoading && (
        <Icon
          className="h-9 w-9 animate-spin text-interface-yellow"
          variant="spinner"
        />
      )}

      {/* LEAGUE NAME */}
      {!leagueLoading && (
        <Typography className="text-interface-yellow" variant="h1">
          {!leagueError ? league?.name || "-" : "-"}
        </Typography>
      )}
    </div>
  );
}
