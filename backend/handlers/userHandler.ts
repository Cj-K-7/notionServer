import { Handler } from "express";
import { getUserList } from "../notionAPI";

const getUsers: Handler = async (request, response) => {
  try {
    const userList = await getUserList();
    return response.send(userList.results);
  } catch (error: any) {
    return response.status(error.status).json(JSON.parse(error.body));
  }
};

const userHandlers = { get: getUsers };

export default userHandlers;
