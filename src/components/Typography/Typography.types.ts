type TypographyProps =
  | (Pick<
      React.HTMLAttributes<HTMLHeadingElement>,
      "children" | "className"
    > & {
      variant: "h1" | "h2";
    })
  | (Pick<
      React.HTMLAttributes<HTMLParagraphElement>,
      "children" | "className"
    > & { variant?: "p" });

export default TypographyProps;
