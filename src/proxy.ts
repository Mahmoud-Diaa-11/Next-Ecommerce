import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/cart", "/allorders"];
const authRoutes = ["/login", "/register"];
export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  if (protectedRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (authRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}
