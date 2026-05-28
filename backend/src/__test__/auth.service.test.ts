import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthService } from "../modules/auth/auth.service.js";

const mockRepo = {
  findUserByUsername: vi.fn(),
  findUserByEmail: vi.fn(),
  createUser: vi.fn(),
  createRefreshToken: vi.fn(),
  findRefreshToken: vi.fn(),
  findRefreshTokenByUserId: vi.fn(),
  deleteRefreshTokenById: vi.fn(),
  deleteRefreshTokenByToken: vi.fn(),
  deleteAllRefreshTokenByUser: vi.fn(),
  deleteExpiredTokensByUser: vi.fn(),
  getActivityByUserId: vi.fn(),
  createOTP: vi.fn(),
  findOTPByUserId: vi.fn(),
  deleteOTPByUserId: vi.fn(),
};

const authService = new AuthService(mockRepo as any);

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should throw error if username already exists", async () => {
      mockRepo.findUserByUsername.mockResolvedValue({ id: "123" });

      await expect(
        authService.registerUser({
          username: "test",
          email: "test@test.com",
          password: "123456",
        }),
      ).rejects.toThrow("User already exists");
    });

    it("should throw error if email already exists", async () => {
      mockRepo.findUserByUsername.mockResolvedValue(null);
      mockRepo.findUserByEmail.mockResolvedValue({ id: "123" });

      await expect(
        authService.registerUser({
          username: "test",
          email: "test@test.com",
          password: "123456",
        }),
      ).rejects.toThrow("User already exists");
    });
  });

  describe("loginUser", () => {
    it("should throw error if user not found", async () => {
      mockRepo.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.loginUser({
          email: "test@test.com",
          password: "123456",
        }),
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw error if password is wrong", async () => {
      mockRepo.findUserByEmail.mockResolvedValue({
        id: "123",
        email: "test@test.com",
        password: "hashedPassword",
      });

      await expect(
        authService.loginUser({
          email: "test@test.com",
          password: "wrongpassword",
        }),
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("logout", () => {
    it("should throw error if refresh token not found", async () => {
      mockRepo.findRefreshToken.mockResolvedValue(null);

      await expect(
        authService.logout("invalidtoken", "userId123"),
      ).rejects.toThrow("Invalid refresh token");
    });
  });
});
