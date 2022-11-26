import { useState } from "react";
import NavDepth from "./navigator/NavDepth";
import NavLink from "./navigator/NavLink";
import { classCombine } from "../../Util/cssClass";
import "./menubar.css";
import Icon from "../Icons/Icon";

interface IMenubar extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar: React.FC<IMenubar> = ({ ...props }) => {
  //State
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isPinned, setIsFinned] = useState<boolean>(false);

  //onEvent
  const onClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const { currentTarget } = event;
    currentTarget.style.transform = `rotateZ(${isPinned ? "-90" : "0"}deg)`;
    setIsFinned((previous) => !previous);
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { style },
    } = event;
    const show = () => (style.transform = `translateY(5vh)`);
    clearTimeout(timer);
    show();
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { style },
    } = event;
    const hide = () => (style.transform = `translateY(0vh)`);
    const hideDelay = setTimeout(hide, 666);
    setTimer(hideDelay);
  };

  //Class
  const className = classCombine(
    "menubar",
    props.className,
    isPinned ? "pinned" : undefined
  );

  return (
    <div
      {...props}
      className={className}
      onMouseEnter={isPinned ? undefined : onMouseEnter}
      onMouseLeave={isPinned ? undefined : onMouseLeave}
    >
      <NavDepth />
      <NavLink />
      <Icon icon="thumbtack" onClick={onClick} />
    </div>
  );
};

export default Menubar;
