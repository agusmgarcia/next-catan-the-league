import { Alert, Icon } from "#src/components";

import useHomePage from "./HomePage.hooks";
import type HomePageProps from "./HomePage.types";
import { LeagueSummaryCard } from "./LeagueSummaryCard";
import { Podium } from "./Podium";

export default function HomePage(props: HomePageProps) {
  const { leagueError, leagueLoading, ...rest } = useHomePage(props);

  return (
    <div
      {...rest}
      className="flex size-full flex-col items-center justify-evenly gap-4"
    >
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

      {/* BODY */}
      {!leagueLoading && !leagueError && (
        <>
          {/* PODIUM */}
          <Podium />

          {/* LEAGUE SUMMARY CARD */}
          <LeagueSummaryCard />
        </>
      )}
    </div>
  );
}
