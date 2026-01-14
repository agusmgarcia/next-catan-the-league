import {
  Button,
  Divider,
  Icon,
  Input,
  PlayerImage,
  Typography,
  VictoryPointImage,
} from "#src/components";

import useCreateMatchPage from "./CreateMatchPage.hooks";
import type CreateMatchPageProps from "./CreateMatchPage.types";

export default function CreateMatchPage(props: CreateMatchPageProps) {
  const {
    match,
    onChange,
    onSubmit,
    state,
    submitDisabled,
    submitting,
    ...rest
  } = useCreateMatchPage(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4 overflow-auto">
      <form
        className="flex w-full flex-col gap-4 rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl"
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-between">
          {/* CREATED AT */}
          <Typography className="underline">{match.createdAt}</Typography>

          <div className="flex flex-[100px] grow-0 items-center justify-between pr-1 pl-2.5">
            {/* VICTORY POINTS IMAGE */}
            <VictoryPointImage />

            {/* CROWN */}
            <Icon
              className="size-7 stroke-black text-interface-yellow"
              variant="crown"
            />
          </div>
        </div>

        {/* DIVIDER */}
        <Divider />

        {/* PLAYERS */}
        <div className="flex flex-col gap-2">
          {match.players.map((player) => (
            <div key={player.id} className="flex items-center gap-2">
              <div className="relative">
                {/* IMAGE */}
                <PlayerImage
                  color={player.color}
                  src={player.photoURL}
                  variant="3rem"
                />

                {/* APPROVED */}
                {!!state.players[player.id]?.approved && (
                  <Icon
                    className="absolute top-8 -right-2 text-interface-green"
                    variant="check-fill"
                  />
                )}
              </div>

              {/* NAME */}
              <Typography>{player.name}</Typography>

              <div className="flex flex-1 items-center justify-end gap-4">
                {/* VICTORY POINTS */}
                <Input
                  aria-label="Victory points"
                  className="w-12 text-center"
                  disabled={submitting}
                  min={0}
                  name={`points.${player.id}`}
                  onChange={onChange}
                  required={true}
                  type="number"
                  value={state.players[player.id]?.points}
                />

                {/* WINNER */}
                <Input
                  aria-label="Winner"
                  checked={state.winnerId === player.id}
                  disabled={!!state.winnerDisabled[player.id] || submitting}
                  name="winnerId"
                  onChange={onChange}
                  type="radio"
                  value={player.id}
                />
              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <Divider />

        {/* OBSERVATIONS */}
        <label className="flex flex-col gap-2">
          <Typography className="underline" variant="span">
            Observations:
          </Typography>
          <Input
            disabled={submitting}
            name="observations"
            onChange={onChange}
            placeholder="Insert an observation..."
            rows={4}
            type="textarea"
            value={state.observations}
          />
        </label>

        <Button
          className="flex justify-center"
          disabled={submitDisabled}
          type="submit"
          variant="primary"
        >
          {!submitting ? (
            "Create"
          ) : (
            <Icon className="animate-spin" variant="spinner" />
          )}
        </Button>
      </form>
    </div>
  );
}
