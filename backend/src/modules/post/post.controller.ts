import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { postService } from "./post.container.js";

export const createPostController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.createPost(
      req.body,
      req.userId as string,
      req.file, // ← file add karo
    );
    sendResponse(res, 201, {
      success: true,
      message: "Post created successfully",
      data: result,
    });
  },
);
export const findAllPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string | undefined;

    const result = await postService.findAllPosts(page, limit, search);
    sendResponse(res, 200, {
      success: true,
      message: "Fetched all posts successfully",
      data: result,
    });
  },
);
export const findPostByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.findPostById(req.params.id as string);
    sendResponse(res, 200, {
      success: true,
      message: "Post fetched successfully",
      data: result,
    });
  },
);

export const updatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.updatePost(
      req.params.id as string,
      req.body,
      req.userId as string,
      req.file, // ← file add karo
    );
    sendResponse(res, 200, {
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  },
);

export const deletePostController = catchAsync(
  async (req: Request, res: Response) => {
    const deletedPost = await postService.deletePost(
      req.params.id as string,
      req.userId as string,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Post successfully deleted",
      data: deletedPost,
    });
  },
);
