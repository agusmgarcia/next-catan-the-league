import { twMerge } from "tailwind-merge";

import {
  Button,
  Divider,
  Form,
  Icon,
  Image,
  Input,
  PlayerImage,
  Typography,
  VictoryPointImage,
} from "#src/components";

import useCreateMatchPage from "./CreateMatchPage.hooks";
import type CreateMatchPageProps from "./CreateMatchPage.types";

export default function CreateMatchPage(props: CreateMatchPageProps) {
  const {
    attachScreenshotInputRef,
    match,
    onAttachScreenshotClick,
    onChange,
    onClearPhotoURLClick,
    onSubmit,
    state,
    submitDisabled,
    submitting,
    ...rest
  } = useCreateMatchPage(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4 overflow-auto">
      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-center justify-between">
          {/* CREATED AT */}
          <Typography>{match.createdAt}</Typography>

          <div className="flex flex-[100px] grow-0 items-center justify-between pr-1 pl-2.5">
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

        {/* ATTACH SCREENSHOT */}
        {!state.photoURL && (
          <Button
            className={twMerge(
              "flex h-37.5 flex-col items-center justify-center gap-2 rounded-lg border-3 border-dotted border-interface-yellow bg-interface-yellow/25 p-4",
              "disabled:border-gray-500 disabled:bg-gray-300 disabled:text-gray-500",
            )}
            disabled={submitting}
            onClick={onAttachScreenshotClick}
            variant="raw"
          >
            <Icon className="size-8 flex-none opacity-50" variant="camera" />
            <Typography>Attach screenshot</Typography>
          </Button>
        )}

        {/* PHOTO URL DISPLAY */}
        {!!state.photoURL && (
          <div className="relative">
            <Image
              alt="A screenshot of the match"
              className="h-37.5 rounded-lg"
              src={state.photoURL}
              viewer="Screenshot"
            />

            {!submitting && (
              <Button
                className="absolute top-2 right-2"
                onClick={onClearPhotoURLClick}
                variant="raw"
              >
                <Icon variant="cross" />
              </Button>
            )}
          </div>
        )}

        {/* PHOTO URL */}
        <input
          ref={attachScreenshotInputRef}
          accept="image/*"
          className="hidden"
          multiple={false}
          name="photoURL"
          onChange={onChange}
          type="file"
        />

        {/* DIVIDER */}
        <Divider />

        {/* OBSERVATIONS */}
        <label className="flex flex-col gap-2">
          Observations:
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

        {/* CTA */}
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
      </Form>
    </div>
  );
}
