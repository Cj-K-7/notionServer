import { forwardRef } from "react";
import "./modal.css";

interface IModal extends React.DialogHTMLAttributes<HTMLDialogElement> {
  mode: "OX" | "Warning" | "Confirm" | "Submit";
  cover?: boolean | undefined;
  position?: "top" | "bottom" | "left" | "right";
}

const Modal = forwardRef<HTMLDialogElement, IModal>(
  ({ mode, cover, position, ...props }, ref) => {
    //Class
    const className = ["modal", props.className].join(" ");
    const dialogClass = [
      className,
      cover ? "dim-cover" : "not-cover",
      position ? position : "no-position",
    ].join(" ");

    //Render
    const modeRender = () => {
      switch (mode) {
        case "OX": {
          return <button className={className}>O</button>;
        }
        case "Warning": {
          return;
        }
        case "Confirm": {
          return;
        }
        case "Submit": {
          return <>{props.children}</>;
        }
      }
    };

    return (
      <dialog ref={ref} {...props} className={dialogClass}>
        <form method="dialog" className={className}>
          {modeRender()}
        </form>
      </dialog>
    );
  }
);

export default Modal;
