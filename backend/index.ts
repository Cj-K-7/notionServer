import express from "express";
import Router from "./routes";

const app = express();

const port = 5000;

const front = express.static(__dirname + "/../frontend");
//Statics
app.use(front);

//Routers
app.use("/api", Router);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/../frontend/index.html");
});

app.listen(port, () => {
  console.log(`The SERVER's Linstening On PORT : http://localhost:${port}`);
});
