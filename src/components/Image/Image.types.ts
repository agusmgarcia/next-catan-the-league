type ImageProps = Required<
  Pick<React.ImgHTMLAttributes<HTMLImageElement>, "alt">
> & { src: string } & Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "className"
  > &
  (
    | {
        blurSrc?: never;
        loading?: "eager";
      }
    | {
        blurSrc: string;
        loading: "lazy";
      }
  );

export default ImageProps;
