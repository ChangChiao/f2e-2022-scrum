import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: JSX.Element;
};
export default function ModalPortal({ children }: ModalProps) {
  return ReactDOM.createPortal(children, document.body);
}
