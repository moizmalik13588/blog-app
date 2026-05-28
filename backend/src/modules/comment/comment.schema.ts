import { z } from "zod";

export const commentSchema = z
  .object({
    comment: z.string().min(1, "minimum 1 charater"),
    postId: z.string(),
  })
  .strict();

export const updateCommentSchema = z
  .object({
    comment: z.string().min(1, "minimum 1 charater").optional(),
  })
  .strict();

export type commentsSchemaDTO = z.infer<typeof commentSchema>;
export type updateCommentsSchemaDTO = z.infer<typeof updateCommentSchema>;
