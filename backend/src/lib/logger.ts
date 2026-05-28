import winston from "winston";
import { NODE_ENV } from "../config/config.js";

export const logger = winston.createLogger({
  level: NODE_ENV === "production" ? "error" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    // Console mein dikhao
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    // Error file mein save karo
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    // Sab logs file mein save karo
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});
