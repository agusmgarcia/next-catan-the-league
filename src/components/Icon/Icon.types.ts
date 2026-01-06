type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "add" | "crown" | "google" | "home" | "medal" | "spinner";
};

export default IconProps;
