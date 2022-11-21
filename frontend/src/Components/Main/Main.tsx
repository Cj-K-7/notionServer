import Modal from "../Base/Modal";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = ["main", props.className].join(" ");

  return (
    <div className={className}>
      <Modal mode="OX" position="bottom" cover />
    </div>
  );
};

export default Main;
