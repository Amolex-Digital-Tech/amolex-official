import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

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

  return { session: data.session, role, tenantId };
}

export async function requireAdminSession(): Promise<AuthContext> {
  const context = await getSession();

  if (!context) {
    redirect("/dashboard/sign-in");
  }

  if (!["owner", "admin"].includes(context.role)) {
    redirect("/dashboard/sign-in");
  }

  return context;
}

export async function requireUserSession(): Promise<AuthContext> {
  const context = await getSession();

  if (!context) {
    redirect("/dashboard/sign-in");
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
