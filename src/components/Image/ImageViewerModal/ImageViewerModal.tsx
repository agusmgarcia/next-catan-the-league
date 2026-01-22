/* eslint-disable @next/next/no-img-element */
import { Modal } from "../../Modal";
import useImageViewerModal from "./ImageViewerModal.hooks";
import type ImageViewerModalProps from "./ImageViewerModal.types";

export default function ImageViewerModal(props: ImageViewerModalProps) {
  const { imageSrc, ...rest } = useImageViewerModal(props);

  return (
    <Modal {...rest}>
      <div className="size-full overflow-hidden rounded-lg">
        <img
          alt="asd"
          className="block size-full bg-gray-300 object-cover"
          src={imageSrc}
        />
      </div>
    </Modal>
  );
}
