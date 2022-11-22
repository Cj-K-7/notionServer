import { useRef } from "react";
import Modal from "../Base/Modal";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = ["main", props.className].join(" ");
  const ref = useRef<HTMLDialogElement>(null);
  const onClick = () => {
    ref.current?.showModal();
    console.log("??");
  };

  return (
    <div className={className} onClick={onClick}>
      <Modal ref={ref} type="Confirm" covered />
    </div>
  );
};

export default Main;
