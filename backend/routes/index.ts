import express from "express";
import userHandlers from "../handlers/userHandler";
import databaseHandlers from "../handlers/dbHandler";
const router = express.Router();

router.route("/users").get(userHandlers.get);

router.route("/db").get(databaseHandlers.get);

export default router;
