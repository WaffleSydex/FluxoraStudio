import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";
  const valid = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  // Block the dashboard for anyone without a valid session.
  if (!isLogin && !valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Already signed in? Skip the login screen.
  if (isLogin && valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
