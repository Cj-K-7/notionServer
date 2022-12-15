import Router from "./Router/Router";
import MediaPlayer from "./Class/Video";

export const player = new MediaPlayer();
player.setSrc("60fps.mp4");
player.setSchedule([
  0,
  1000,
  { start: 1400, end: 1600 },
  { start: 1800, end: 2000 },
  2400,
  3000,
]);

function App() {
  return <Router />;
}

export default App;
