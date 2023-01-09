import { Handler } from "express";
import notionAPI, { getDatabase } from "../notionAPI";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const getVacationPage = (properties: { [key: string]: string }) => {};

const getDBbyID: Handler = async (request, response) => {
  const query = request.query;
  try {
    if (typeof query.id !== "string")
      return response
        .status(400)
        .json({ message: "requires database_id for query" });

    const database = await getDatabase(query.id);
    return response.send(database);
  } catch (error: any) {
    return response.status(error.status || 500).json(JSON.parse(error.body));
  }
};

interface QueryDB {
  filter: {
    [key: string]: string;
  };
}

const databaseHandlers = { get: getDBbyID };

export default databaseHandlers;
