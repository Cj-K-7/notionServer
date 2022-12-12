import { Request, Response } from "express";
import notionAPI from "../notionAPI";

interface RequestUserParams {}
interface ResponseUserBody {}
interface RequestUserBody {}
interface RequestUserQuery {
  user_id: string;
}
interface RequestUser
  extends Request<
    RequestUserParams,
    ResponseUserBody,
    RequestUserBody,
    RequestUserQuery
  > {}
interface ResponseUser extends Response<ResponseUserBody> {}

const getUser = async (request: RequestUser, response: ResponseUser) => {
  try {
    const query = request.query;
    const { user_id } = query;
    console.log(query);

    const args = { user_id };
    const userList = await notionAPI.users.retrieve(args);
    return response.type("application/json").send(userList);
  } catch (error: any) {
    return response.status(error.status).json(JSON.parse(error.body));
  }
};

const getUsers = async (request: Request, response: Response) => {
  try {
    const userList = await notionAPI.users.list({});
    return response.send(userList);
  } catch (error: any) {
    return response.status(error.status).json(JSON.parse(error.body));
  }
};

const userHandlers = { getUser, getUsers };

export default userHandlers;
