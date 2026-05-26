import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 5000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET || "your_jwt_secret_key";
export const JWT_ACCESS_TOKEN_EXPIRES_IN =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "1d";
export const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || "your_jwt_refresh_secret_key";
export const JWT_REFRESH_TOKEN_EXPIRES_IN =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
