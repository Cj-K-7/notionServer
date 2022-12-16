import { player } from "../../App";
import Queue from "../../Class/Queue";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

const queue = new Queue([1, 2, 3]);
let i = 4;

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  const className = classCombine("main", props.className);

  const start = async () => {
    await player.setSchedule([
      40000,
      41000,
      { start: 42500, end: 43000 },
      45000,
      { start: 46000, end: 46500 },
      47000,
    ]);
    await player.play();
  };
  const end = async () => {
    player.end();
  };

  const toggleDequeue = async () => {
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
      {/* <button type="button" onClick={toggleDequeue}>
        {queue.isAutoDequeueing ? "on Auto" : "off Auto"}
      </button>
      <button type="button" onClick={enqueue}>
        Enqueue
      </button> */}
      <button type="button" onClick={start}>
        start
      </button>
      <button type="button" onClick={end}>
        end
      </button>
    </div>
  );
};

export default Main;
