import { NextFunction, Request, Response } from "express";
import { z, ZodObject } from "zod";
import { AppError } from "../utils/App.Error.js";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join(""),
        message: err.message,
      }));

      throw new AppError(
        errors.map((e) => `${e.field}: ${e.message}`).join(", "),
        400,
      );
    }

    req.body = result.data;

    next();
  };
