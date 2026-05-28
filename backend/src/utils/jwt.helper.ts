import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "../config/config.js";

const JWT_ACCESS_TOKEN = JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN = JWT_REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY =
  JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY =
  JWT_REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_ACCESS_TOKEN, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_TOKEN, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_TOKEN);
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_TOKEN);
};
