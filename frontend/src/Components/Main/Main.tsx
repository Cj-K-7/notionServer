import { useEffect, useState } from "react";
import { classCombine } from "../../Util/cssClass";
import UsersOnVaction from "../Item/User/UserOnVacation";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  //CSS Class
  const className = classCombine("main", props.className);

  return (
    <div className={className}>
      <UsersOnVaction />
    </div>
  );
};

export default Main;
