import React from "react";
import ReactDOM from "react-dom";
import { DraggableStateSnapshot } from "react-beautiful-dnd";

type DraggablePortalProps = {
  children: JSX.Element;
  snapshot: DraggableStateSnapshot;
};
export default function DraggablePortalHandler({
  children,
  snapshot,
}: DraggablePortalProps) {
  if (snapshot.isDragging)
    return ReactDOM.createPortal(children, document.body);
  return children;
}
