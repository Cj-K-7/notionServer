import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/listAll");
  }, []);
  return <div></div>;
}

export default App;
