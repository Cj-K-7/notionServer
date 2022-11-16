import NavDepth from "./navigator/NavDepth";
import NavLink from "./navigator/NavLink";
import "./menubar.css";

interface IMenubar extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar: React.FC<IMenubar> = ({ ...props }) => {
  //class
  const className = ["menubar", props.className].join(" ");

  return (
    <div {...props} className={className}>
      <NavDepth />
      <NavLink />
    </div>
  );
};

export default Menubar;
