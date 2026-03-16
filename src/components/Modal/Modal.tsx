import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

import { Button, Icon, Typography } from "#src/components";

import useModal from "./Modal.hooks";
import type ModalProps from "./Modal.types";

export default function Modal(props: ModalProps) {
  const { children, heading, onClose, ssr, state, ...rest } = useModal(props);

  if (ssr) return <></>;

  const container = document.getElementById("__modals");
  if (!container)
    throw new Error("Use <Modal.Provider /> where you place your modals");

  return ReactDOM.createPortal(
    <dialog
      {...rest}
      className={twMerge(
        "m-auto flex h-[50vh] w-[calc(100vw-32px)] max-w-184 scale-0 flex-col gap-4 overflow-auto rounded-2xl p-4 outline-none",
        "transition-transform will-change-transform",
        state === "open" && "scale-100",
        state === "hidden" && "hidden",

        "backdrop:transition-colors",
        "backdrop:fixed backdrop:inset-0 backdrop:bg-black/0",
        state === "open" && "backdrop:bg-black/40",
        state === "hidden" && "backdrop:hidden",
      )}
    >
      {(!!heading || !!onClose) && (
        <div className="flex items-center justify-between">
          <Typography variant="h1">{heading}</Typography>

          {!!onClose && (
            <Button onClick={onClose} variant="raw">
              <Icon className="size-8" variant="cross" />
            </Button>
          )}
        </div>
      )}

      {children}
    </dialog>,
    container,
  );
}

Modal.Provider = function ModalProvider() {
  return <div id="__modals"></div>;
};
