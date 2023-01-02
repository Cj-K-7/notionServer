import { Handler } from "express";

export const logger: Handler = (request, response, next) => {
  const { originalUrl } = request;
  console.log(`${originalUrl}`);
  next();
};
export const defaultMiddleWare: Handler = (request, response, next) => {
  const sample = request.body;
  next();
};
