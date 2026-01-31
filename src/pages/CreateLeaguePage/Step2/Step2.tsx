import {
  Button,
  Divider,
  Form,
  Icon,
  Input,
  PlayerImage,
  Typography,
} from "#src/components";

import useStep2 from "./Step2.hooks";
import type Step2Props from "./Step2.types";

export default function Step2(props: Step2Props) {
  const {
    back,
    backDisabled,
    disabled,
    onBack,
    onChange,
    state,
    submit,
    submitDisabled,
    users,
    ...rest
  } = useStep2(props);

  return (
    <Form {...rest} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {/* PLAYERS */}
        <Typography>Players</Typography>

        {/* ADMIN */}
        <Icon className="mr-1 size-7" variant="admin" />
      </div>

      {/* DIVIDER */}
      <Divider />

      {/* PLAYERS SELECTION */}
      {state.players.map((p, index) => (
        <div key={p.color} className="flex items-center gap-4">
          {/* PLAYER IMAGE */}
          <div className="relative">
            <PlayerImage color={p.color} src={users[p.id]} variant="3rem" />

            {!!users[p.id] && (
              <Icon
                className="absolute top-8 -right-2 text-interface-green"
                variant="check-fill"
              />
            )}
          </div>

          {/* PLAYER EMAIL */}
          <Input
            aria-label={`Player ${index + 1} email`}
            disabled={disabled.players[index].id}
            name={`players.${index}.id`}
            onChange={onChange}
            placeholder="Insert a user email..."
            type="email"
            value={p.id}
          />

          {/* PLAYER ADMIN */}
          <Input
            aria-label={`Player ${index + 1} admin`}
            checked={p.admin}
            disabled={disabled.players[index].admin}
            name={`players.${index}.admin`}
            onChange={onChange}
            type="checkbox"
          />
        </div>
      ))}

      {/* DIVIDER */}
      <Divider className="mt-auto" />

      {/* BUTTONS */}
      <div className="flex gap-2">
        {/* BACK */}
        {!!back && !!onBack && (
          <Button
            disabled={!!backDisabled}
            onClick={onBack}
            variant="secondary"
          >
            {back}
          </Button>
        )}

        {/* CTA */}
        <Button disabled={submitDisabled} type="submit" variant="primary">
          {submit}
        </Button>
      </div>
    </Form>
  );
}
