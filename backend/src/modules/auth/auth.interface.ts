import {
  ActivityLog,
  RefreshToken,
  User,
} from "../../../generated/prisma/client.js";
import { OTP } from "../../../generated/prisma/index.js";
export interface IAuthRepository {
  findUserById(id: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createOTP(userId: string, otp: string, expiresAt: Date): Promise<OTP>;
  findOTPByUserId(userId: string): Promise<OTP | null>;
  deleteOTPByUserId(userId: string): Promise<void>;
  createUser(username: string, email: string, password: string): Promise<User>;

  createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
    deviceInfo?: string; // ← add karo
    ipAddress?: string; // ← add karo
  }): Promise<RefreshToken>;

  findRefreshToken(token: string): Promise<RefreshToken | null>;
  findRefreshTokenByUserId(userId: string): Promise<RefreshToken[]>;
  getActivityByUserId(userId: string): Promise<ActivityLog[]>;
  deleteRefreshTokenById(id: string): Promise<void>;
  deleteRefreshTokenByToken(token: string): Promise<void>;
  deleteAllRefreshTokenByUser(userId: string): Promise<void>;
  deleteExpiredTokensByUser(userId: string): Promise<void>;
}
