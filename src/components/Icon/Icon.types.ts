type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "arrowLeft"
    | "arrowRightWide"
    | "check"
    | "check-fill"
    | "checkboxes"
    | "cross"
    | "cross-fill"
    | "crown"
    | "google"
    | "hex"
    | "home"
    | "hourglass"
    | "list"
    | "logout"
    | "plus"
    | "profile"
    | "rules"
    | "spinner"
    | "star"
    | "switch"
    | "trophy";
};

export default IconProps;
