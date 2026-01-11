type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  "aria-label" | "className" | "disabled"
> &
  Required<Pick<React.InputHTMLAttributes<HTMLInputElement>, "name">> &
  (
    | {
        min?: number;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        required?: boolean;
        type: "number";
        value: number;
      }
    | {
        checked: boolean;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        type: "radio";
        value: string;
      }
    | {
        onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
        required?: boolean;
        rows?: number;
        type: "textarea";
        value: string;
      }
    | {
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        required?: boolean;
        type: "text";
        value: string;
      }
    | {
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        required?: boolean;
        type: "email";
        value: string;
      }
    | {
        checked: boolean;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        type: "checkbox";
        value?: never;
      }
  );

export default InputProps;
