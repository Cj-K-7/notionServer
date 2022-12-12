import { ErrorRequestHandler } from "express";

const errorRequsetHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  response.status(error.status).json(JSON.parse(error.body));
};

export default errorRequsetHandler;
