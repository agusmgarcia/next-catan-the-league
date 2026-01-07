import { Alert, Icon } from "#src/components";
import { Title } from "#src/fragments";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";

export default function HomePage(props: HomePageProps) {
  const { leagueError, leagueLoading, ...rest } = useHomePage(props);

  return (
    <div {...rest} className="flex size-full items-center justify-center">
      {/* TITLE */}
      <Title>Home</Title>

      {/* LOADING */}
      {leagueLoading && (
        <Icon
          className="size-16 animate-spin text-interface-red"
          variant="spinner"
        />
      )}

      {/* ERROR */}
      {!leagueLoading && !!leagueError && (
        <Alert variant="error">{leagueError}</Alert>
      )}
    </div>
  );
}
