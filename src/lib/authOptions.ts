import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface ExtendedUser extends User {
  id: string | number;
  username: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.username,
          username: user.username,
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
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret",
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { id?: string | number; username?: string };
    }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string | number,
          username: token.username || "",
        };
      }
      return session;
    },
  },
};