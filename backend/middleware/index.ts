import { Handler } from "express";

export const logger: Handler = (request, response, next) => {
  const { protocol, hostname, originalUrl } = request;
  console.log(`${protocol}://${hostname}${originalUrl}`);
  next();
};
export const defaultMiddleWare: Handler = (request, response, next) => {
  const sample = request.body;
  next();
};
