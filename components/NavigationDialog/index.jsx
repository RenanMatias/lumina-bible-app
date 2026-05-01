import React from "react";
import { Dialog } from "@primer/react/experimental";

export default function BibleDialog({ isOpen, onClose, returnFocusRef }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog title="Bíblia" onClose={onClose} returnFocusRef={returnFocusRef}>
      This is where the dialog content would go.
    </Dialog>
  );
}
