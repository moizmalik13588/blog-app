import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", {
    expires: new Date(0),
    path: "/",
    domain: ".pencraft.site",
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

  cookieStore.set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
    domain: ".pencraft.site",
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

  return NextResponse.json({ success: true });
}
