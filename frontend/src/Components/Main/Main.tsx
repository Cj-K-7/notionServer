import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../Base/Modal";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

const bounceLimit = 200 as const;
const transtionDuration = 276 as const;

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);
  const ref = useRef<HTMLDialogElement>(null);
  const [startTouchY, setStartTouchY] = useState(0);
  const [endTouchY, setEndTouchY] = useState(0);

  const overScrollY = useMemo(() => {
    const distance = Math.abs(endTouchY - startTouchY);
    switch (true) {
      case distance > bounceLimit:
        return bounceLimit;
      default:
        return distance;
    }
  }, [endTouchY]);

  const onClick = () => {
    ref.current?.showModal();
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const { touches } = event;
    const touch = touches[0];
    setEndTouchY(touch.screenY);
    setStartTouchY(touch.screenY);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const { currentTarget, touches } = event;
    const { scrollTop, scrollHeight, clientHeight } = currentTarget;
    const touch = touches[0];
    switch (true) {
      case scrollTop === 0: {
        setEndTouchY(touch.screenY);
        currentTarget.style.paddingTop = `${overScrollY}px`;
        break;
      }
      case scrollTop >= scrollHeight - clientHeight - 1: {
        setEndTouchY(touch.screenY);
        currentTarget.style.paddingBottom = `${overScrollY}px`;
        break;
      }
    }
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    currentTarget.style.transitionDuration = `${transtionDuration}ms`;
    currentTarget.style.paddingTop = `0px`;
    currentTarget.style.paddingBottom = "0px";
    setTimeout(() => {
      currentTarget.style.transitionDuration = "0ms";
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
