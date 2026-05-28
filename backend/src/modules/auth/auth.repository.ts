import { OTP, RefreshToken, User } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";
export class AuthRepository implements IAuthRepository {
  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return createdUser;
  }
  async createOTP(userId: string, otp: string, expiresAt: Date): Promise<OTP> {
    const otpRecord = await prisma.oTP.create({
      data: {
        userId,
        otp,
        expiresAt,
      },
    });
    return otpRecord;
  }

  async findOTPByUserId(userId: string): Promise<OTP | null> {
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId,
      },
    });
    return otpRecord;
  }

  async deleteOTPByUserId(userId: string): Promise<void> {
    await prisma.oTP.deleteMany({
      where: {
        userId,
      },
    });
  }

  async createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<RefreshToken> {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });

    return refreshToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });

    return refreshToken;
  }

  async findRefreshTokenByUserId(userId: string): Promise<RefreshToken[]> {
    const refreshToken = await prisma.refreshToken.findMany({
      where: {
        userId,
      },
    });

    return refreshToken;
  }
  async getActivityByUserId(userId: string) {
    return await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20, // last 20 activities
    });
  }

  async deleteRefreshTokenById(id: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }

  async deleteRefreshTokenByToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        token,
      },
    });
  }

  async deleteAllRefreshTokenByUser(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
  async deleteExpiredTokensByUser(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
        expiresAt: { lt: new Date() },
      },
    });
  }
}
