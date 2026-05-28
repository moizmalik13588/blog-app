import { Post } from "../../../generated/prisma/index.js";
import { updatePostSchemaDTO } from "./post.schema.js";

export interface IPostRepository {
  findPostById(id: string): Promise<Post | null>;
  findAllPosts(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ posts: Post[]; total: number }>;
  createPost(
    title: string,
    description: string,
    imageUrl: string | undefined,
    userId: string,
  ): Promise<Post>;
  updatePost(id: string, data: updatePostSchemaDTO): Promise<Post | null>;
  deletePost(id: string): Promise<void>;
}
