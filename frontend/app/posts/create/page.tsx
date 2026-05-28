"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar/page";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const form = new FormData();

      form.append("title", formData.title);
      form.append("description", formData.description);

      if (image) form.append("image", image);

      await api.post("/api/v1/posts/post", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post published successfully!");

      router.push("/posts");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/posts"
            className="text-[13px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mb-4"
          >
            ← Back to posts
          </Link>

          <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight">
            Write a new post
          </h1>

          <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1">
            Share your story with the world
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-2.5 mb-6 text-[13px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-2">
              Cover Image
            </label>

            <div
              className="relative w-full h-52 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-blue-400 transition-colors cursor-pointer overflow-hidden"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <p className="text-[13px] text-gray-400 dark:text-gray-500">
                    Click to upload cover image
                  </p>
                  <p className="text-[12px] text-gray-300 dark:text-gray-600">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter your post title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full h-11 px-3 text-[15px] font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg outline-none placeholder:text-gray-300 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Content
            </label>

            <textarea
              placeholder="Write your post content here..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              rows={8}
              className="w-full px-3 py-3 text-[14px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg outline-none placeholder:text-gray-300 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none leading-relaxed transition-all"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish post"}
            </button>

            <Link
              href="/posts"
              className="h-10 px-6 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[14px] font-medium rounded-lg flex items-center hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
