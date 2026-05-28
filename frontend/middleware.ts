import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/posts", "/profile"];
const authRoutes = ["/login", "/register", "/verify-otp"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  if (protectedRoutes.some((route) => path.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (authRoutes.some((route) => path.startsWith(route))) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/posts", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
