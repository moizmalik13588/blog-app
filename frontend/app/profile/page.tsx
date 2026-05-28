"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar/page";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const [userRes, activityRes] = await Promise.all([
        api.get("/api/v1/auth/me"),
        api.get("/api/v1/auth/me/activity"),
      ]);

      setUser(userRes.data.payload.data.user);
      setActivity(activityRes.data.payload.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "bg-green-50 text-green-600 border-green-100";
      case "LOGOUT":
        return "bg-gray-50 text-gray-600 border-gray-100";
      case "REGISTER":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "LOGIN_OTP_SENT":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "LOGIN_OTP_VERIFIED":
        return "bg-green-50 text-green-600 border-green-100";
      case "LOGOUT_ALL_DEVICES":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
      case "LOGIN_OTP_VERIFIED":
        return "🔓";
      case "LOGOUT":
      case "LOGOUT_ALL_DEVICES":
        return "🔒";
      case "REGISTER":
        return "✨";
      case "LOGIN_OTP_SENT":
        return "📧";
      default:
        return "📋";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="text-[20px] font-bold text-gray-900 dark:text-white">
                {user?.username}
              </h1>

              <p className="text-[14px] text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>

              <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                Member since{" "}
                {new Date(user?.createdAt || "").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            {[
              {
                label: "Total Logins",
                value: activity.filter((a) => a.action === "LOGIN_OTP_VERIFIED")
                  .length,
              },
              {
                label: "Devices Used",
                value: new Set(activity.map((a) => a.userAgent)).size,
              },
              { label: "Activities", value: activity.length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[22px] font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-[12px] text-gray-400 dark:text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
          <h2 className="text-[16px] font-bold text-gray-900 dark:text-white mb-5">
            Recent Activity
          </h2>

          {activity.length === 0 ? (
            <p className="text-[14px] text-gray-400 dark:text-gray-500 text-center py-6">
              No activity yet
            </p>
          ) : (
            <div className="space-y-3">
              {activity.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[14px]">
                    {getActionIcon(log.action)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getActionColor(
                          log.action,
                        )}`}
                      >
                        {log.action.replace(/_/g, " ")}
                      </span>

                      <span className="text-[12px] text-gray-400 dark:text-gray-500">
                        {new Date(log.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(log.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[12px] text-gray-400 dark:text-gray-500 truncate">
                        📍 {log.ipAddress || "Unknown IP"}
                      </span>

                      <span className="text-[12px] text-gray-300 dark:text-gray-600">
                        ·
                      </span>

                      <span className="text-[12px] text-gray-400 dark:text-gray-500 truncate">
                        💻 {log.userAgent?.split("/")[0] || "Unknown device"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            href="/posts/create"
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-xl transition-colors flex items-center justify-center"
          >
            Write a post
          </Link>

          <button
            onClick={async () => {
              await api.post("/api/v1/auth/logout-all-devices");
              window.location.href = "/login";
            }}
            className="h-10 px-4 border border-red-200 dark:border-red-800 hover:border-red-300 text-red-500 text-[14px] font-medium rounded-xl transition-colors"
          >
            Logout all devices
          </button>
        </div>
      </main>
    </div>
  );
}
