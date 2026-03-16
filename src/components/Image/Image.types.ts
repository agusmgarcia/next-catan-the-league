type ImageProps = Required<
  Pick<React.ImgHTMLAttributes<HTMLImageElement>, "alt">
> & {
  ref?: React.ForwardedRef<HTMLImageElement>;
  src: string;
  viewer?: string;
} & Pick<React.ImgHTMLAttributes<HTMLImageElement>, "className"> & {
    height?: number;
    width?: number;
  } & (
    | {
        blurSrc?: never;
        loading?: "eager";
      }
    | {
        blurSrc?: string;
        loading: "lazy";
      }
  );

export default ImageProps;
