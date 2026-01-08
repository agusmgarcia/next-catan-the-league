type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "checkboxes"
    | "crown"
    | "google"
    | "home"
    | "list"
    | "medal"
    | "plus"
    | "profile"
    | "spinner";
};

export default IconProps;
