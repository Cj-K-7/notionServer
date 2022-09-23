import { Handler } from "express";
import { getDatabase } from "../notionAPI";

const getDBbyID: Handler = async (request, response) => {
  const id = request.query.id as string;
  const calendarDB = getDatabase(id);
  console.log(calendarDB);
  return response.send(calendarDB);
};

const databaseHandlers = { get: getDBbyID };

export default databaseHandlers;
