import { IJwtPayload } from "../../types/index.js";
import { AppError } from "../../utils/App.Error.js";
import { generateOTP, hashOTP } from "../../utils/otp.helper.js";
import { sendOTPEmail } from "../../utils/email.helper.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { toUserResponse } from "./auth.mapper.js";
import {
  loginUserDTO,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.schema.js";
import { logActivity } from "../../utils/activityLog.helper.js";

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async registerUser(
    body: registerUserDTO,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const { username, email, password } = body;

    const existingUserByUsername = await this.repo.findUserByUsername(username);
    if (existingUserByUsername) throw new AppError("User already exists", 400);

    const existingUserByEmail = await this.repo.findUserByEmail(email);
    if (existingUserByEmail) throw new AppError("User already exists", 400);

    const hashedPassword = await hashPassword(password);
    const newUser = await this.repo.createUser(username, email, hashedPassword);

    // ✅ OTP generate karo
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedOTP = hashOTP(otp);

    await this.repo.createOTP(newUser.id, hashedOTP, expiresAt);

    // ✅ Email bhejo
    await sendOTPEmail(newUser.email, otp);

    await logActivity(newUser.id, "REGISTER_OTP_SENT", ipAddress, userAgent);

    // ✅ Tokens mat do abhi
    return {
      message: "OTP sent to your email",
      userId: newUser.id,
    };
  }

  async loginUser(body: loginUserDTO, ipAddress?: string, userAgent?: string) {
    const { email, password } = body;

    const user = await this.repo.findUserByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 404);

    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) throw new AppError("Invalid credentials", 401);

    // ✅ Purana OTP delete karo
    await this.repo.deleteOTPByUserId(user.id);

    // ✅ Naya OTP banao
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    const hashedOTP = hashOTP(otp);
    await this.repo.createOTP(user.id, hashedOTP, expiresAt); // ← hashed save karo
    // await sendOTPEmail(user.email, otp); // ← plain bhejo email pe
    await sendOTPEmail(user.email, otp);

    await logActivity(user.id, "LOGIN_OTP_SENT", ipAddress, userAgent);

    // ✅ Tokens mat do abhi — OTP verify hone ke baad denge

    return {
      message: "OTP sent to your email",
      userId: user.id,
    };
  }
  async verifyOTP(
    userId: string,
    otp: string,
    ipAddress?: string,
    deviceInfo?: string,
  ) {
    // OTP dhundho
    const otpRecord = await this.repo.findOTPByUserId(userId);
    if (!otpRecord) {
      throw new AppError("OTP not found", 404);
    }

    // Expire check karo
    if (otpRecord.expiresAt < new Date()) {
      await this.repo.deleteOTPByUserId(userId);
      throw new AppError("OTP expired", 403);
    }
    const hashedInputOTP = hashOTP(otp);
    if (otpRecord.otp !== hashedInputOTP) {
      throw new AppError("Invalid OTP", 401);
    }

    // OTP delete karo — use ho gaya
    await this.repo.deleteOTPByUserId(userId);

    // ✅ Purane tokens delete karo
    await this.repo.deleteAllRefreshTokenByUser(userId);

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await this.repo.createRefreshToken({
      token: hashedRefreshToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deviceInfo: deviceInfo, // ← add
      ipAddress: ipAddress, // ← add
    });

    await logActivity(userId, "LOGIN_OTP_VERIFIED");

    return { accessToken, refreshToken };
  }

  async refreshToken(
    body: refreshTokenDTO,
    ipAddress?: string,
    deviceInfo?: string,
  ) {
    const { token } = body;

    if (!token) throw new AppError("Refresh token required", 401);

    let decoded;
    try {
      decoded = verifyRefreshToken(token) as IJwtPayload;
    } catch {
      throw new AppError("Invalid or expired refresh token", 403);
    }

    const hashedToken = hashRefreshToken(token);
    const existingToken = await this.repo.findRefreshToken(hashedToken);

    if (!existingToken) {
      await this.repo.deleteAllRefreshTokenByUser(decoded.userId);
      throw new AppError("Token reuse detected, login again", 403);
    }

    if (existingToken.expiresAt < new Date()) {
      await this.repo.deleteRefreshTokenById(existingToken.id);
      throw new AppError("Refresh token expired", 403);
    }

    await this.repo.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);
    const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

    await this.repo.createRefreshToken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deviceInfo: deviceInfo, // ← add
      ipAddress: ipAddress, // ← add
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async getCurrentUser(userId: string) {
    const user = await this.repo.findUserById(userId);
    if (!user) throw new AppError("User not found", 404);
    return { user: toUserResponse(user) };
  }
  async getActivityLog(userId: string) {
    const logs = await this.repo.getActivityByUserId(userId);
    return logs;
  }
  async logout(
    refreshToken: string,
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    if (!refreshToken) throw new AppError("Refresh token required", 401);

    const refreshTokenHashed = hashRefreshToken(refreshToken);
    const existingToken = await this.repo.findRefreshToken(refreshTokenHashed);
    if (!existingToken) throw new AppError("Invalid refresh token", 404);

    await this.repo.deleteRefreshTokenById(existingToken.id);
    await logActivity(userId, "LOGOUT", ipAddress, userAgent); // ✅ userAgent add

    return true;
  }

  async logoutAllDevices(userId: string) {
    if (!userId) throw new AppError("User id not found", 404);
    await this.repo.deleteAllRefreshTokenByUser(userId);
    await logActivity(userId, "LOGOUT_ALL_DEVICES");
    return true;
  }
}
