type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "add" | "crown" | "google" | "home" | "list" | "medal" | "spinner";
};

export default IconProps;
