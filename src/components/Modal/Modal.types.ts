import { type Func } from "@agusmgarcia/react-essentials-utils";

type ModalProps = Pick<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  "children" | "open"
> & {
  heading?: string;
  onClose?: Func;
};

export default ModalProps;
