import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string | number;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | number;
    username?: string;
  }
}