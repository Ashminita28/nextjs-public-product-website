import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { StrapiAuthResponse } from "@/lib/types";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data: StrapiAuthResponse = await res.json();

        return {
          id: data.user.id.toString(),
          name: data.user.username,
          email: data.user.email,
          jwt: data.jwt,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.jwt = token.jwt;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};