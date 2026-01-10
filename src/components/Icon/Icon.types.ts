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
    | "plus"
    | "profile"
    | "spinner";
};

export default IconProps;
