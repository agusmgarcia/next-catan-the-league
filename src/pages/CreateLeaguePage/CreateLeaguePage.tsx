import {
  Button,
  Divider,
  Icon,
  Input,
  PlayerImage,
  Typography,
} from "#src/components";

import useCreateLeaguePage from "./CreateLeaguePage.hooks";
import type CreateLeaguePageProps from "./CreateLeaguePage.types";

export default function CreateLeaguePage(props: CreateLeaguePageProps) {
  const {
    onChange,
    onSubmit,
    state,
    submitDisabled,
    submitting,
    users,
    ...rest
  } = useCreateLeaguePage(props);

  return (
    <div {...rest} className="flex size-full flex-col gap-4 overflow-auto">
      <form
        className="flex w-full flex-col gap-4 rounded-lg border-4 bg-white/60 custom-noise-5 p-4 shadow-2xl"
        onSubmit={onSubmit}
      >
        <label className="flex flex-col gap-2">
          <Typography className="underline" variant="span">
            Name:
          </Typography>
          <Input
            disabled={submitting}
            name="name"
            onChange={onChange}
            placeholder="Insert a league name..."
            required={true}
            type="text"
            value={state.name}
          />
        </label>

        <Divider />

        <div className="flex flex-col gap-4">
          {state.players.map((p, index) => (
            <div key={p.color} className="flex items-center gap-4">
              <div className="relative">
                <PlayerImage color={p.color} src={users[p.id]} variant="3rem" />

                {!!users[p.id] && (
                  <Icon
                    className="absolute top-8 -right-2 text-interface-green"
                    variant="check-fill"
                  />
                )}
              </div>

              <Input
                aria-label={`Player ${index + 1} email`}
                disabled={submitting}
                name={`players.${index}.id`}
                onChange={onChange}
                placeholder="Insert a user email..."
                type="email"
                value={p.id}
              />

              <Input
                aria-label={`Player ${index + 1} admin`}
                checked={p.admin}
                disabled={submitting || !p.id}
                name={`players.${index}.admin`}
                onChange={onChange}
                type="checkbox"
              />
            </div>
          ))}
        </div>

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
