import { twMerge } from "tailwind-merge";

import {
  Alert,
  Anchor,
  Button,
  Divider,
  Icon,
  Image,
  Typography,
} from "#src/components";
import { Layout } from "#src/fragments";

import useApproveMatchesPage from "./ApproveMatchesPage.hooks";
import type ApproveMatchesPageProps from "./ApproveMatchesPage.types";

export default function ApproveMatchesPage(props: ApproveMatchesPageProps) {
  const { leagues, past, ...rest } = useApproveMatchesPage(props);

  return (
    <Layout {...rest}>
      <div className="flex size-full flex-col gap-4 overflow-auto">
        {!leagues.length && (
          <Alert variant="success">
            <Typography className="font-semibold">
              {!past
                ? "There are no pending matches to be approved."
                : "There are no past matches to display."}
            </Typography>
          </Alert>
        )}

        {leagues.map((league) => (
          <div key={league.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-1">
              <Typography className="font-semibold" variant="h2">
                {league.name}
              </Typography>

              <Typography className="rounded-lg bg-interface-yellow px-2 font-semibold">
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
                  <Typography className="font-semibold underline">
                    {match.createdAt}
                  </Typography>

                  {match.status === "Approved" && (
                    <Icon
                      className="text-interface-green"
                      variant="check-fill"
                    />
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
                      <Image
                        alt="player's face"
                        className={twMerge(
                          "h-12 w-12 rounded-full border-4",
                          player.color === "red" && "border-player-red",
                          player.color === "blue" && "border-player-blue",
                          player.color === "white" && "border-black/50",
                          player.color === "orange" && "border-player-orange",
                          player.color === "green" && "border-player-green",
                          player.color === "brown" && "border-player-brown",
                        )}
                        src={player.photoURL}
                      />

                      {typeof player.approved === "boolean" && (
                        <Icon
                          className={twMerge(
                            "absolute top-8 -right-2",
                            player.approved
                              ? "text-interface-green"
                              : "text-interface-red",
                          )}
                          variant={
                            player.approved ? "check-fill" : "cross-fill"
                          }
                        />
                      )}

                      <Typography className="line-clamp-1 font-semibold break-all">
                        {player.points}
                      </Typography>
                    </div>
                  ))}
                </div>

                {!!match.photoURL && (
                  <Image
                    alt="proof of winner"
                    className="h-35 rounded-lg"
                    src={match.photoURL}
                  />
                )}

                {!!match.observations && (
                  <div className="rounded-lg bg-interface-yellow/30 p-4">
                    <Typography className="font-semibold italic">
                      {match.observations}
                    </Typography>
                  </div>
                )}

                {!match.status && (
                  <div className="flex gap-2">
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
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <Divider />

        <Typography className="font-semibold">
          {!past ? (
            <Anchor href="/leagues/matches/past">View past matches</Anchor>
          ) : (
            <Anchor href="/leagues/matches/approve">
              View pending matches
            </Anchor>
          )}
        </Typography>
      </div>
    </Layout>
  );
}
