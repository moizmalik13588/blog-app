import express from "express";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { commentSchema, updateCommentSchema } from "./comment.schema.js";
import {
  createCommentController,
  deleteCommentController,
  findAllCommentsController,
  findCommentByIdController,
  updateCommentController,
} from "./comment.controller.js";

const router = express.Router();

router
  .route("/comment")
  .post(verifyUser, validate(commentSchema), createCommentController);
router.route("/comment/:postId").get(findAllCommentsController);

router.route("/comment/:id").get(findCommentByIdController);
router
  .route("/comment/:id")
  .put(verifyUser, validate(updateCommentSchema), updateCommentController);
router.route("/comment/:id").delete(verifyUser, deleteCommentController);
/**
 * @swagger
 * /api/v1/comments/comment:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - postId
 *             properties:
 *               comment:
 *                 type: string
 *               postId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *
 * /api/v1/comments/comment/{postId}:
 *   get:
 *     summary: Get all comments by post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *
 * /api/v1/comments/comment/{id}:
 *   get:
 *     summary: Get comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment fetched successfully
 *   put:
 *     summary: Update comment
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
export default router;
