import { Comment } from "../../../generated/prisma/index.js";
import { updateCommentsSchemaDTO } from "./comment.schema.js";

export interface ICommentRepository {
  findCommentById(id: string): Promise<Comment | null>;
  findAllComments(postId: string): Promise<Comment[]>;
  createComment(
    comment: string,
    postId: string,
    userId: string,
  ): Promise<Comment>;
  updateComment(
    id: string,
    data: updateCommentsSchemaDTO,
  ): Promise<Comment | null>;
  deleteComment(id: string): Promise<void>;
}
