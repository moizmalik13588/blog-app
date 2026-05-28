import { Metadata } from "next";
import PostDetailClient from "./PostDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/posts/post/${params.id}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    const post = data.payload.data;

    return {
      title: post.title,
      description: post.description?.slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.description?.slice(0, 160),
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description?.slice(0, 160),
        images: post.imageUrl ? [post.imageUrl] : [],
      },
    };
  } catch {
    return { title: "Post | BlogApp" };
  }
}

export default function PostDetailPage() {
  return <PostDetailClient />;
}
