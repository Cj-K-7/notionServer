import express from "express";
import cors from "cors";
import Router from "./routes";
import errorRequsetHandler from "./handlers/errorHandler";
import { logger, defaultMiddleWare } from "./middleware";

const app = express();
const port = process.env.PORT || 5000;
const front = express.static(__dirname + "/../frontend/build");

//Statics
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(defaultMiddleWare);
app.use(errorRequsetHandler);
app.use(front);

//Routers
app.use("/api", Router);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/../frontend/build/index.html");
});

app.listen(port, () => {
  console.log(`The SERVER's Linstening On PORT : http://localhost:${port}`);
});

//Default Error Handling
