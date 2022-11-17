const player = document.getElementById("player") as HTMLVideoElement;

const { style, paused } = player;

// video#player{
//   width: 100vw;
//   height: 100vh;
//   object-fit: contain;
//   background-color: black;
//   transition: opacity 369;
// }

let timer: NodeJS.Timeout;
let timeout = 3000;

const init = () => {
  player.currentTime = 0;
  style.visibility = "hidden";
  style.opacity = "0";
};

const on = async () => {
  return new Promise<void>((resolve, reject) => {
    try {
      style.visibility = "visible";
      style.opacity = "1";
    } catch (error) {
      throw new Error("video activate failed" + error);
    }
    style.visibility === "visible" ? resolve() : reject();
  });
};

const off = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      style.opacity = "0";
      setTimeout(() => (style.visibility = "hidden"), 369);
    } catch (error) {
      throw new Error("video deactivate failed" + error);
    }
    style.visibility === "hidden" ? resolve() : reject();
  });
};

const play = async () => {
  player.currentTime = 0;
  return await player.play().catch((error) => {
    throw new Error("play failed" + error);
  });
};

const pause = async () => {
  try {
    player.pause();
  } catch (error) {
    throw new Error("video deactivate failed" + error);
  }
  return;
};

const timerCallback = async () => {
  await play();
  await on();
};

timer = setTimeout(timerCallback, timeout);
const timerReseter = () => {
  console.log(timer);
  clearTimeout(timer);
  timer = setTimeout(timerCallback, timeout);
};

player.onplay = async () => {};
player.onpause = async () => {
  await off();
};
player.onclick = async () => {
  try {
    if (paused) return;
    await pause();
    console.log("click player");
    timerReseter();
    console.log(timer);
  } catch (error) {
    console.error(error);
  }
};

window.onclick = () => {
  console.log("click window");
  timerReseter();
  console.log(timer);
};
window.onkeydown = () => {
  timerReseter();
};

init();

const playerController = { on, off, playVideo: play, pause };

export default playerController;
