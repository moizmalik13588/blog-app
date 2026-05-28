import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts
  message: {
    status: "fail",
    message: "Too many attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100, // 100 requests
  message: {
    status: "fail",
    message: "Too many requests, please try again after 1 minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 attempts
  message: {
    status: "fail",
    message: "Too many OTP attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
