import express, { Handler } from "express";
import userHandlers from "../handlers/userHandler";
import databaseHandlers from "../handlers/databaseHandler";
import pageHandler from "../handlers/pageHandler";
import { searchDatabases } from "../notionAPI";
const router = express.Router();

//List All
const listAllHandler: Handler = async (request, response) => {
  const databases = await searchDatabases();
  return response.send(databases);
};
router.route("/listAll").get(listAllHandler);

//@User
router.route("/users").get(userHandlers.get);

//@Database
router.route("/database").get(databaseHandlers.get);

//@Page
router.route("/page").get(pageHandler.get);

export default router;
