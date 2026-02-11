import { type ModalProps } from "../../Modal";

type ImageViewerModalProps = Required<
  Pick<ModalProps, "heading" | "onClose" | "open">
> & {
  imageAlt: string;
  imageSrc: string;
};

export default ImageViewerModalProps;
