import { type ImageProps } from "../Image";

type BannerProps = Pick<ImageProps, "className"> & { speed?: number };

export default BannerProps;
