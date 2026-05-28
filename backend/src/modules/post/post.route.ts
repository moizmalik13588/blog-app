import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { postSchema, updatePostSchema } from "./post.schema.js";
import {
  createPostController,
  deletePostController,
  findAllPostsController,
  findPostByIdController,
  updatePostController,
} from "./post.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
const router = express.Router();

router
  .route("/post")
  .post(
    verifyUser,
    upload.single("image"),
    validate(postSchema),
    createPostController,
  );
router.route("/post").get(findAllPostsController);
router.route("/post/:id").get(findPostByIdController);
router
  .route("/post/:id")
  .put(
    verifyUser,
    upload.single("image"),
    validate(updatePostSchema),
    updatePostController,
  );
router.route("/post/:id").delete(verifyUser, deletePostController);
/**
 * @swagger
 * /api/v1/posts/post:
 *   post:
 *     summary: Create a post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 *
 * /api/v1/posts/post/{id}:
 *   get:
 *     summary: Get post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *   put:
 *     summary: Update post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *   delete:
 *     summary: Delete post
 *     tags: [Posts]
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
 *         description: Post deleted successfully
 */
export default router;
