type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "arrowRightWide"
    | "check"
    | "check-fill"
    | "checkboxes"
    | "cross"
    | "cross-fill"
    | "crown"
    | "google"
    | "home"
    | "list"
    | "plus"
    | "profile"
    | "rules"
    | "spinner"
    | "switch";
};

export default IconProps;
