"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch {}
    await fetch("/api/logout", { method: "POST" });
    window.location.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            BlogApp
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/posts"
            className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/posts/create"
            className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Write
          </Link>
          <Link
            href="/profile"
            className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Profile
          </Link>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-[11px]">
                    {user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
                  {user.username}
                </span>
              </Link>
              <Link
                href="/posts/create"
                className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center whitespace-nowrap"
              >
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="h-8 px-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="h-8 px-4 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors flex items-center"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-3 space-y-1">
            {user && (
              <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-[12px]">
                    {user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">
                    View profile
                  </p>
                </div>
              </div>
            )}

            <Link
              href="/posts"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="text-[14px] text-gray-700 dark:text-gray-300">
                Browse
              </span>
            </Link>

            {user && (
              <Link
                href="/posts/create"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="text-[14px] text-gray-700 dark:text-gray-300">
                  Write
                </span>
              </Link>
            )}

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="text-[14px] text-gray-700 dark:text-gray-300">
                Profile
              </span>
            </Link>

            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/posts/create"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
                  >
                    New Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full h-10 border border-gray-200 dark:border-gray-700 text-red-500 text-[14px] font-medium rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-full h-10 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-[14px] font-medium rounded-lg transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
