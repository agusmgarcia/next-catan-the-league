type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "onClick" | "type"
> & {
  variant: "raw";
};

export default ButtonProps;
