import { twMerge } from "tailwind-merge";

import {
  Alert,
  Button,
  Divider,
  Icon,
  Image,
  PlayerImage,
  Typography,
} from "#src/components";

import useApproveMatchesPage from "./ApproveMatchesPage.hooks";
import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function ApproveMatchesPage(props: ApproveMatchesPageProps) {
  const { leagues, past, ...rest } = useApproveMatchesPage(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4 overflow-auto">
      {!leagues.length && (
        <Alert variant="success">
          <Typography>
            {!past
              ? "There are no pending matches to be approved."
              : "There are no past matches to display."}
          </Typography>
        </Alert>
      )}

      {leagues.map((league) => (
        <div key={league.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-1">
            <Typography variant="h2">{league.name}</Typography>

            <Typography className="rounded-lg bg-interface-yellow px-2">
              {league.count}
            </Typography>
          </div>

          <Divider />

          {league.matches.map((match) => (
            <div
              key={match.id}
              className={twMerge(
                "flex flex-col gap-4 rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl",
                !match.status
                  ? "border-black"
                  : match.status === "Approved"
                    ? "border-interface-green"
                    : "border-interface-red",
              )}
            >
              <div className="flex items-center justify-between">
                <Typography>{match.createdAt}</Typography>

                {match.status === "Approved" && (
                  <Icon className="text-interface-green" variant="check-fill" />
                )}

                {match.status === "Rejected" && (
                  <Icon className="text-interface-red" variant="cross-fill" />
                )}
              </div>

              <div className="flex justify-start gap-4">
                {match.players.map((player) => (
                  <div
                    key={player.id}
                    className="relative flex flex-col items-center gap-1"
                  >
                    <PlayerImage
                      color={player.color}
                      src={player.photoURL}
                      variant="3rem"
                    />

                    {typeof player.approved === "boolean" && (
                      <Icon
                        className={twMerge(
                          "absolute top-8 -right-2",
                          player.approved
                            ? "text-interface-green"
                            : "text-interface-red",
                        )}
                        variant={player.approved ? "check-fill" : "cross-fill"}
                      />
                    )}

                    <Typography className="line-clamp-1 break-all">
                      {player.points}
                    </Typography>
                  </div>
                ))}
              </div>

              {!!match.photoURL && !!match.photoBlurURL && (
                <Image
                  alt="proof of winner"
                  blurSrc={match.photoBlurURL}
                  className="h-35 rounded-lg"
                  loading="lazy"
                  src={match.photoURL}
                  viewer="Screenshot"
                />
              )}

              {!!match.observations && (
                <div className="rounded-lg bg-interface-yellow/30 p-4">
                  <Typography className="italic">
                    {match.observations}
                  </Typography>
                </div>
              )}

              {!match.status && (
                <div className="flex gap-2">
                  <Button
                    className="flex items-center justify-center gap-1"
                    disabled={match.rejectDisabled}
                    onClick={match.reject}
                    variant="secondary"
                  >
                    {match.rejectLoading ? (
                      <Icon className="animate-spin" variant="spinner" />
                    ) : (
                      <>
                        <Icon variant="cross" />
                        Reject
                      </>
                    )}
                  </Button>

                  <Button
                    className="flex items-center justify-center gap-1"
                    disabled={match.approveDisabled}
                    onClick={match.approve}
                    variant="primary"
                  >
                    {match.approveLoading ? (
                      <Icon className="animate-spin" variant="spinner" />
                    ) : (
                      <>
                        <Icon variant="check" />
                        Approve
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
