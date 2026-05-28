import { CommentRepository } from "./comment.repository.js";
import { CommentService } from "./comment.service.js";

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);

export { commentService };
