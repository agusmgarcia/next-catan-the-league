type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "crown" | "google" | "spinner";
};

export default IconProps;
