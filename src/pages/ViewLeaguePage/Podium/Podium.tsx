import { twMerge } from "tailwind-merge";

import { Icon, PlayerImage, Typography } from "#src/components";

import usePodium from "./Podium.hooks";
import type PodiumProps from "./Podium.types";

export default function Podium(props: PodiumProps) {
  const { leagueCompleted, players, ready, transitions, ...rest } =
    usePodium(props);

  return (
    <div {...rest} className="flex w-full items-end justify-center">
      {/* BODY */}
      {players.map((player, index) => (
        <div
          key={player?.id || index}
          className={twMerge(
            "flex flex-[128px] grow-0 flex-col items-center gap-2",
            !player && "invisible",
          )}
        >
          <div
            className={twMerge(
              "relative flex flex-col items-center",
              "opacity-0",
              transitions && "transition-opacity",
              transitions && index === 0 && "delay-750",
              transitions && index === 1 && "delay-600",
              transitions && index === 2 && "delay-900",
              ready && "opacity-100",
            )}
          >
            {/* CROWN */}
            {leagueCompleted && index === 1 && (
              <Icon
                className="absolute -top-6 stroke-black text-interface-yellow"
                variant="crown"
              />
            )}

            {/* PHOTO URL */}
            <PlayerImage
              color={player?.color}
              src={player?.photoURL}
              variant="3.5rem"
            />
          </div>

          {/* PODIUM */}
          <div
            className={twMerge(
              "flex items-center justify-center",
              "w-full rounded-t-lg border-4 border-black/40 custom-noise-30",
              "shadow-2xl",

              "scale-y-0",
              transitions &&
                "origin-bottom transition-transform duration-500 will-change-transform",
              ready && "scale-y-100",

              index === 0 && "h-25",
              index === 1 && "h-36",
              index === 2 && "h-16",

              player?.color === "red" && "bg-player-red text-white",
              player?.color === "blue" && "bg-player-blue text-white",
              player?.color === "white" && "bg-player-white text-black",
              player?.color === "orange" && "bg-player-orange text-white",
              player?.color === "green" && "bg-player-green text-white",
              player?.color === "brown" && "bg-player-brown text-white",
            )}
          >
            <div className="flex">
              <Typography className="text-4xl">
                {index === 0 ? "2" : index === 1 ? "1" : "3"}
              </Typography>

              <Typography>
                {index === 0 ? "nd" : index === 1 ? "st" : "rd"}
              </Typography>
            </div>
          </div>

          {/* NAME */}
          <Typography className="line-clamp-1 font-semibold break-all">
            {player?.name || ""}
          </Typography>
        </div>
      ))}
    </div>
  );
}
