import express from "express";
import Router from "./routes";
import cors from "cors";

const app = express();

const port = 5000;

const front = express.static(__dirname + "/../frontend/public");
//Statics
app.use(front);
app.use(cors());

//Routers
app.use("/api", Router);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/../frontend/public/index.html");
});

app.listen(port, () => {
  console.log(`The SERVER's Linstening On PORT : http://localhost:${port}`);
});
