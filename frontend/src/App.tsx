import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/database?id=asd");
  }, []);
  return <div></div>;
}

export default App;
