class Queue<T> {
  public value: T[] = [];
  public isAutoDequeueing: boolean = false;
  private isDequeueing: boolean = false;
  private defaultDequeueingInterval: number = 1000;
  constructor(initialValue?: T[]) {
    if (initialValue) this.value = initialValue;
  }

  //public function
  public enqueue(queue: T) {
    this.value.push(queue);
    // if (this.isAutoDequeueing && !this.isDequeueing) this.autoDequeue();
  }
  public dequeue() {
    const out = this.value.shift();
    return out;
  }
  public activateAutoDequeque(interval?: number) {
    if (interval) this.defaultDequeueingInterval = interval;
    this.isAutoDequeueing = true;
  }
  public deactivateAutoDequeque() {
    this.isAutoDequeueing = false;
  }

  //private function
  private autoDequeue() {
    const callback = (): void => {
      if (this.value.length > 0) {
        this.isDequeueing = true;
        const shift = this.value.shift();
        console.log(`%cdequeue ${shift}`, "color: #bada55");
        setTimeout(() => {
          callback();
        }, this.defaultDequeueingInterval);
      } else {
        this.isDequeueing = false;
        return;
      }
    };
    callback();
  }
}

export default Queue;
