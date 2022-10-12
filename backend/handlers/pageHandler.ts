import { Handler } from "express";
import { getPage } from "../notionAPI";

const getPagebyID: Handler = async (request, response) => {
  const id = request.query.id as string;
  const page = getPage(id);
  console.log(page);
  return response.send(page);
};

const pageHandler = { get: getPagebyID };

export default pageHandler;
