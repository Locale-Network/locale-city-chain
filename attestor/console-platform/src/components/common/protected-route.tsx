"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useHasRole } from "@/lib/hooks/use-auth";
import type { AuthUser } from "@/lib/api/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: AuthUser["role"][];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Wrapper component that protects routes requiring authentication
 */
export function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const hasRole = useHasRole(requiredRoles || []);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      )
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Check role if required
  if (requiredRoles && requiredRoles.length > 0 && !hasRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">
          You don&apos;t have permission to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * HOC for protecting pages
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRoles?: AuthUser["role"][];
    redirectTo?: string;
  }
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        requiredRoles={options?.requiredRoles}
        redirectTo={options?.redirectTo}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
