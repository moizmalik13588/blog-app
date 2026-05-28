import { Post } from "../../../generated/prisma/index.js";
import { AppError } from "../../utils/App.Error.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { postSchemaDTO, updatePostSchemaDTO } from "./post.schema.js";

export class PostService {
  constructor(private repo: IPostRepository) {}
  async createPost(
    body: postSchemaDTO,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<Post> {
    const { title, description } = body;
    let imageUrl: string | undefined;

    // ✅ File aya hai toh upload karo
    if (file) {
      imageUrl = await uploadImage(file.buffer, "blog-app/posts");
    }

    const post = await this.repo.createPost(
      title,
      description,
      imageUrl,
      userId,
    );
    return post;
  }
  async findAllPosts(page: number = 1, limit: number = 10, search?: string) {
    const { posts, total } = await this.repo.findAllPosts(page, limit, search);

    return {
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findPostById(id: string): Promise<Post> {
    const post = await this.repo.findPostById(id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return post;
  }
  async updatePost(
    id: string,
    data: updatePostSchemaDTO,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<Post> {
    const post = await this.repo.findPostById(id);
    if (!post) throw new AppError("Post not found", 404);
    if (post.userId !== userId) throw new AppError("Unauthorized", 403);

    let imageUrl = data.imageUrl;

    // ✅ Naya file aya → purana delete → naya upload
    if (file) {
      if (post.imageUrl) {
        await deleteImage(post.imageUrl);
      }
      imageUrl = await uploadImage(file.buffer, "blog-app/posts");
    }

    const updatedPost = await this.repo.updatePost(id, { ...data, imageUrl });
    if (!updatedPost) throw new AppError("Post not found", 404);
    return updatedPost;
  }

  async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.repo.findPostById(id);
    if (!post) throw new AppError("Post not found", 404);
    if (post.userId !== userId) throw new AppError("Unauthorized", 403);

    // ✅ Cloudinary se image delete karo
    if (post.imageUrl) {
      await deleteImage(post.imageUrl);
    }

    await this.repo.deletePost(id);
  }
}
