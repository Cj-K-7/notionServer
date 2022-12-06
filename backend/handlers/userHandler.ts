import { Handler } from "express";
import { getUserList } from "../notionAPI";

const getUsers: Handler = async (request, response) => {
  try {
    const query = request.query;
    const userList = await getUserList();
    console.log(query);
    return response.send(userList.results);
  } catch (error: any) {
    return response.status(error.status).json(JSON.parse(error.body));
  }
};

const userHandlers = { get: getUsers };

export default userHandlers;
