import React, { useEffect } from "react";
import Canvas from "./Components/Canvas/Canvas";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/listAll");
  }, []);
  return <Canvas />;
}

export default App;
