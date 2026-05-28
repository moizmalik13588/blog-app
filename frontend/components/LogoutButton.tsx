"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch {}

    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="h-8 px-4 border border-gray-200 hover:border-gray-300 text-gray-600 text-[13px] font-medium rounded-lg transition-colors"
    >
      Logout
    </button>
  );
}
