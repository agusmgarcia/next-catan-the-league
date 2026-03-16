import { type ModalProps } from "#src/components";

type ImageViewerModalProps = Required<
  Pick<ModalProps, "heading" | "onClose" | "open">
> & {
  imageAlt: string;
  imageSrc: string;
};

export default ImageViewerModalProps;
