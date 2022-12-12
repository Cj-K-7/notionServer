import React, { useRef } from "react";
import Modal from "../Base/Modal";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);

  return <div className={className}></div>;
};

export default Main;
