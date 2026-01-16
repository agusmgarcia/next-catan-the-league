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
    | "home"
    | "hourglass"
    | "list"
    | "logout"
    | "plus"
    | "profile"
    | "rules"
    | "spinner"
    | "star"
    | "switch";
};

export default IconProps;
