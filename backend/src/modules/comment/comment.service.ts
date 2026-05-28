import { Comment } from "../../../generated/prisma/index.js";
import { AppError } from "../../utils/App.Error.js";
import { ICommentRepository } from "./comment.interface.js";
import {
  commentsSchemaDTO,
  updateCommentsSchemaDTO,
} from "./comment.schema.js";

export class CommentService {
  constructor(private repo: ICommentRepository) {}
  async createComment(
    body: commentsSchemaDTO,
    userId: string,
  ): Promise<Comment> {
    const { comment, postId } = body;
    const comments = await this.repo.createComment(comment, postId, userId);
    return comments;
  }
  async findAllComments(postId: string): Promise<Comment[]> {
    const comments = await this.repo.findAllComments(postId);
    return comments;
  }
  async findCommentById(id: string): Promise<Comment> {
    const comments = await this.repo.findCommentById(id);
    if (!comments) {
      throw new AppError("Comments not found", 404);
    }
    return comments;
  }

  async updateComment(
    id: string,
    data: updateCommentsSchemaDTO,
    userId: string,
  ): Promise<Comment> {
    const comment = await this.repo.findCommentById(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new AppError("Unauthorized error", 403);
    }
    const updatedComment = await this.repo.updateComment(id, data);
    if (!updatedComment) {
      throw new AppError("Failed to update comment", 500);
    }
    return updatedComment;
  }
  async deleteComment(id: string, userId: string): Promise<void> {
    const comment = await this.repo.findCommentById(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new AppError("Unauthorized error", 403);
    }

    await this.repo.deleteComment(id);
  }
}
