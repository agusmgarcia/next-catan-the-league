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
    | "plus"
    | "profile"
    | "rules"
    | "spinner"
    | "switch";
};

export default IconProps;
