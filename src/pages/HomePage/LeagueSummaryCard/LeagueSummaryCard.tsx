import { twMerge } from "tailwind-merge";

import victoryPoint from "#public/assets/victoryPoint.webp";
import { Alert, Divider, Icon, Image, Typography } from "#src/components";

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
        "h-71.5 w-full max-w-150 rounded-lg border-4 bg-interface-yellow bg-noise-30! p-4",
        "flex flex-col gap-4",

        "rotate-y-90 transition-transform delay-500 duration-500 will-change-transform",
        ready && "rotate-y-0",
      )}
    >
      {/* NAME */}
      <Typography variant="h2">Victory Points</Typography>

      {/* DIVIDER */}
      <Divider />

      {/* PLAYERS */}
      <div className="flex flex-col gap-2">
        {league?.players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            {/* COLOR */}
            <div
              className={twMerge(
                "size-4 rounded-xs border border-black",

                player.color === "red" && "bg-player-red",
                player.color === "blue" && "bg-player-blue",
                player.color === "white" && "bg-player-white",
                player.color === "orange" && "bg-player-orange",
                player.color === "green" && "bg-player-green",
                player.color === "brown" && "bg-player-brown",
              )}
            />

            {/* NAME */}
            <Typography>{player.name}</Typography>

            <div className="ml-auto flex items-center gap-1">
              <Typography>{player.victoryPoints}</Typography>
              <Image
                alt="victory points"
                className="size-4"
                src={victoryPoint.src}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
