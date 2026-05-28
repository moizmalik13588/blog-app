"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import PostSkeleton from "@/components/PostSkeleton";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  userId: string;
  createdAt: string;
  user: {
    // ✅ add karo
    username: string;
    email: string;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/posts/post", {
        params: { page, limit: 9, search },
      });
      const data = response.data.payload.data;
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[12px] font-semibold text-blue-600 uppercase tracking-widest">
            Read our blog
          </span>

          <h1 className="text-[36px] font-bold text-gray-900 dark:text-white tracking-tight mt-1 mb-2">
            Browse Our Resources
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-[15px]">
            Discover stories, ideas, and expertise from writers on every topic.
          </p>
        </div>

        {/* Search + Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-[13px] text-gray-400 dark:text-gray-500">
            Showing {posts.length} of {total} results
          </p>

          <div className="relative w-full sm:w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search blog..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-9 pl-9 pr-3 text-[13px] border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500 text-[15px]">
              No posts found.
            </p>

            <Link
              href="/posts/create"
              className="mt-4 inline-block text-blue-600 text-[14px] font-medium hover:underline"
            >
              Write the first post →
            </Link>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200">
                    {/* Image */}
                    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Avatar */}
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">
                              {post.user?.username?.[0]?.toUpperCase() || "U"}
                            </span>
                          </div>

                          <span className="text-[12px] text-gray-400 dark:text-gray-500">
                            {post.user?.username || "User"}
                          </span>

                          <span className="text-[12px] text-gray-400 dark:text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        <span className="text-[12px] text-blue-600 font-medium group-hover:underline">
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="h-8 px-3 text-[13px] border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg disabled:opacity-40 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 text-[13px] rounded-lg transition-colors ${
                        page === p
                          ? "bg-blue-600 text-white"
                          : "border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="h-8 px-3 text-[13px] border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg disabled:opacity-40 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
