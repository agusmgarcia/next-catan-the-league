import { useEffect, useMemo, useRef } from "react";

import type CarouselProps from "./Carousel.types";

export default function useCarousel({
  spacing: spacingFromProps,
  step: stepFromProps,
  ...rest
}: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  const childrenCount = useMemo(
    () => (Array.isArray(rest.children) ? rest.children.length : 1),
    [rest.children],
  );

  const style = useMemo(
    () => ({
      gap: `${spacingFromProps}px`,
      width: `calc(${childrenCount}00% + ${(spacingFromProps || 0) * (childrenCount - 1)}px)`,
    }),
    [childrenCount, spacingFromProps],
  );

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.scroll({
      behavior: "smooth",
      left:
        (root.scrollWidth / childrenCount + (spacingFromProps || 0)) *
        (stepFromProps - 1),
      top: root.offsetTop,
    });
  }, [childrenCount, spacingFromProps, stepFromProps]);

  return { ...rest, ref, style };
}
