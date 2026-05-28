import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.container.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { destroyCookies, setCookies } from "../../utils/auth.helper.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const result = await authService.registerUser(
      req.body,
      ipAddress,
      userAgent,
    );
    destroyCookies(res);
    // setCookies(res, result.accessToken, result.refreshToken);
    sendResponse(res, 201, {
      success: true,
      message: "Account created successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const result = await authService.loginUser(req.body, ipAddress, userAgent);

    // ✅ setCookies hatao — tokens abhi nahi milenge
    // setCookies(res, result.accessToken, result.refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: "OTP sent to your email",
      data: result, // sirf { userId, message }
    });
  },
);
export const verifyOTPController = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, otp } = req.body;
    const ipAddress = req.ip;
    const deviceInfo = req.headers["user-agent"];

    const result = await authService.verifyOTP(
      userId,
      otp,
      ipAddress,
      deviceInfo,
    );

    setCookies(res, result.accessToken, result.refreshToken);
    sendResponse(res, 200, {
      success: true,
      message: "OTP verified successfully",
      data: result,
    });
  },
);

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const ipAddress = req.ip;
    const deviceInfo = req.headers["user-agent"];

    // ✅ Cookie se lo
    const token = req.cookies?.refreshToken;

    const result = await authService.refreshToken(
      { token },
      ipAddress,
      deviceInfo,
    );

    setCookies(res, result.accessToken, result.refreshToken);
    sendResponse(res, 200, {
      success: true,
      message: "Tokens refreshed successfully",
      data: result,
    });
  },
);

export const currentUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.getCurrentUser(req?.userId as string);
    sendResponse(res, 200, {
      success: true,
      message: "User detail fetched successfully",
      data: result,
    });
  },
);
export const getActivityLogController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.getActivityLog(req.userId as string);
    sendResponse(res, 200, {
      success: true,
      message: "Activity log fetched successfully",
      data: result,
    });
  },
);

export const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"]; // ✅ add karo
    const refreshToken = req.cookies?.refreshToken;

    await authService.logout(
      refreshToken,
      req.userId as string,
      ipAddress,
      userAgent,
    );
    destroyCookies(res);
    sendResponse(res, 200, {
      success: true,
      message: "Logged out successfully",
    });
  },
);

export const logoutAllController = catchAsync(
  async (req: Request, res: Response) => {
    await authService.logoutAllDevices(req.userId as string);
    destroyCookies(res);
    sendResponse(res, 200, {
      success: true,
      message: "Logged out of all devices",
    });
  },
);
