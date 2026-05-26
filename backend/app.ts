import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./src/config/config.js";
import {
  authRateLimiter,
  globalRateLimiter,
} from "./src/middlewares/rateLimiter.middleware.js";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import authRouter from "./src/modules/auth/auth.route.js";
import postRouter from "./src/modules/post/post.route.js";
import commentRouter from "./src/modules/comment/comment.route.js";
import { logger } from "./src/lib/logger.js";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  morgan("combined", {
    // "dev" ki jagah "combined"
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.get("/health-check", (req: express.Request, res: express.Response) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.use("/api/v1/comments", commentRouter);
app.use(globalErrorHandler);
app.use(globalRateLimiter);
