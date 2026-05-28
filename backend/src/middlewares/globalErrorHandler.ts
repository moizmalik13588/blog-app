import e, { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/config.js";
import { logger } from "../lib/logger.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
  });
  let error = { ...err };
  error.message = err.message;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};
