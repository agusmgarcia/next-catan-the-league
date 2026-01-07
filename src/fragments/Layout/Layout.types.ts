import { type TitleProps } from "../Title";
import { type HeaderProps } from "./Header";

type LayoutProps = {
  children?: React.ReactNode;
  error?: unknown;
  heading?: HeaderProps["children"];
  loading?: boolean;
  title?: TitleProps["children"];
};

export default LayoutProps;
