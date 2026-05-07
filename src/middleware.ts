import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/roadmap", "/admin"];

export function middleware(request: NextRequest) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!isProtected || demoMode) {
    return NextResponse.next();
  }

  const hasSupabaseCookie = request.cookies.getAll().some((cookie) => cookie.name.startsWith("sb-"));

  if (!hasSupabaseCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/roadmap/:path*", "/admin/:path*"],
};
