"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const router = useRouter();
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
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            BlogApp
          </span>
        </Link>

        {/* Links — Desktop */}
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

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Avatar */}
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
              {user?.username || "User"}
            </span>
          </Link>

          <Link
            href="/posts/create"
            className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center"
          >
            New Post
          </Link>

          <button
            onClick={handleLogout}
            className="h-8 px-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile right */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          {user && (
            <Link
              href="/posts/create"
              className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium rounded-lg transition-colors flex items-center whitespace-nowrap"
            >
              New Post
            </Link>
          )}
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1">
          <div className="flex items-center gap-2 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
              {user?.username || "User"}
            </span>
          </div>
          <Link
            href="/posts"
            className="block text-[14px] text-gray-600 dark:text-gray-400 py-2"
          >
            Browse
          </Link>
          <Link
            href="/posts/create"
            className="block text-[14px] text-gray-600 dark:text-gray-400 py-2"
          >
            Write
          </Link>
          <button
            onClick={handleLogout}
            className="block text-[14px] text-red-500 py-2 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
