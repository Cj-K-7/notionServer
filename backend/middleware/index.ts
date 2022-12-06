import { Handler } from "express";

const defaultMiddleWare: Handler = (request, response, next) => {
  const sample = request.body;
  next();
};
