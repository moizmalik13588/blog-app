"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-hot-toast/headless";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  userId: string;
  createdAt: string;
  user: {
    username: string;
  };
}

interface Comment {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: {
    username: string;
  };
}

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/api/v1/posts/post/${id}`);
      toast.success("Post deleted!");
      router.push("/posts");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/v1/posts/post/${id}`);
      setPost(response.data.payload.data);
    } catch {
      setError("Post not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/v1/comments/comment/${id}`);
      setComments(response.data.payload.data);
    } catch {
      console.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setCommentLoading(true);

    try {
      await api.post("/api/v1/comments/comment", {
        comment: newComment,
        postId: id,
      });

      toast.success("Comment posted!");
      setNewComment("");
      fetchComments();
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push("/login");
      } else {
        toast.error("Failed to post comment");
      }
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-400 dark:text-gray-500">Post not found.</p>
          <Link
            href="/posts"
            className="text-blue-600 text-[14px] mt-2 inline-block"
          >
            ← Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back + Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/posts"
            className="text-[13px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
          >
            ← Back to posts
          </Link>

          {user?.id === post.userId && (
            <div className="flex items-center gap-2">
              <Link
                href={`/posts/${post.id}/edit`}
                className="h-8 px-3 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors"
              >
                Edit
              </Link>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="h-8 px-3 border border-red-200 hover:bg-red-50 text-red-500 text-[13px] font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {showDeleteModal && (
          <DeleteModal
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
            loading={deleteLoading}
          />
        )}

        {/* Image */}
        {post.imageUrl && (
          <div className="relative w-full h-[200px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-900">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h1>
        {/* Author + Date */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">
              {post.user?.username?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
              {post.user?.username || "Unknown"}
            </p>
            <p className="text-[12px] text-gray-400 dark:text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-12">
          {post.description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-8" />

        {/* Comments */}
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 dark:text-white mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Input */}
          <form onSubmit={handleComment} className="mb-8">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                <span className="text-white text-[12px] font-bold">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </span>
              </div>

              <div className="flex-1">
                <textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 text-[14px] text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder:text-gray-300 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
                />

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={commentLoading || !newComment.trim()}
                    className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {commentLoading ? "Posting..." : "Post comment"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-[14px] text-gray-400 dark:text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300 text-[12px] font-bold">
                      {comment.user?.username?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        {comment.user?.username || "User"}
                      </span>
                      <span className="text-[12px] text-gray-400 dark:text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>

                    <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
