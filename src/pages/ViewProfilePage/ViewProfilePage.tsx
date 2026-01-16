import { twMerge } from "tailwind-merge";

import {
  Icon,
  PlayerImage,
  Typography,
  VictoryPointImage,
} from "#src/components";

import useViewProfilePage from "./ViewProfilePage.hooks";
import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function ViewProfilePage(props: ViewProfilePageProps) {
  const { profile, ...rest } = useViewProfilePage(props);

  if (!profile) return <></>;

  return (
    <div {...rest} className="flex size-full flex-col overflow-auto">
      <div className="flex flex-2/5 flex-col items-center justify-center gap-2">
        {/* IMAGE */}
        <PlayerImage
          color={profile.defaultColor}
          src={profile.photoURL}
          variant="6rem"
        />

        {/* NAME */}
        <Typography variant="h1">{profile.name}</Typography>

        {/* EMAIL */}
        <Typography variant="h2">{profile.email}</Typography>
      </div>

      <div className="flex flex-3/5 flex-col items-center gap-4 rounded-t-4xl border-t-4 bg-white/60 custom-noise-5 p-8 custom-shadow-top-2xl">
        <div className="grid w-full grid-cols-6 gap-2">
          {/* LEAGUES */}
          <Tile
            className="col-span-3"
            title="Leagues"
            value={profile.activeLeaguesCount + profile.completedLeaguesCount}
          >
            <Icon
              className="size-7 stroke-black text-interface-red"
              variant="flag"
            />
          </Tile>

          {/* CHAMPION */}
          <Tile
            className="col-span-3"
            title="Champion"
            value={profile.leaguesWinCount}
          >
            <Icon
              className="size-7 stroke-black text-interface-yellow"
              variant="trophy"
            />
          </Tile>

          {/* VICTORY POINTS */}
          <Tile
            className="col-span-2"
            title="Points"
            value={profile.totalPoints}
          >
            <VictoryPointImage />
          </Tile>

          {/* VICTORIES COUNT */}
          <Tile
            className="col-span-2"
            title="Victories"
            value={profile.victoriesCount}
          >
            <Icon
              className="size-7 stroke-black text-interface-yellow"
              variant="star"
            />
          </Tile>

          {/* MATCHES */}
          <Tile
            className="col-span-2"
            title="Matches"
            value={profile.totalPoints}
          >
            <Icon
              className="size-7 stroke-black text-interface-green"
              variant="hex"
            />
          </Tile>
        </div>
      </div>
    </div>
  );
}

function Tile(props: {
  children: React.ReactNode;
  className?: string;
  title: string;
  value: number;
}) {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-center justify-between gap-1 rounded-lg border border-black/40 bg-white/60 p-4 shadow-2xl",
        props.className,
      )}
    >
      {props.children}
      <Typography className="line-clamp-1 text-3xl">{props.value}</Typography>
      <Typography className="line-clamp-1">{props.title}</Typography>
    </div>
  );
}
