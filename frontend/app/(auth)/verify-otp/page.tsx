"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("pendingUserId");
      if (!userId) {
        router.push("/login");
        return;
      }

      await api.post("/api/v1/auth/verify-otp", { userId, otp });

      localStorage.removeItem("pendingUserId");
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-gray-950">
      {/* Left */}
      <div className="flex flex-col p-8 md:p-10 bg-white dark:bg-gray-950">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            BlogApp
          </span>
        </Link>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[360px] mx-auto py-12">
          {/* Email icon */}
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              Check your email
            </h1>
            <p className="text-[14px] text-gray-500 dark:text-gray-400">
              We sent a 6-digit code to your email. Enter it below to continue.
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
            <div>
              <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Verification code
              </label>

              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full h-12 px-3 text-[18px] font-mono text-center text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-[14px] placeholder:font-sans focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all tracking-[0.5em]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[14px] font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                  Verifying...
                </>
              ) : (
                "Verify code"
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 dark:text-gray-400 mt-6">
            Didn't receive the code?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Resend
            </button>
          </p>

          <p className="text-center text-[13px] text-gray-500 dark:text-gray-400 mt-3">
            <Link
              href="/login"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ← Back to login
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
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h2 className="text-[36px] font-bold text-white leading-[1.2] tracking-tight mb-4">
            Secure <span className="text-blue-400">verification.</span>
          </h2>

          <p className="text-white/50 text-[15px] leading-relaxed mb-10">
            We use two-factor authentication to keep your account safe. Your
            security is our priority.
          </p>

          <div className="space-y-3">
            {[
              { icon: "🔒", text: "End-to-end encrypted OTP" },
              { icon: "⏱️", text: "Code expires in 10 minutes" },
              { icon: "🛡️", text: "Protected against brute force" },
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
