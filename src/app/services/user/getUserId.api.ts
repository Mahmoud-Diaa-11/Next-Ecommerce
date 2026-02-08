import { jwtDecode } from "jwt-decode";
import getMyToken from "../getMyToken";
interface TokenPayload {
  id: string;
  email?: string;
  exp: number;
}
export async function getUserId(): Promise<string | null> {
  const token: string | null = await getMyToken();
  if (!token) {
    return null;
  }
  const user = jwtDecode<TokenPayload>(token);
  return user.id;
}
