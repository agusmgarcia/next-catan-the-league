import { Alert, Icon, Typography } from "#src/components";
import { Title } from "#src/fragments";

import { LeagueSummaryCard } from "./LeagueSummaryCard";
import { Podium } from "./Podium";
import useViewLeaguePage from "./ViewLeaguePage.hooks";
import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function ViewLeaguePage(props: ViewLeaguePageProps) {
  const { league, leagueError, leagueLoading, ...rest } =
    useViewLeaguePage(props);

  return (
    <div
      {...rest}
      className="flex size-full flex-col items-center justify-evenly gap-4"
    >
      <Title>{league?.name || ""}</Title>

      {/* LOADING */}
      {leagueLoading && (
        <Icon
          className="size-16 animate-spin text-interface-red"
          variant="spinner"
        />
      )}

      {/* ERROR */}
      {!leagueLoading && !!leagueError && (
        <Alert variant="error">
          <Typography>{leagueError}</Typography>
        </Alert>
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
