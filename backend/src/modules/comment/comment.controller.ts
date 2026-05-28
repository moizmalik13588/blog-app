import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { commentService } from "./comment.container.js";

export const createCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.createComment(
      req?.body,
      req?.userId as string,
    );
    sendResponse(res, 201, {
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  },
);
export const findAllCommentsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.findAllComments(
      req.params.postId as string,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Fecthed all comments successfully",
      data: result,
    });
  },
);
export const findCommentByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.findCommentById(
      req.params.id as string,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Comment fetched successfully",
      data: result,
    });
  },
);

export const updateCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.updateComment(
      req.params.id as string,
      req.body,
      req.userId as string,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Comment update successfully",
      data: result,
    });
  },
);
export const deleteCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await commentService.deleteComment(
      req.params.id as string,
      req.userId as string,
    );
    sendResponse(res, 200, {
      success: true,
      message: "comment successfully deleted",
    });
  },
);
