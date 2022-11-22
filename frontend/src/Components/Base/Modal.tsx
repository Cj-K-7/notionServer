import { forwardRef } from "react";
import "./modal.css";

interface OX {
  type: "YesOrNo";
  yes: string;
  no: string;
}

interface Warning {
  type: "Warning";
  icon?: React.ReactNode;
}

interface Confirm {
  type: "Confirm";
}

interface Submit {
  type: "Submit";
  formChildren: React.ReactNode;
}

interface AdditionalProps {
  covered?: boolean | undefined;
}

type IModal = React.DialogHTMLAttributes<HTMLDialogElement> &
  (OX | Warning | Confirm | Submit) &
  AdditionalProps;

const Modal = forwardRef<HTMLDialogElement, IModal>(
  ({ type, covered, ...props }, ref) => {
    //Class
    const className = ["modal", props.className].join(" ");
    const dialogClass = [className, covered ? "dim-cover" : "not-cover"].join(
      " "
    );

    //Render
    const modeRender = () => {
      switch (type) {
        case "YesOrNo": {
          return <button className={className}>ASqweqweD</button>;
        }
        case "Warning": {
          return <button className={className}>ASdaaD</button>;
        }
        case "Confirm": {
          return <button className={className}>ASssD</button>;
        }
        case "Submit": {
          return (
            <>
              {props.children}
              <button className={className}>ASaD</button>
            </>
          );
        }
      }
    };

    return (
      <dialog {...props} ref={ref} className={dialogClass}>
        <form method="dialog" className={className}>
          {modeRender()}
        </form>
      </dialog>
    );
  }
);

export default Modal;
