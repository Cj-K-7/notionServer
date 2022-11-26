import { useEffect } from "react";
import Router from "./Router/Router";

function App() {
  useEffect(() => {
    console.log("App start!");
    // fetch("http://localhost:5000/api/listAll");
  }, []);
  return <Router />;
}

export default App;
