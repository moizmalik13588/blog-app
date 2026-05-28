"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/api/v1/auth/register", formData);
      const { userId } = response.data.payload.data;
      localStorage.setItem("pendingUserId", userId);
      router.push("/verify-otp");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col p-8 md:p-10 bg-white dark:bg-gray-950">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            BlogApp
          </span>
        </Link>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[360px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              Create an account
            </h1>

            <p className="text-[14px] text-gray-500 dark:text-gray-400">
              Enter your details to get started
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-2.5 mb-5 text-[13px]">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Username
              </label>

              <input
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full h-10 px-3 text-[14px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Email address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-10 px-3 text-[14px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Password
              </label>

              <input
                type="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-10 px-3 text-[14px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[14px] font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-[12px] text-gray-300 dark:text-gray-700 text-center">
          © 2026 BlogApp · All rights reserved
        </p>
      </div>

      {/* Right */}
      <div className="hidden lg:flex flex-col justify-center bg-[#0F172A] px-16 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-[0.15] blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500 rounded-full opacity-[0.1] blur-[60px]" />

        <div className="relative z-10 max-w-[400px]">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-10">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />

            <span className="text-white/60 text-[12px] font-medium">
              10,000+ writers trust BlogApp
            </span>
          </div>

          <h2 className="text-[36px] font-bold text-white leading-[1.2] tracking-tight mb-4">
            Your ideas deserve{" "}
            <span className="text-blue-400">to be read.</span>
          </h2>

          <p className="text-white/50 text-[15px] leading-relaxed mb-10">
            BlogApp gives you the tools to write, publish, and grow your
            audience — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
