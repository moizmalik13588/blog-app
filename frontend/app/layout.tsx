import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Providers from "@/provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PenCraft — Share your ideas with the world",
    template: "%s | PenCraft",
  },
  description:
    "PenCraft is the simplest way to write, publish, and grow your audience. Join 10,000+ writers today.",
  keywords: ["blog", "writing", "publish", "stories", "articles"],
  authors: [{ name: "PenCraft" }],
  creator: "PenCraft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pencraft.site",
    siteName: "PenCraft",
    title: "PenCraft — Share your ideas with the world",
    description:
      "PenCraft is the simplest way to write, publish, and grow your audience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PenCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PenCraft — Share your ideas with the world",
    description:
      "PenCraft is the simplest way to write, publish, and grow your audience.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
