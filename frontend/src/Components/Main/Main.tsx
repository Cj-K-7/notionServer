import React, { useEffect, useState } from "react";
import Queue from "../../Class/Queue";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

const queue = new Queue([1, 2, 3]);
let i = 4;

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);

  const toggleDequeue = () => {
    queue.isAutoDequeueing
      ? queue.deactivateAutoDequeque()
      : queue.activateAutoDequeque();
  };

  const enqueue = () => {
    queue.enqueue(i);
    i++;
  };

  return (
    <div className={className}>
      <button type="button" onClick={toggleDequeue}>
        {queue.isAutoDequeueing ? "on Auto" : "off Auto"}
      </button>
      <button type="button" onClick={enqueue}>
        Enqueue
      </button>
    </div>
  );
};

export default Main;
