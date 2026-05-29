"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

interface HomeNavbarProps {
  isLoggedIn: boolean;
}

export default function HomeNavbar({ isLoggedIn }: HomeNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-[15px]">
            PenCraft
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
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Link
                href="/posts/create"
                className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center whitespace-nowrap"
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
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1">
          <Link
            href="/posts"
            onClick={() => setMenuOpen(false)}
            className="flex items-center px-2 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <span className="text-[14px] text-gray-700 dark:text-gray-300">
              Browse
            </span>
          </Link>
          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
                >
                  New Post
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full h-10 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-[14px] font-medium rounded-lg transition-colors"
                >
                  Profile
                </Link>
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
      )}
    </nav>
  );
}
