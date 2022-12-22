import Router from "./Router/Router";
import MediaPlayer from "./Class/Video";

export const player = new MediaPlayer();

// const xhr = new XMLHttpRequest();
// xhr.open("GET", "60fps.mp4");
// xhr.responseType = "blob";
// xhr.onload = (event) => {
//   const result = event.currentTarget as XMLHttpRequest;
//   const url = URL.createObjectURL(result.response);
//   player.setSrc(url);
// };
// xhr.send();
timeTest(() => player.setSrc("video/60fps.mp4"));

function App() {
  return <Router />;
}

export default App;
