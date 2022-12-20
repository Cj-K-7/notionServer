import Router from "./Router/Router";
import MediaPlayer from "./Class/Video";

export const player = new MediaPlayer();

const videoRequest = fetch("60fos.mp4").then((response) => response.blob());
videoRequest.then((blob) => {
  const request = indexedDB.open("playerDB", 1);

  request.onsuccess = (event: Event) => {
    const db = event.target as IDBOpenDBRequest;
    const result = db.result;
    console.log(result);
    const transaction = result.transaction("player");
    console.log(transaction);
    const objectStore = transaction.objectStore("player");
    console.log(objectStore);
    const test = objectStore.get("test");
    console.log(test);

    test.onerror = (event: any) => {
      console.log("error");
    };

    test.onsuccess = (event: any) => {
      const url = window.URL.createObjectURL(test.result.blob);
      console.log(url);
      player.setSrc(url);
    };
  };

  request.onupgradeneeded = (event) => {
    const db = event.target as IDBOpenDBRequest;
    const result = db.result;

    const objectStore = result.createObjectStore("player", {
      keyPath: "videoSource",
    });

    objectStore.transaction.oncomplete = (event) => {
      const videoObjectStore = result
        .transaction("player", "readwrite")
        .objectStore("player");
      videoObjectStore.add({ name: "test", blob: blob });
    };
  };
});

function App() {
  return <Router />;
}

export default App;
