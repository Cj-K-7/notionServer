import { useEffect } from "react";
import { classCombine } from "../../Util/cssClass";
import { queryDB } from "../../APIs";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);
  useEffect(() => {
    const formdata = new FormData();
    const result = queryDB(formdata);
    result.then((a) => console.log(a));
  }, []);
  return <div className={className}></div>;
};

export default Main;
