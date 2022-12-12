import express, { Handler } from "express";
import userHandlers from "../handlers/userHandler";
import databaseHandlers from "../handlers/databaseHandler";
import pageHandler from "../handlers/pageHandler";
import { searchDatabases } from "../notionAPI";

const router = express.Router();

//List All
const listAllHandler: Handler = async (request, response) => {
  const allDatabases = await searchDatabases();
  return response.send(allDatabases);
};

router.route("/listAll").get(listAllHandler);

//@User
router.route("/user").get(userHandlers.getUser);
router.route("/users").get(userHandlers.getUsers);

//@Database
router.route("/database").get(databaseHandlers.get);

//@Page
router.route("/page").get(pageHandler.get);

export default router;
