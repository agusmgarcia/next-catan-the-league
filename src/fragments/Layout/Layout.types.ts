import { type HeaderProps } from "./Header";

type LayoutProps = {
  children?: React.ReactNode;
  error?: unknown;
  heading?: HeaderProps["children"];
  loading?: boolean;
};

export default LayoutProps;
