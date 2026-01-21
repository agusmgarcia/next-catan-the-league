import { twMerge } from "tailwind-merge";

import { Anchor, Button, Icon, PlayerImage, Typography } from "#src/components";

import useViewLeaguesPage from "./ViewLeaguesPage.hooks";
import type ViewLeaguesPageProps from "./ViewLeaguesPage.types";

export default function ViewLeaguesPage(props: ViewLeaguesPageProps) {
  const { leagues, ...rest } = useViewLeaguesPage(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4 overflow-auto">
      {/* LEAGUES */}
      {leagues.map((l) => (
        <div
          key={l.id}
          className={twMerge(
            "flex flex-col gap-4 rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl",
            l.active && "border-interface-green",
          )}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between gap-1">
            {/* NAME */}
            <Typography className="underline" variant="h2">
              {l.name}
            </Typography>

            {/* MATCHES COUNT */}
            <Typography
              className={twMerge(
                "rounded-lg bg-interface-yellow px-2",
                l.completed && "bg-interface-green text-white",
              )}
            >
              {l.matchesCount}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* PLAYERS */}
            <div className="flex gap-2">
              {l.players.map((p) => (
                <div key={p.id} className="flex flex-col gap-1">
                  {/* PLAYER IMAGE */}
                  <PlayerImage
                    color={p.color}
                    src={p.photoURL}
                    variant="3rem"
                  />

                  {/* VICTORY POINTS */}
                  <Typography className="w-12 text-center">
                    {p.points}
                  </Typography>
                </div>
              ))}
            </div>

            {/* VIEW LEAGUE */}
            <Anchor href={`/leagues/${l.id}/view`}>
              <Icon className="size-10" variant="arrowRightWide" />
            </Anchor>
          </div>
        </div>
      ))}

      {/* CREATE NEW LEAGUE */}
      <Anchor href="/leagues/create">
        <Button variant="primary">Create new league</Button>
      </Anchor>
    </div>
  );
}
