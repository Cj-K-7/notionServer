import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "../../../Components/Canvas/Canvas";

const CanvasPage = () => {
  //Hooks
  const navigate = useNavigate();
  useEffect(() => {
    const wakeUp = () => navigate("/");

    //Wake up App on user's interactions by EventListener
    document.addEventListener("click", wakeUp);
    document.addEventListener("touchstart", wakeUp);
    document.addEventListener("keydown", wakeUp);

    return () => {
      //Get rid of every EventListener added by this componenet
      document.removeEventListener("click", wakeUp);
      document.removeEventListener("touchstart", wakeUp);
      document.removeEventListener("keydown", wakeUp);
    };
  }, []);
  return <Canvas />;
};

export default CanvasPage;
