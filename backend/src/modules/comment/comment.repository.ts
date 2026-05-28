import { Comment } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";
import { updateCommentsSchemaDTO } from "./comment.schema.js";

export class CommentRepository implements ICommentRepository {
  async findCommentById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });
    return comment;
  }
  async findAllComments(postId: string): Promise<Comment[]> {
    const comment = await prisma.comment.findMany({
      where: {
        postId,
      },
    });
    return comment;
  }
  async createComment(
    comment: string,
    postId: string,
    userId: string,
  ): Promise<Comment> {
    const createdComment = await prisma.comment.create({
      data: {
        comment,
        postId,
        userId,
      },
    });
    return createdComment;
  }

  async updateComment(
    id: string,
    data: updateCommentsSchemaDTO,
  ): Promise<Comment | null> {
    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },
      data,
    });
    return updatedComment;
  }
  async deleteComment(id: string): Promise<void> {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
