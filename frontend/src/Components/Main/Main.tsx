import { useEffect, useRef } from "react";
import Modal from "../Base/Modal";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);
  const ref = useRef<HTMLDialogElement>(null);
  const bounceLimit = 40;
  let timeout: NodeJS.Timeout;

  const onClick = () => {
    ref.current?.showModal();
    console.log("??");
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { currentTarget } = event;
    const { scrollTop, scrollHeight, offsetHeight } = currentTarget;

    console.log(scrollTop, offsetHeight, scrollHeight - bounceLimit);

    clearTimeout(timeout);
    if (scrollTop < bounceLimit) {
      console.log("start");
      timeout = setTimeout(() => {
        currentTarget.scrollTo({ top: bounceLimit, behavior: "smooth" });
      }, 369);
    }
    if (scrollTop + offsetHeight > scrollHeight - bounceLimit) {
      console.log("end");
      timeout = setTimeout(() => {
        currentTarget.scrollTo({
          top: scrollTop - bounceLimit,
          behavior: "smooth",
        });
      }, 369);
    }
  };

  return (
    <div className={className}>
      <div className="scroll" onScroll={onScroll}>
        <div id="a"></div>
      </div>
      <button type="button" onClick={onClick}>
        modal
      </button>
      <Modal ref={ref} type="Confirm" covered />
    </div>
  );
};

export default Main;
