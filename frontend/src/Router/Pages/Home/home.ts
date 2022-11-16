import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Set HOME-'idle' base behavior base on @Idle-Time
 * @param idleTime auto-navigate to "/canvas"
 */
export const useHomeIdle = (idleTime: number) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const timeOutCallback = () => {
      navigate("/canvas");
    };

    const timeReseter = () => {
      clearTimeout(timer);
      if (idleTime > 0) {
        timer = setTimeout(timeOutCallback, idleTime * 1000);
      }
    };

    //Init timer on window loaded
    window.onload = timeReseter;

    //Reset timer on user's interactions by EventListener
    document.addEventListener("click", timeReseter);
    document.addEventListener("mousemove", timeReseter);
    document.addEventListener("touchstart", timeReseter);
    document.addEventListener("touchend", timeReseter);
    document.addEventListener("keydown", timeReseter);

    return () => {
      //Get rid of every EventListener added by this componenet
      document.removeEventListener("click", timeReseter);
      document.removeEventListener("mousemove", timeReseter);
      document.removeEventListener("touchstart", timeReseter);
      document.removeEventListener("touchend", timeReseter);
      document.removeEventListener("keydown", timeReseter);
    };
  }, []);
};
