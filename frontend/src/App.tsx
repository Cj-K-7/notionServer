import { useEffect } from "react";
import Request from "./APIs/base";
import Router from "./Router/Router";

function App() {
  useEffect(() => {
    const req = new Request();
    const a = req.get("/users");
    setTimeout(() => {
      const b = req.get("/listAll");
      console.log(b);
    }, 2000);
    console.log(a);
  }, []);
  return <Router />;
}

export default App;
