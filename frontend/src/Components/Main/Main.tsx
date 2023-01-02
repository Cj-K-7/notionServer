import { useEffect } from "react";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);

  const getPage = async () => {
    const response = await fetch(
      `http://localhost:5000/api/database?id=7c44f37100c04f629a058a209560828a`
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getPage();
  }, []);

  return <div className={className}>??</div>;
};

export default Main;
