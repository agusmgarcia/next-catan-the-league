type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "disabled" | "onClick" | "type"
> & {
  variant: "raw";
};

export default ButtonProps;
