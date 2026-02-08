import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  console.log("🔍 Proxy Debug:", {
    pathname,
    hasToken: !!token,
    tokenPreview: token ? "Token exists" : "No token",
  });

  if (!token && (pathname === "/cart" || pathname === "/allorders")) {
    console.log("❌ Redirecting to login - no token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    console.log("✅ Redirecting to home - already logged in");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("✅ Allowing request to proceed");
  return NextResponse.next();
}
export const config = {
  matcher: ["/login", "/register", "/cart", "/allorders"],
};
