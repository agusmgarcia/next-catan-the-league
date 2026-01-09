type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "check"
    | "check-fill"
    | "checkboxes"
    | "cross"
    | "cross-fill"
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
