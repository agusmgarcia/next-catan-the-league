import { useLeague } from "#src/store";

import type HeaderProps from "./Header.types";

export default function useHeader(props: HeaderProps) {
  const { league, leagueError, leagueLoading } = useLeague();

  return { ...props, league, leagueError, leagueLoading };
}
