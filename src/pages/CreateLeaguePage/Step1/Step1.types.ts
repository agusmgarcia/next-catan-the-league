import { type Func } from "@agusmgarcia/react-essentials-utils";

import { type FormProps, type InputProps } from "#src/components";

type Step1Props = {
  back: string | undefined;
  backDisabled: boolean | undefined;
  disabled: { matchesCount: boolean; name: boolean };
  onBack: Func | undefined;
  state: { matchesCount: number; name: string };
  submit: string;
  submitDisabled: boolean;
} & Pick<InputProps & { type: "number" | "text" }, "onChange"> &
  Required<Pick<FormProps, "onSubmit">>;

export default Step1Props;
