import Router from "./Router/Router";
import MediaPlayer from "./Class/Video";

export const player = new MediaPlayer();

console.log("Downloading video...hellip;Please wait...");
var xhr = new XMLHttpRequest();
xhr.open("GET", "60fps.mp4", true);
xhr.responseType = "blob";
xhr.onload = function (e) {
  if (this.status === 200) {
    console.log("got it");
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
    console.log("Loading video into element");
    player.setSrc(vid);
    // not needed if autoplay is set for the video element
    // video.play()
  }
};

xhr.send();
function App() {
  return <Router />;
}

export default App;
