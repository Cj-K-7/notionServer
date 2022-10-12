import express from "express";
import userHandlers from "../handlers/userHandler";
import databaseHandlers from "../handlers/databaseHandler";
import pageHandler from "../handlers/pageHandler";
const router = express.Router();

router.route("/users").get(userHandlers.get);

router.route("/database").get(databaseHandlers.get);

router.route("/page").get(pageHandler.get);

export default router;
