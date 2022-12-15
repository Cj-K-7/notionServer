type PlayEvent = { start: number; end: number };
type PlayerSchdule = [number, ...(number | PlayEvent)[], number];

const hidden = "hidden" as const;
const visible = "visible" as const;
const fadeIn = "1" as const;
const fadeOut = "0" as const;
const transitionTime = 369 as const;
const initialSchedule: PlayerSchdule = [0, 0];

class MediaPlayer {
  /** Video element*/
  private video: HTMLVideoElement;
  /** Is video in play sequence*/
  private isPlaying: boolean = false;
  /** Is video in pause sequence*/
  private isPause: boolean = false;
  /** Is video in loop sequence*/
  private isLoop: boolean = false;
  /** Video schedule */
  private schedule: PlayerSchdule = initialSchedule;
  /** Loop frame */
  private loopFrame: number = 0;

  constructor(src?: string) {
    const video = document.createElement("video");
    document.body.appendChild(video);
    //Default settings
    this.video = video;
    this.video.id = "media_player";
    if (src) {
      this.video.src = src;
    }

    //Listener
    this.video.onplay = async () => {};
    this.video.onclick = () => {
      if (this.isLoop) this.stopLoop();
      if (this.video.paused) this.video.play();
    };
    this.video.onpause = () => {
      console.log("video puased");
    };
    this.video.onended = () => {
      this.deactivateVideo();
    };
    this.video.onerror = (event, source, lineno, colno, error) => {
      console.error(error);
    };
  }

  private activateVideo() {
    this.isPlaying = true;
    this.video.style.visibility = visible;
    this.video.style.opacity = fadeIn;
  }

  private deactivateVideo() {
    this.isPlaying = false;
    this.video.style.opacity = fadeOut;
    setTimeout(() => {
      this.video.style.visibility = hidden;
      this.setSchedule(initialSchedule);
    }, transitionTime);
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
  public setSchedule(schedule: PlayerSchdule) {
    this.video.currentTime = schedule[0];
    this.schedule = schedule;
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
        if (this.video.currentTime * 1000 >= time) {
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
        if (this.video.currentTime * 1000 >= time) {
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
    const callback = () => {
      if (!this.isPlaying) return this.stopLoop();
      if (this.video.currentTime * 1000 >= end) {
        this.video.currentTime = start / 1000;
        if (!this.isLoop) {
          this.isLoop = true;
          console.log("on loop");
        }
      }
      console.log("frame");
      this.loopFrame = window.requestAnimationFrame(callback);
    };
    this.loopFrame = window.requestAnimationFrame(callback);
  }

  /**Stop video loop */
  private stopLoop() {
    window.cancelAnimationFrame(this.loopFrame);
    this.isLoop = false;
    console.log("off loop");
  }

  private startEvent(event: number | PlayEvent) {
    if (typeof event === "number") {
      this.pauseOnTime(event);
    } else {
      const { start, end } = event;
      this.loop(start, end);
    }
  }

  /**Start schedule */
  private async startSchedule() {
    const [_, ...events] = this.schedule;
    for (let i = 0, promise = Promise.resolve(); i < events.length; i++) {
      i === events.length - 1
        ? (promise = promise.then(() => this.endOnTime(events[i] as number)))
        : (promise = promise.then(() => this.startEvent(events[i])));
      console.log(i, events[i]);
    }
  }
}

export default MediaPlayer;
