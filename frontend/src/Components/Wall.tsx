import { useState } from "react";
import useInterval from "./useInterval";
import "./wall.css";

const Wall = () => {
  const [queue, setQueue] = useState([9, 8, 7, 6]);

  const queueing = () => {
    setQueue((state) => [
      state[state.length - 1],
      ...state.filter((_, ind) => ind !== state.length - 1),
    ]);
  };

  useInterval(() => {
    queueing();
    console.log(queue);
  }, 2000);

  return (
    <div className="grid">
      {/* <div className="first">
        <img src={`./asset/img/${queue[0]}.jpg`} />
      </div> */}
      <div className="second">
        <img src={`./asset/img/${queue[1]}.jpg`} />
        <img src={`./asset/img/${queue[2]}.jpg`} />
      </div>
      {/* <div className="third">
        <img src={`./asset/img/${queue[3]}.jpg`} />
        <img src={`./asset/img/${queue[4]}.jpg`} />
        <img src={`./asset/img/${queue[5]}.jpg`} />
      </div>
      <div className="fourth">
        <img src={`./asset/img/${queue[6]}.jpg`} />
        <img src={`./asset/img/${queue[7]}.jpg`} />
        <img src={`./asset/img/${queue[8]}.jpg`} />
        <img src={`./asset/img/${queue[9]}.jpg`} />
      </div> */}
    </div>
  );
};

export default Wall;
