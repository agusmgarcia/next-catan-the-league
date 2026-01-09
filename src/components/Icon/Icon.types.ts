type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "check-fill"
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
