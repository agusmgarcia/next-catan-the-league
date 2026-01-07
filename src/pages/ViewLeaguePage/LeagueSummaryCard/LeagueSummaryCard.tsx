import { twMerge } from "tailwind-merge";

import victoryPoint from "#public/assets/victoryPoint.webp";
import {
  Alert,
  Anchor,
  Divider,
  Icon,
  Image,
  Typography,
} from "#src/components";

import useLeagueSummaryCard from "./LeagueSummaryCard.hooks";
import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function LeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { league, leagueError, leagueLoading, ready, ...rest } =
    useLeagueSummaryCard(props);

  // LOADING
  if (leagueLoading)
    return (
      <Icon
        className="size-16 animate-spin text-interface-red"
        variant="spinner"
      />
    );

  // ERROR
  if (!leagueLoading && !!leagueError)
    return <Alert variant="error">{leagueError}</Alert>;

  return (
    <div
      {...rest}
      className={twMerge(
        "h-71.5 w-full max-w-150 rounded-lg border-4 bg-interface-yellow custom-noise-5 p-4 shadow-2xl",
        "flex flex-col gap-4",

        "rotate-y-90 transition-transform delay-500 duration-500 will-change-transform",
        ready && "rotate-y-0",
      )}
    >
      {/* NAME */}
      <div className="flex items-center justify-between gap-1">
        <Typography className="font-semibold" variant="h2">
          Victory Points
        </Typography>

        <div className="flex items-center gap-1">
          <Image
            alt="victory points"
            className="size-7"
            src={victoryPoint.src}
          />
        </div>
      </div>

      {/* DIVIDER */}
      <Divider />

      {/* PLAYERS */}
      <div className="flex flex-col gap-2">
        {league?.players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            {/* COLOR */}
            <div
              className={twMerge(
                "size-4 flex-none rounded-xs border border-black",

                player.color === "red" && "bg-player-red",
                player.color === "blue" && "bg-player-blue",
                player.color === "white" && "bg-player-white",
                player.color === "orange" && "bg-player-orange",
                player.color === "green" && "bg-player-green",
                player.color === "brown" && "bg-player-brown",
              )}
            />

            {/* NAME */}
            <Typography className="line-clamp-1 font-semibold break-all">
              <Anchor href={`/profiles/${player.id}/view`}>
                {player.name}
              </Anchor>
            </Typography>

            {/* VICTORY POINTS */}
            <Typography className="ml-auto min-w-7 text-center font-semibold">
              {player.victoryPoints}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
