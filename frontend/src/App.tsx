import { useEffect } from "react";
import Router from "./Router";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/listAll");
  }, []);
  return <Router />;
}

export default App;
