"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else if (role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role !== "admin") {
    return null;
  }

  return <>{children}</>;
} 