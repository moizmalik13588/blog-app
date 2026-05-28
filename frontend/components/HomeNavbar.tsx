"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface HomeNavbarProps {
  isLoggedIn: boolean;
}

export default function HomeNavbar({ isLoggedIn }: HomeNavbarProps) {
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

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/posts"
            className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Browse
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Link
                href="/posts/create"
                className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center"
              >
                New Post
              </Link>
              <Link
                href="/profile"
                className="h-8 px-4 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors flex items-center"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="h-8 px-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-600 dark:text-gray-300 text-[13px] font-medium rounded-lg transition-colors flex items-center"
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
      </div>
    </nav>
  );
}
