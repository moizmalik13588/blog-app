import { Post } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { updatePostSchemaDTO } from "./post.schema.js";

export class PostRepository implements IPostRepository {
  async findPostById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          // ✅ user include karo
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    return post;
  }
  async findAllPosts(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            // ✅ user include karo
            select: {
              username: true,
              email: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return { posts, total };
  }
  async createPost(
    title: string,
    description: string,
    imageUrl: string | undefined,
    userId: string,
  ): Promise<Post> {
    const createdPost = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        userId,
      },
    });
    return createdPost;
  }

  async updatePost(
    id: string,
    data: updatePostSchemaDTO,
  ): Promise<Post | null> {
    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data,
    });
    return updatePost;
  }

  async deletePost(id: string): Promise<void> {
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
