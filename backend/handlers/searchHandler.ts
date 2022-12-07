import { Handler } from "express";
import { searchDatabases } from "../notionAPI";

const searchAll: Handler = async (request, response) => {
  const allDatabases = await searchDatabases();
  return response.send(allDatabases);
};

const searchByParam: Handler = async (request, response) => {
  const params = request.params;
  const allDatabases = await searchDatabases();
  return response.send(allDatabases);
};

const searchVacationUser: Handler = async (request, response) => {
  const { vacation } = request.query;
  const isVacation = vacation === "true";
  const allDatabases = await searchDatabases("휴가");

  return response.send(allDatabases);
};

const searchHandler = { searchAll, searchVacationUser };

export default searchHandler;
