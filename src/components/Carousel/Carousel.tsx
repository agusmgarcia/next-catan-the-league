import useCarousel from "./Carousel.hooks";
import type CarouselProps from "./Carousel.types";

export default function Carousel(props: CarouselProps) {
  const { ref, ...rest } = useCarousel(props);

  return (
    <div ref={ref} className="w-full overflow-x-hidden">
      <div {...rest} className="flex items-stretch" />
    </div>
  );
}
