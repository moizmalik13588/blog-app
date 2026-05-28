import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-12">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900 text-[15px]">
            BlogApp
          </span>
        </Link>

        {/* 404 */}
        <p className="text-[80px] font-bold text-gray-100 leading-none mb-2">
          404
        </p>
        <h1 className="text-[24px] font-bold text-gray-900 mb-2 tracking-tight">
          Page not found
        </h1>
        <p className="text-[15px] text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-xl transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/posts"
            className="h-10 px-6 border border-gray-200 hover:border-gray-300 text-gray-600 text-[14px] font-medium rounded-xl transition-colors"
          >
            Browse posts
          </Link>
        </div>
      </div>
    </div>
  );
}
