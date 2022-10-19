import { Handler } from "express";

const basicMW: Handler = (request, response, next) => {
  const sample = request.body;
  next();
};
