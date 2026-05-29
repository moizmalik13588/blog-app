import Link from "next/link";
import { cookies } from "next/headers";
import HomeNavbar from "@/components/HomeNavbar";
import { unstable_noStore as noStore } from "next/cache";

async function getRecentPosts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/posts/post?page=1&limit=6`,
      { cache: "no-store" },
    );

    const data = await response.json();
    return data.payload.data.posts;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  noStore();
  const posts = await getRecentPosts();
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("accessToken")?.value;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Navbar */}
      <HomeNavbar isLoggedIn={isLoggedIn} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full px-3 py-1 mb-6">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <span className="text-blue-600 dark:text-blue-400 text-[12px] font-medium">
            10,000+ writers trust BlogApp
          </span>
        </div>

        <h1 className="text-[52px] font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
          Share your ideas with{" "}
          <span className="text-blue-600 dark:text-blue-400">the world</span>
        </h1>

        <p className="text-[18px] text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          BlogApp is the simplest way to write, publish, and grow your audience.
          Start for free today.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {isLoggedIn ? (
            <>
              <Link
                href="/posts/create"
                className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Write a post
              </Link>
              <Link
                href="/posts"
                className="h-11 px-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 text-[15px] font-medium rounded-xl transition-colors flex items-center whitespace-nowrap"
              >
                Browse posts
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Start writing free
              </Link>
              <Link
                href="/posts"
                className="h-11 px-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 text-[15px] font-medium rounded-xl transition-colors flex items-center whitespace-nowrap"
              >
                Browse posts
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
          {[
            { value: "10K+", label: "Writers" },
            { value: "50K+", label: "Posts published" },
            { value: "150+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[24px] font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Latest posts
            </span>

            <h2 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mt-1">
              Recent from the blog
            </h2>
          </div>

          <Link
            href="/posts"
            className="text-[14px] text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-[15px]">
              No posts yet.
            </p>

            <Link
              href="/register"
              className="mt-3 inline-block text-blue-600 dark:text-blue-400 text-[14px] font-medium hover:underline"
            >
              Be the first to write →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="group">
                <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            U
                          </span>
                        </div>

                        <span className="text-[12px] text-gray-400 dark:text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <span className="text-[12px] text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                        Read →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Everything you need to write
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-[15px]">
              Simple, powerful tools for modern writers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✍️",
                title: "Write beautifully",
                desc: "Clean editor focused on your words. No distractions, just writing.",
              },
              {
                icon: "🌍",
                title: "Reach globally",
                desc: "Publish instantly and reach readers from over 150 countries.",
              },
              {
                icon: "💬",
                title: "Engage readers",
                desc: "Built-in comments to connect with your audience directly.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
              >
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-[20px] mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-[32px] font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Ready to start writing?
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">
            Join thousands of writers on BlogApp. Free forever.
          </p>

          <Link
            href="/register"
            className="inline-flex h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-xl transition-colors items-center gap-2 shadow-md shadow-blue-200 dark:shadow-blue-900/30"
          >
            Create free account →
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="font-semibold text-gray-900 dark:text-white text-[14px]">
                PenCraft
              </span>
            </div>

            <span className="font-semibold text-gray-900 dark:text-white text-[14px]">
              BlogApp
            </span>
          </div>

          <p className="text-[13px] text-gray-400 dark:text-gray-500">
            © 2026 BlogApp. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/posts"
              className="text-[13px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              Browse
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  href="/register"
                  className="text-[13px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  className="text-[13px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
