import { twMerge } from "tailwind-merge";

import { Alert, Anchor, Button, Typography } from "#src/components";

import { LeagueSummaryCard } from "./LeagueSummaryCard";
import { Podium } from "./Podium";
import useViewLeaguePage from "./ViewLeaguePage.hooks";
import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function ViewLeaguePage(props: ViewLeaguePageProps) {
  const { league, ...rest } = useViewLeaguePage(props);

  return (
    <div
      {...rest}
      className={twMerge(
        "flex size-full flex-col gap-4",
        !!league && "relative items-center justify-evenly",
      )}
    >
      {/* ERROR */}
      {!league ? (
        <>
          <Alert variant="error">
            <Typography>League not found.</Typography>
          </Alert>

          {/* VIEW LEAGUES */}
          <Anchor href="/leagues/view">
            <Button variant="primary">View other leagues</Button>
          </Anchor>
        </>
      ) : (
        <>
          {/* MATCHES COUNT */}
          <Typography
            className={twMerge(
              "absolute top-0 right-0 rounded-lg bg-interface-yellow px-2",
              league.completed && "bg-interface-green text-white",
            )}
          >
            {league.matchesCount}
          </Typography>

          {/* PODIUM */}
          <Podium />

          {/* LEAGUE SUMMARY CARD */}
          <LeagueSummaryCard />
        </>
      )}
    </div>
  );
}
