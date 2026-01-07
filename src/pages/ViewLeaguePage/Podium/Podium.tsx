import { twMerge } from "tailwind-merge";

import { Alert, Icon, Image, Typography } from "#src/components";

import usePodium from "./Podium.hooks";
import type PodiumProps from "./Podium.types";

export default function Podium(props: PodiumProps) {
  const {
    leagueCompleted,
    players,
    playersError,
    playersLoading,
    ready,
    ...rest
  } = usePodium(props);

  return (
    <div {...rest} className="flex w-full items-end justify-center">
      {/* LOADING */}
      {playersLoading && (
        <Icon
          className="size-16 animate-spin text-interface-red"
          variant="spinner"
        />
      )}

      {/* ERROR */}
      {!playersLoading && !!playersError && (
        <Alert variant="error">
          <Typography>{playersError}</Typography>
        </Alert>
      )}

      {/* BODY */}
      {!playersLoading &&
        !playersError &&
        players.map((player, index) => (
          <div
            key={player?.id || index}
            className={twMerge(
              "flex flex-[128px] grow-0 flex-col items-center gap-2",
              !player && "invisible",
            )}
          >
            <div className="relative flex flex-col items-center">
              {/* CROWN */}
              {leagueCompleted && index === 1 && (
                <Icon
                  className={twMerge(
                    "absolute -right-4 bottom-0",
                    "opacity-0 transition-opacity delay-600",
                    ready && "opacity-100",

                    player?.color === "red" && "text-player-red",
                    player?.color === "blue" && "text-player-blue",
                    player?.color === "white" && "text-black/50",
                    player?.color === "orange" && "text-player-orange",
                    player?.color === "green" && "text-player-green",
                    player?.color === "brown" && "text-player-brown",
                  )}
                  variant="medal"
                />
              )}

              {/* PHOTO URL */}
              <Image
                alt="player's face"
                className={twMerge(
                  "h-14 w-14 rounded-full border-4",

                  "opacity-0 transition-opacity",
                  ready && "opacity-100",
                  index === 0 && "delay-750",
                  index === 1 && "delay-600",
                  index === 2 && "delay-900",

                  player?.color === "red" && "border-player-red",
                  player?.color === "blue" && "border-player-blue",
                  player?.color === "white" && "border-black/50",
                  player?.color === "orange" && "border-player-orange",
                  player?.color === "green" && "border-player-green",
                  player?.color === "brown" && "border-player-brown",
                )}
                src={player?.photoURL || ""}
              />
            </div>

            {/* PODIUM */}
            <div
              className={twMerge(
                "flex items-center justify-center",
                "w-full rounded-t-lg border-4 border-black/40 custom-noise-30",
                "shadow-2xl",

                "origin-bottom scale-y-0 transition-transform duration-500 will-change-transform",
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
              {player?.name || "-"}
            </Typography>
          </div>
        ))}
    </div>
  );
}
