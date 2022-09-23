import { Handler } from "express";
import { getUserList } from "../notionAPI";

const getUsers: Handler = async (request, response) => {
  const userList = await getUserList();
  return response.send(userList.results);
};

const userHandlers = { get: getUsers };

export default userHandlers;
