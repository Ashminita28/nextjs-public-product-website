import 'next-auth';

declare module 'next-auth' {
  interface Session {
    jwt: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    jwt: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
  }
}
