import { z } from "zod";

export const postSchema = z
  .object({
    title: z.string().min(3, "min 3 characters"),
    description: z.string().min(10, "min 10 characters"),
    imageUrl: z.string().optional(),
  })
  .strict();

export const updatePostSchema = z
  .object({
    title: z.string().min(3, "min 3 characters").optional(),
    description: z.string().min(10, "min 10 characters").optional(),
    imageUrl: z.string().optional(),
  })
  .strict();

export type postSchemaDTO = z.infer<typeof postSchema>;
export type updatePostSchemaDTO = z.infer<typeof updatePostSchema>;
