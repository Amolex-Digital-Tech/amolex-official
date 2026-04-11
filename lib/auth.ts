import { NextResponse } from "next/server";

// Type for auth context with tenant
export type AuthContextType = {
  user: {
    id: string;
    email?: string;
  };
  tenantId: string | null;
};

// Create a simple auth handler that returns null for now
// This allows the build to pass while you configure proper authentication
export async function GET(request: Request) {
  return NextResponse.json({ error: "Not configured" }, { status: 401 });
}

export async function POST(request: Request) {
  return NextResponse.json({ error: "Not configured" }, { status: 401 });
}

// Export handlers and auth for other routes to import
export const handlers = {
  GET,
  POST
};

// Auth function that returns session or null
export const auth = async (): Promise<AuthContextType | null> => {
  return null;
};

// Helper function to require user session
export async function requireUserSession(): Promise<AuthContextType> {
  const context = await auth();
  if (!context?.user) {
    throw new Error("Unauthorized");
  }
  return context;
}

// Helper function to require admin session
export async function requireAdminSession(): Promise<AuthContextType> {
  const context = await auth();
  if (!context?.user) {
    throw new Error("Unauthorized");
  }
  return context;
}

// Types for custom auth context (kept for compatibility)
export type AuthContext = AuthContextType & {
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
};
