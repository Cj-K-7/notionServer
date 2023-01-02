import { Handler } from "express";
import notionAPI, { getDatabase } from "../notionAPI";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const getVacationPage = (properties: { [key: string]: string }) => {};

const getDBbyID: Handler = async (request, response) => {
  const id = request.query.id;
  try {
    if (typeof id !== "string")
      return response
        .status(400)
        .json({ message: "requires database_id for query" });

    const database = await getDatabase(id);
    {
      const vacations = database.results.filter(
        (result: any) => result.properties["범주"]
      );
      console.log(vacations);
    }
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

const postQueryDB: Handler = async (request, response) => {
  try {
    const database_id = "7c44f37100c04f629a058a209560828a";
    const isFormdata = request.is("*/formdata");

    if (!isFormdata) throw new Error("need formdata");

    const formData = request.body;
    const queries: QueryDatabaseParameters = {
      database_id,
    };
    const database = await notionAPI.databases.query(queries);

    return response.send(database);
  } catch (error) {
    throw new Error("error");
  }
};

const databaseHandlers = { get: getDBbyID, post: postQueryDB };

export default databaseHandlers;
