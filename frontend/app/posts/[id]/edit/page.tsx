"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar/page";
import Link from "next/link";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/v1/posts/post/${id}`);
        const post = response.data.payload.data;
        setFormData({ title: post.title, description: post.description });
        setImagePreview(post.imageUrl);
      } catch {
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      if (image) form.append("image", image);

      await api.put(`/api/v1/posts/post/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push(`/posts/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <Link
            href={`/posts/${id}`}
            className="text-[13px] text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to post
          </Link>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Edit post
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">
            Update your post details
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-2.5 mb-6 text-[13px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-2">
              Cover Image
            </label>
            <div
              className="relative w-full h-52 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors cursor-pointer overflow-hidden bg-gray-50"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-[13px] text-gray-400">
                    Click to upload cover image
                  </p>
                </div>
              )}
              {imagePreview && (
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-[13px] font-medium">
                    Change image
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
            <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your post title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-11 px-3 text-[15px] font-medium text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
              Content
            </label>
            <textarea
              placeholder="Write your post content here..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={8}
              className="w-full px-3 py-3 text-[14px] text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none leading-relaxed"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
            <Link
              href={`/posts/${id}`}
              className="h-10 px-6 border border-gray-200 hover:border-gray-300 text-gray-600 text-[14px] font-medium rounded-lg transition-colors flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
