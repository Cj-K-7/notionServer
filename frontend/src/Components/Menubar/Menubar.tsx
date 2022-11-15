import { useState } from "react";
import "./menubar.css";
import NavDepth from "./navigator/NavDepth";
import NavLink from "./navigator/NavLink";

interface IMenubar extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar: React.FC<IMenubar> = ({ ...props }) => {
  //class
  const className = ["menubar", props.className].join(" ");

  return (
    <div {...props} className={className}>
      <NavDepth stacks={[]} />
      <NavLink links={[]} />
    </div>
  );
};

export default Menubar;
