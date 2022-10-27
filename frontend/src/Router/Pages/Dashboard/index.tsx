import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //Hooks
  const navigate = useNavigate();

  //functions

  //Set onMount 'idle' base behaviors
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const timeOutCallback = () => {
      navigate("/canvas");
    };
    const timeReseter = () => {
      console.log("hello");
      clearTimeout(timer);
      timer = setTimeout(timeOutCallback, 7000);
    };
    //Init timer on window loaded
    window.onload = timeReseter;

    //Reset Every interactions by EventListener
    document.addEventListener("click", timeReseter);
    document.addEventListener("mousemove", timeReseter);
    document.addEventListener("touchstart", timeReseter);
    document.addEventListener("touchend", timeReseter);
    document.addEventListener("keydown", timeReseter);

    return () => {
      document.removeEventListener("click", timeReseter);
      document.removeEventListener("mousemove", timeReseter);
      document.removeEventListener("touchstart", timeReseter);
      document.removeEventListener("touchend", timeReseter);
      document.removeEventListener("keydown", timeReseter);
    };
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
