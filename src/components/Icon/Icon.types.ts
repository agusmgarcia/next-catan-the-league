type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "crown" | "google" | "medal" | "spinner";
};

export default IconProps;
