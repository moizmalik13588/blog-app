import express from "express";
import {
  authRateLimiter,
  otpRateLimiter,
} from "../../middlewares/rateLimiter.middleware.js";
import {
  currentUserController,
  getActivityLogController,
  loginUserController,
  logoutAllController,
  logoutController,
  refreshTokenController,
  registerUserController,
  verifyOTPController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "./auth.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/register")
  .post(authRateLimiter, validate(registerUserSchema), registerUserController);

router
  .route("/login")
  .post(authRateLimiter, validate(loginUserSchema), loginUserController);
router.route("/verify-otp").post(otpRateLimiter, verifyOTPController);
router
  .route("/refreshToken")
  .post(validate(refreshTokenSchema), refreshTokenController);

router.route("/me").get(verifyUser, currentUserController);
router.route("/me/activity").get(verifyUser, getActivityLogController);
router.route("/logout").post(verifyUser, logoutController);
router.route("/logout-all-devices").post(verifyUser, logoutAllController);
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OTP sent to email
 *       400:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified, tokens returned
 *       401:
 *         description: Invalid OTP
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /api/v1/auth/logout-all-devices:
 *   post:
 *     summary: Logout from all devices
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out of all devices
 */
export default router;
