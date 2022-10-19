import { Handler } from "express";
import { getPage } from "../notionAPI";

const getPagebyID: Handler = async (request, response) => {
  const id = request.query.id;
  try {
    if (typeof id !== "string")
      return response
        .status(400)
        .json({ message: "requires page_id for query" });
    const page = await getPage(id);
    return response.send(page);
  } catch (error: any) {
    return response.status(error.status || 500).json(JSON.parse(error.body));
  }
};

const pageHandler = { get: getPagebyID };

export default pageHandler;
