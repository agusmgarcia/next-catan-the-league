type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "add" | "crown" | "google" | "medal" | "spinner";
};

export default IconProps;
