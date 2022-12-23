import Request from "./Request";

const request = new Request();

export const getUsers = async <T>() => {
  const response = await request.get<T>("/database");
  return response;
};

export const queryDB = async <T>(data: FormData) => {
  const response = await request.post<T>("/database", data);
  console.log(response);
  return response;
};
