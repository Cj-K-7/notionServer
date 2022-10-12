import { Handler } from "express";
import { getDatabase } from "../notionAPI";

const getDBbyID: Handler = async (request, response) => {
  const id = request.query.id as string;
  try {
    const database = await getDatabase(id);
    return response.send(database);
  } catch (error: any) {
    return response.status(error.status || 500).json(JSON.parse(error.body));
  }
};
const databaseHandlers = { get: getDBbyID };

export default databaseHandlers;
