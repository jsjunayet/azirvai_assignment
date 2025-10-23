import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Call your API directly using fetch
  const res = await fetch(`http://localhost:5000/api/v1/auth/getMe`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data?.role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (data.role !== "OWNER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
