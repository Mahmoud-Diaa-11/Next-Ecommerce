import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (Credentials) => {
        const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: Credentials?.email,
            password: Credentials?.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload = await response.json();
        if (payload.message == "success") {
          const decodeToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodeToken.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error("invalid email or password");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
