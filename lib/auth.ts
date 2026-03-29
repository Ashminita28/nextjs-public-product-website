import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginUser } from '@/lib/strapi';
import { LoginBody } from '@/lib/types/api-types';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const body: LoginBody = {
          identifier: credentials.email,
          password: credentials.password,
        };

        const data = await loginUser(body);

        return {
          id: String(data.user.id),
          email: data.user.email,
          name: data.user.username,
          jwt: data.jwt,
        };
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      session.jwt = token.jwt as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
