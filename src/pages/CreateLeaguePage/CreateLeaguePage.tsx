import { Carousel } from "#src/components";

import useCreateLeaguePage from "./CreateLeaguePage.hooks";
import type CreateLeaguePageProps from "./CreateLeaguePage.types";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

export default function CreateLeaguePage(props: CreateLeaguePageProps) {
  const {
    backDisabled,
    disabled,
    onBack,
    onChange,
    onSubmit,
    state,
    step,
    submitDisabled,
    ...rest
  } = useCreateLeaguePage(props);

  return (
    <div {...rest} className="size-full overflow-auto">
      <Carousel spacing={16} step={step}>
        <Step1
          back="Back"
          backDisabled={backDisabled}
          disabled={disabled}
          onBack={onBack}
          onChange={onChange}
          onSubmit={onSubmit}
          state={state}
          submit="Next"
          submitDisabled={submitDisabled}
        />

        <Step2
          back="Back"
          backDisabled={backDisabled}
          disabled={disabled}
          onBack={onBack}
          onChange={onChange}
          onSubmit={onSubmit}
          state={state}
          submit="Create"
          submitDisabled={submitDisabled}
        />
      </Carousel>
    </div>
  );
}
