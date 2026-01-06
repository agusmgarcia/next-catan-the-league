import useFooter from "./Footer.hooks";
import type FooterProps from "./Footer.types";

export default function Footer(props: FooterProps) {
  const { ...rest } = useFooter(props);

  return (
    <div
      {...rest}
      className="hidden h-16 w-full border-t-4 bg-interface-red noise-30"
    ></div>
  );
}
