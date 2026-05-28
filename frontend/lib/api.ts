import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

const skipUrls = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/logout",
  "/auth/refreshToken",
];

let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const shouldSkip = skipUrls.some((url) =>
      originalRequest?.url?.includes(url),
    );

    // 401 aaya aur skip nahi karna
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      // Agar already refresh ho raha hai — queue mein daalo
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Naya access + refresh token lo
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/auth/refreshToken`,
          {},
          { withCredentials: true },
        );

        // Queue process karo
        processQueue(null);
        isRefreshing = false;

        // Original request dobara bhejo
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh bhi fail — logout karo
        processQueue(refreshError);
        isRefreshing = false;

        // Cookies clear karo
        if (typeof window !== "undefined") {
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
