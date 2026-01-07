import { Layout } from "#src/fragments";

import { LeagueSummaryCard } from "./LeagueSummaryCard";
import { Podium } from "./Podium";
import useViewLeaguePage from "./ViewLeaguePage.hooks";
import type ViewLeaguePageProps from "./ViewLeaguePage.types";

export default function ViewLeaguePage(props: ViewLeaguePageProps) {
  const { ...rest } = useViewLeaguePage(props);

  return (
    <Layout {...rest}>
      <div className="flex size-full flex-col items-center justify-evenly gap-4">
        {/* PODIUM */}
        <Podium />

        {/* LEAGUE SUMMARY CARD */}
        <LeagueSummaryCard />
      </div>
    </Layout>
  );
}
