import { twMerge } from "tailwind-merge";

import {
  Alert,
  Icon,
  PlayerImage,
  Typography,
  VictoryPointImage,
} from "#src/components";

import useViewProfilePage from "./ViewProfilePage.hooks";
import type ViewProfilePageProps from "./ViewProfilePage.types";

export default function ViewProfilePage(props: ViewProfilePageProps) {
  const { profile, ...rest } = useViewProfilePage(props);

  if (!profile)
    return (
      <div {...rest} className="flex size-full flex-col p-4">
        <Alert variant="error">
          <Typography>Profile not found.</Typography>
        </Alert>
      </div>
    );

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
            title={profile.leaguesCountString}
            value={profile.leaguesCount}
          >
            <Icon
              className="size-7 stroke-black text-interface-red"
              variant="flag"
            />
          </Tile>

          {/* CHAMPION */}
          <Tile
            className="col-span-3"
            title={profile.leaguesWinCountString}
            value={profile.leaguesWinCount}
          >
            <Icon
              className="size-7 stroke-black text-interface-yellow"
              variant="crown"
            />
          </Tile>

          {/* VICTORY POINTS */}
          <Tile
            className="col-span-2"
            title={profile.pointsString}
            value={profile.points}
          >
            <VictoryPointImage />
          </Tile>

          {/* VICTORIES COUNT */}
          <Tile
            className="col-span-2"
            title={profile.victoriesCountString}
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
            title={profile.matchesCountString}
            value={profile.matchesCount}
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
