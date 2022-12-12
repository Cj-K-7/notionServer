//legacy for bouncing Scroll React

const transtionDuration = 333;

const onTouchStart = (
  event: React.TouchEvent<HTMLDivElement>,
  setStartTouchY: React.Dispatch<number>,
  setEndTouchY: React.Dispatch<number>
) => {
  const { touches } = event;
  const touch = touches[0];
  setStartTouchY(touch.screenY);
  setEndTouchY(touch.screenY);
};

const onTouchMove = (
  event: React.TouchEvent<HTMLDivElement>,
  setEndTouchY: React.Dispatch<number>,
  distanceY: number
) => {
  const { currentTarget, touches } = event;
  const { scrollTop, scrollHeight, clientHeight } = currentTarget;
  const touch = touches[0];
  switch (true) {
    case scrollTop === 0: {
      setEndTouchY(touch.screenY);
      currentTarget.style.paddingTop = `${distanceY}px`;
      break;
    }
    case scrollTop >= scrollHeight - clientHeight - 1: {
      setEndTouchY(touch.screenY);
      currentTarget.style.paddingBottom = `${distanceY}px`;
      break;
    }
  }
};

const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
  const { currentTarget } = event;
  currentTarget.style.transitionDuration = `${transtionDuration}ms`;
  currentTarget.style.paddingTop = `0px`;
  currentTarget.style.paddingBottom = "0px";
  setTimeout(() => {
    currentTarget.style.transitionDuration = "0ms";
  }, transtionDuration);
};

const ScrollHandler = { onTouchStart, onTouchMove, onTouchEnd };

export default ScrollHandler;
