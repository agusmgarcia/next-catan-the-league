import { twMerge } from "tailwind-merge";

import {
  Anchor,
  Divider,
  Icon,
  Typography,
  VictoryPointImage,
} from "#src/components";

import useLeagueSummaryCard from "./LeagueSummaryCard.hooks";
import type LeagueSummaryCardProps from "./LeagueSummaryCard.types";

export default function LeagueSummaryCard(props: LeagueSummaryCardProps) {
  const { players, ready, transitions, ...rest } = useLeagueSummaryCard(props);

  return (
    <div
      {...rest}
      className={twMerge(
        "h-71.5 w-full max-w-150 rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl",
        "flex flex-col gap-4",

        "rotate-y-90",
        transitions &&
          "transition-transform delay-500 duration-500 will-change-transform",
        ready && "rotate-y-0",
      )}
    >
      {/* NAME */}
      <div className="flex items-center justify-between gap-1">
        <Typography variant="h2">Summary</Typography>

        <div className="flex flex-[80px] grow-0 items-center justify-between">
          {/* VICTORY POINTS IMAGE */}
          <VictoryPointImage />

          {/* CROWN */}
          <Icon
            className="size-7 stroke-black text-interface-yellow"
            variant="star"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <Divider />

      {/* PLAYERS */}
      <div className="flex flex-col gap-2">
        {players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            {/* COLOR */}
            <div
              className={twMerge(
                "size-4 max-h-4 min-h-4 max-w-4 min-w-4 rounded-full border border-black",
                player.color === "red" && "bg-player-red",
                player.color === "blue" && "bg-player-blue",
                player.color === "white" && "bg-player-white",
                player.color === "orange" && "bg-player-orange",
                player.color === "green" && "bg-player-green",
                player.color === "brown" && "bg-player-brown",
              )}
            />

            {/* NAME */}
            <Typography className="line-clamp-1 break-all">
              {!!player.profileId ? (
                <Anchor href={`/profiles/${player.profileId}/view`}>
                  {player.name}
                </Anchor>
              ) : (
                player.name
              )}
            </Typography>

            <div className="ml-auto flex w-20 items-center justify-between">
              {/* POINTS */}
              <Typography className="w-7 text-center">
                {player.points}
              </Typography>

              {/* WINS */}
              <Typography className="w-7 text-center">{player.wins}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
