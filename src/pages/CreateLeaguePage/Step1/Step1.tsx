import { Button, Divider, Form, Input } from "#src/components";

import useStep1 from "./Step1.hooks";
import type Step1Props from "./Step1.types";

export default function Step1(props: Step1Props) {
  const {
    back,
    backDisabled,
    disabled,
    onBack,
    onChange,
    state,
    submit,
    submitDisabled,
    ...rest
  } = useStep1(props);

  return (
    <Form {...rest} className="flex flex-col gap-4">
      {/* NAME */}
      <label className="flex items-center gap-4">
        Name:
        <Input
          disabled={disabled.name}
          name="name"
          onChange={onChange}
          placeholder="Insert a league name..."
          required={true}
          type="text"
          value={state.name}
        />
      </label>

      {/* DIVIDER */}
      <Divider />

      {/* MATCHES COUNT */}
      <label className="flex items-center gap-4">
        Matches count:
        <Input
          className="w-13 text-center"
          disabled={disabled.matchesCount}
          min={1}
          name="matchesCount"
          onChange={onChange}
          required={true}
          type="number"
          value={state.matchesCount}
        />
      </label>

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
