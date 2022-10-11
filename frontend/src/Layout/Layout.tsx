import { forwardRef } from "react";
import "./Layout.css";

interface ILayout extends React.HTMLAttributes<HTMLDivElement> {
  childrens: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ childrens, ...props }) => {
  return (
    <div {...props}>
      <header></header>
      <main>{childrens}</main>
      <footer></footer>
    </div>
  );
};
