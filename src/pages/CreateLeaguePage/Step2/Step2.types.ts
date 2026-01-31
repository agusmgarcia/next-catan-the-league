import { type Func } from "@agusmgarcia/react-essentials-utils";

import { type CatanClientTypes } from "#src/apis";
import { type FormProps, type InputProps } from "#src/components";

type Step2Props = {
  back: string | undefined;
  backDisabled: boolean | undefined;
  disabled: { players: { admin: boolean; id: boolean }[] };
  onBack: Func | undefined;
  state: {
    players: {
      admin: boolean;
      color: CatanClientTypes.PlayerColor;
      id: string;
    }[];
  };
  submit: string;
  submitDisabled: boolean;
} & Pick<InputProps & { type: "checkbox" | "email" }, "onChange"> &
  Required<Pick<FormProps, "onSubmit">>;

export default Step2Props;
