import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface ExtendedUser extends User {
  id: string | number;
  username: string;
}

// Simple in-memory login attempt tracking (for development)
// In production, use Redis or database
const failedLoginAttempts = new Map<string, { count: number; resetTime: number }>();
const FAILED_LOGIN_LIMIT = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkLoginAttempts(username: string): boolean {
  const now = Date.now();
  const attempt = failedLoginAttempts.get(username);

  if (!attempt) return true;

  if (now > attempt.resetTime) {
    failedLoginAttempts.delete(username);
    return true;
  }

  return attempt.count < FAILED_LOGIN_LIMIT;
}

function recordFailedLogin(username: string) {
  const now = Date.now();
  const attempt = failedLoginAttempts.get(username);

  if (!attempt) {
    failedLoginAttempts.set(username, {
      count: 1,
      resetTime: now + LOCKOUT_DURATION,
    });
  } else {
    attempt.count++;
    attempt.resetTime = now + LOCKOUT_DURATION;
  }
}

function clearFailedLogins(username: string) {
  failedLoginAttempts.delete(username);
}

function getRemainingLockoutTime(username: string): number {
  const attempt = failedLoginAttempts.get(username);
  if (!attempt) return 0;
  const remaining = Math.max(0, attempt.resetTime - Date.now());
  return Math.ceil(remaining / 1000);
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

        const username = credentials.username.trim();

        // Check if account is locked
        if (!checkLoginAttempts(username)) {
          const remainingTime = getRemainingLockoutTime(username);
          throw new Error(
            `Account temporarily locked. Try again in ${remainingTime} seconds.`
          );
        }

        const user = await prisma.user.findUnique({
          where: { username },
        });

        // Generic error message (don't reveal if user exists)
        if (!user) {
          recordFailedLogin(username);
          throw new Error("Invalid username or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          recordFailedLogin(username);
          throw new Error("Invalid username or password");
        }

        // Clear failed attempts on successful login
        clearFailedLogins(username);

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
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // Refresh session every 24 hours
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

// Export for use in other places if needed
export { checkLoginAttempts, recordFailedLogin, getRemainingLockoutTime };