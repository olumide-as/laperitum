"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check login status, example: localStorage or cookie
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    // Show loader or nothing while checking auth
    return null;
  }

  return <>{children}</>;
}