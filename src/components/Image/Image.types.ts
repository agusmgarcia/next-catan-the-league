type ImageProps = Required<
  Pick<React.ImgHTMLAttributes<HTMLImageElement>, "alt">
> & { src: string; viewer?: string } & Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "className"
  > & { height?: number; width?: number } & (
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
