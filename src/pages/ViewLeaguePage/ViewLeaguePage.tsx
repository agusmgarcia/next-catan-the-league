import { twMerge } from "tailwind-merge";

import { Alert, Typography } from "#src/components";

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
        "flex size-full flex-col items-center gap-4",
        !!league && "justify-evenly",
      )}
    >
      {/* ERROR */}
      {!league ? (
        <Alert variant="error">
          <Typography>League not found.</Typography>
        </Alert>
      ) : (
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
