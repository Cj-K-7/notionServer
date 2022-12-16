import Router from "./Router/Router";
import MediaPlayer from "./Class/Video";

export const player = new MediaPlayer();
player.setSrc("60fps.mp4");

function App() {
  return <Router />;
}

export default App;
