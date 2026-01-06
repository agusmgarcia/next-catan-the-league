type AnchorProps = Pick<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "className"
> &
  Required<Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">>;

export default AnchorProps;
