import useIcon from "./Icon.hooks";
import type IconProps from "./Icon.types";

export default function Icon(props: IconProps) {
  const { variant, ...rest } = useIcon(props);

  switch (variant) {
    case "google":
      return (
        <svg {...rest}>
          <path d="M12 11h8.5329c0.044 0.3847 0.0671 0.7792 0.0671 1.1837 0 2.7347 -0.9796 5.0367 -2.6776 6.6 -1.4857 1.3714 -3.5184 2.1755 -5.9428 2.1755 -3.51027 0 -6.54694 -2.0122 -8.0245 -4.9469C3.34695 14.8 3 13.4286 3 11.9796c0 -1.449 0.34695 -2.8204 0.9551 -4.03262C5.43266 5.01226 8.46933 3 11.9796 3c2.4204 0 4.453 0.88983 6.0081 2.33878l-1.4622 1.46223C15.3682 5.68153 13.8028 5 12 5c-3.86599 0 -7 3.13401 -7 7 0 3.866 3.13401 7 7 7 3.5265 0 6.1443 -2.6077 6.577 -6H12v-2Z" />
        </svg>
      );

    default:
      throw new Error(`Variant ${variant} not found`);
  }
}
