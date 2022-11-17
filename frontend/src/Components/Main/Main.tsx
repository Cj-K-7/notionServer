import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = ["main", props.className].join(" ");

  return <div className={className}></div>;
};

export default Main;
