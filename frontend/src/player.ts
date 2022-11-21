const player = document.getElementById("player") as HTMLVideoElement;

// video#player{
//   width: 100vw;
//   height: 100vh;
//   object-fit: contain;
//   background-color: black;
//   transition: opacity 369;
// }

const init = () => {
  player.currentTime = 0;
  player.style.visibility = "hidden";
  player.style.opacity = "0";
};

const on = async () => {
  return new Promise<void>((resolve, reject) => {
    try {
      player.style.visibility = "visible";
      player.style.opacity = "1";
    } catch (error) {
      throw new Error("video activate failed" + error);
    }
    player.style.visibility === "visible" ? resolve() : reject();
  });
};

const off = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      player.style.opacity = "0";
      setTimeout(() => (player.style.visibility = "hidden"), 369);
    } catch (error) {
      throw new Error("video deactivate failed" + error);
    }
    player.style.visibility === "hidden" ? resolve() : reject();
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

const playerController = { init, on, off, play, pause };

export default playerController;
