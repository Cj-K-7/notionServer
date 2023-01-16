import MediaPlayer from "./Class/Video";
import Router from "./Router/Router";

const player = new MediaPlayer("video/60fps.mp4");

function App() {
  return <Router />;
}

export default App;
