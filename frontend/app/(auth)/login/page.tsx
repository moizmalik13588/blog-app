"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/api/v1/auth/login", formData);
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
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            BlogApp
          </span>
        </Link>

        <div className="flex-1 flex flex-col justify-center w-full max-w-[360px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              Welcome back
            </h1>
            <p className="text-[14px] text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2.5 mb-5 text-[13px]">
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
                className="w-full h-10 px-3 text-[14px] text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[12px] text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-10 px-3 text-[14px] text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create one
            </Link>
          </p>
        </div>

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
            Welcome back to <span className="text-blue-400">BlogApp.</span>
          </h2>
          <p className="text-white/50 text-[15px] leading-relaxed mb-10">
            Continue sharing your stories and connecting with readers around the
            world.
          </p>
          <div className="space-y-3">
            {[
              { icon: "✍️", text: "Rich text editor with media support" },
              { icon: "🌍", text: "Reach readers from 150+ countries" },
              { icon: "💬", text: "Built-in comments and engagement tools" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[14px] flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-white/70 text-[14px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
