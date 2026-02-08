"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(): Promise<string | null> {
  const data = await cookies();
  const encryptedToken =
    data.get("next-auth.session-token") ||
    data.get("__Secure-next-auth.session-token");

  if (!encryptedToken) return null;

  const decoded = await decode({
    token: encryptedToken.value,
    secret: process.env.AUTH_SECRET!,
  });

  if (!decoded || typeof decoded.accessToken !== "string") {
    return null;
  }

  return decoded.accessToken; // لاحظ هنا استخدمنا accessToken بدل token
}