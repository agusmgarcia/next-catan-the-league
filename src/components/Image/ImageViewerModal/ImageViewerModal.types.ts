import { type ModalProps } from "../../Modal";

type ImageViewerModalProps = Required<
  Pick<ModalProps, "heading" | "onClose" | "open">
> & {
  imageSrc: string;
};

export default ImageViewerModalProps;
