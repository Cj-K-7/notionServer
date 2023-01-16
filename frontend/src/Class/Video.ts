type PlayEvent = { start: number; end: number };
type PlayerSchdule = [number, ...(number | PlayEvent)[], number];
type VideoMetadata = {
  file?: File;
  bitRate?: number;
};
const hidden = "hidden" as const;
const visible = "visible" as const;
const fadeIn = "1" as const;
const fadeOut = "0" as const;
const transitionTime = 369 as const;
const initialSchedule: PlayerSchdule = [0, 0];

class MediaPlayer {
  public video: HTMLVideoElement;
  public metadata: VideoMetadata = {};
  /** Is video-player visible*/
  private isActive: boolean = false;
  /** Is video-player in playing sequence*/
  private isPlaying: boolean = false;
  /** Is video-player in pause sequence*/
  private isPause: boolean = false;
  /** Is video-player in loop sequence*/
  private isLoop: boolean = false;
  /** Toggle for escaping loop sequence*/
  private toogleEscapeLoop: boolean = false;
  /** Video schedule */
  private schedule: PlayerSchdule = initialSchedule;

  constructor(url?: string) {
    const video = document.createElement("video");
    document.body.appendChild(video);
    //Default settings
    this.video = video;
    this.video.controls = true;
    this.video.id = "media_player";
    if (url) {
      const ext = url.split(".").pop(); // url
      const filename = url.split("/").pop(); // url
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const bitRate = this.metadata.file!.size / video.duration / 128;
        this.metadata.bitRate = bitRate;
        console.log(this.metadata);
      };
      this.video.src = url;
      fetch(url)
        .then((response) => response.blob())
        .then((data) => {
          const type = `video/${ext}`;
          const file = new File([data], filename!, {
            type,
          });
          this.metadata.file = file;
          fileReader.readAsDataURL(file);
        });
    }

    //Listener
    this.video.onplay = async () => {
      this.isPlaying = true;
    };
    this.video.onclick = () => {
      if (this.isLoop) this.stopLoop();
      if (this.isPause) {
        this.video.play();
        this.isPause = false;
      }
    };
    this.video.onpause = () => {
      this.isPlaying = false;
      console.log("video puased");
    };
    this.video.onended = () => {
      this.deactivateVideo();
    };
    this.video.onerror = (event, source, lineno, colno, error) => {
      console.error(event, source, lineno, colno, error);
    };
  }

  private activateVideo() {
    this.isActive = true;
    // this.video.style.visibility = visible;
    // this.video.style.opacity = fadeIn;
  }

  private deactivateVideo() {
    this.isPlaying = false;
    // this.video.style.opacity = fadeOut;
    // setTimeout(() => (this.video.style.visibility = hidden), transitionTime);
  }

  /**Set video source */
  public setSrc(src: string) {
    this.video.src = src;
    return this.video.src;
  }

  /**Set video schedule
   *
   * `schdule`'s first element is start point
   *
   * `schdule`'s last element is end point
   *
   * @param schedule
   * @unit millisecond
   */
  public async setSchedule(schedule: PlayerSchdule) {
    return new Promise<void>((resolve) => {
      const startTime = schedule[0] / 1000;
      this.video.currentTime = startTime;
      this.schedule = schedule;
      // setTimeout(resolve, 600);
      resolve();
    });
  }

  /**Play Video*/
  public async play() {
    try {
      this.activateVideo();
      await this.video.play();
      if (this.schedule.length <= 2) return;
      await this.startSchedule();
    } catch (error) {
      console.error(error);
    }
  }

  /**Pause Video */
  public pause() {
    this.isLoop = false;
    this.video.pause();
  }

  /**Pause on `time`
   * @param time millisecond
   */
  private pauseOnTime(time: number) {
    return new Promise<void>((resolve) => {
      const callback = () => {
        const isFulfilled =
          this.video.currentTime * 1000 >= time || !this.isPlaying;
        if (isFulfilled) {
          this.video.pause();
          this.isPause = true;
          return resolve();
        }
        window.requestAnimationFrame(callback);
      };
      window.requestAnimationFrame(callback);
    });
  }

  /**End Video & Init current time to 0 */
  public end() {
    this.pause();
    this.deactivateVideo();
  }

  public endOnTime(time: number) {
    return new Promise<void>((resolve) => {
      const callback = () => {
        const isFulfilled =
          this.video.currentTime * 1000 >= time || !this.isPlaying;
        if (isFulfilled) {
          this.video.currentTime = 0;
          this.end();
          return resolve();
        }
        window.requestAnimationFrame(callback);
      };
      window.requestAnimationFrame(callback);
    });
  }

  /**Loop video time from `start` to `end`
   * @param start comeback point
   * @param end trigger comeback point
   */
  private loop(start: number, end: number) {
    return new Promise<void>((resolve) => {
      const callback = () => {
        const isFulfilled = this.toogleEscapeLoop || !this.isPlaying;
        if (isFulfilled) {
          this.isLoop = false;
          this.toogleEscapeLoop = false;
          return resolve();
        }
        if (this.video.currentTime * 1000 >= end) {
          this.video.currentTime = start / 1000;
          if (!this.isLoop) {
            this.isLoop = true;
          }
        }
        console.log("loop frame");
        window.requestAnimationFrame(callback);
      };
      window.requestAnimationFrame(callback);
    });
  }

  /**Stop video loop */
  private stopLoop() {
    this.toogleEscapeLoop = true;
  }

  private async startEvent(event: number | PlayEvent) {
    if (typeof event === "number") {
      console.log("next event", JSON.parse(`{"puase" : ${event}}`));
      await this.pauseOnTime(event);
    } else {
      const { start, end } = event;
      console.log("next event", event);
      await this.loop(start, end);
    }
  }

  /**Start schedule */
  private async startSchedule() {
    const events = this.schedule;
    for (let i = 1, promise = Promise.resolve(); i < events.length; i++) {
      if (!this.isPlaying) break;
      i === events.length - 1
        ? (promise = promise.then(() => this.endOnTime(events[i] as number)))
        : (promise = promise.then(() => this.startEvent(events[i])));
    }
  }
}

export default MediaPlayer;
