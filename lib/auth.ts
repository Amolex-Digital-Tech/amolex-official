import NextAuth from "next-auth";
import { createSupabaseServerClient } from "./supabase/server";

// Create NextAuth configuration
const nextAuthInstance = NextAuth({
  providers: [],
  callbacks: {
    async session({ session, token }) {
      return session;
    }
  }
});

// Export NextAuth handlers for the API route
export const handlers = nextAuthInstance.handlers;
export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;

// Types for custom auth context
export type AuthContext = {
  session: {
    user: {
      id: string;
      email?: string;
      app_metadata?: Record<string, unknown>;
      user_metadata?: Record<string, unknown>;
    };
    expires_at?: number;
    access_token?: string;
    refresh_token?: string;
  };
  role: string;
  tenantId: string | null;
};

// Get session using Supabase directly (for custom auth logic)
export async function getSession(): Promise<AuthContext | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return null;
  }

  const role =
    (data.session.user.app_metadata?.role as string | undefined) ??
    (data.session.user.user_metadata?.role as string | undefined) ??
    "member";

  const tenantId =
    (data.session.user.app_metadata?.tenant_id as string | undefined) ??
    (data.session.user.user_metadata?.tenant_id as string | undefined) ??
    null;

  return { session: data.session as any, role, tenantId };
}

export async function requireAdminSession(): Promise<AuthContext> {
  const context = await getSession();

  if (!context) {
    throw new Error("Unauthorized");
  }

  if (!["owner", "admin"].includes(context.role)) {
    throw new Error("Forbidden");
  }

  return context;
}

export async function requireUserSession(): Promise<AuthContext> {
  const context = await getSession();

  if (!context) {
    throw new Error("Unauthorized");
  }

  return context;
}

// Get user's role and tenant info (without redirecting)
export async function getUserRole(): Promise<{ role: string; tenantId: string | null; isAdmin: boolean } | null> {
  const context = await getSession();

  if (!context) {
    return null;
  }

  return {
    role: context.role,
    tenantId: context.tenantId,
    isAdmin: ["owner", "admin"].includes(context.role)
  };
}
