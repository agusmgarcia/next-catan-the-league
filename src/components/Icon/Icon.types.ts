type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "add"
    | "checkboxes"
    | "crown"
    | "google"
    | "home"
    | "list"
    | "medal"
    | "profile"
    | "spinner";
};

export default IconProps;
