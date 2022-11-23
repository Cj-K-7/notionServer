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

type Position = "top" | "left" | "right" | "bottom";

/**position : if more than 1 position you want, it must be array */
interface AdditionalProps {
  covered?: boolean | undefined;
  position?: Position | Position[];
}

type IModal = React.DialogHTMLAttributes<HTMLDialogElement> &
  (OX | Warning | Confirm | Submit) &
  AdditionalProps;

const Modal = forwardRef<HTMLDialogElement, IModal>(
  ({ type, covered, position, ...props }, ref) => {
    //Class
    const className = ["modal", props.className].join(" ");
    const dialogClass = [className, covered ? "dim-cover" : "not-cover"].join(
      " "
    );
    const formClass = [className, position].flat().join(" ");

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
        <form method="dialog" className={formClass}>
          {modeRender()}
        </form>
      </dialog>
    );
  }
);

export default Modal;
