import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../Base/Modal";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

const bounceLimit = 40 as const;
const transtionDuration = 276 as const;

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);
  const ref = useRef<HTMLDialogElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [startTouchY, setStartTouchY] = useState(0);
  const [endTouchY, setEndTouchY] = useState(0);
  const overScrollY = useMemo(() => {
    const distance = Math.abs(endTouchY - startTouchY);
    return distance;
  }, [startTouchY, endTouchY]);
  let timeout: NodeJS.Timeout;

  const onClick = () => {
    ref.current?.showModal();
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const { touches } = event;
    const touch = touches[0];
    setIsTouching(true);
    console.log("start");
    setEndTouchY(0);
    setStartTouchY(touch.screenY);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const { currentTarget, touches } = event;
    const { scrollTop, scrollHeight, clientHeight } = currentTarget;
    const touch = touches[0];
    setEndTouchY(touch.screenY);
    if (scrollTop === 0) {
      currentTarget.style.paddingTop = `${overScrollY}px`;
    } else if (scrollTop + clientHeight === scrollHeight) {
      currentTarget.style.paddingBottom = `${overScrollY}px`;
    }
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    const { scrollTop, scrollHeight, clientHeight } = currentTarget;
    console.log("end");
    currentTarget.style.transitionDuration = `${transtionDuration}ms`;
    if (scrollTop === 0) {
      currentTarget.style.paddingTop = `0px`;
    } else if (scrollTop + clientHeight >= scrollHeight) {
      currentTarget.style.paddingBottom = "0px";
    }
    setTimeout(() => {
      currentTarget.style.transitionDuration = "0ms";
      setIsTouching(false);
    }, transtionDuration);
  };

  return (
    <div className={className}>
      <div
        className="scroll"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="a"></div>
        <div className="a"></div>
        <div className="a"></div>
      </div>
      <button type="button" onClick={onClick}>
        modal
      </button>
      <Modal ref={ref} type="Confirm" covered />
    </div>
  );
};

export default Main;
