import { useEffect, useState } from "react";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  //CSS Class
  const className = classCombine("main", props.className);

  return <div className={className}></div>;
};

export default Main;
