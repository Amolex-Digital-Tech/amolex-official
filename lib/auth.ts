import NextAuth from "next-auth";

// Create the NextAuth instance
const nextAuth = NextAuth({
  providers: [],
  callbacks: {
    async session({ session, token }) {
      return session;
    }
  }
});

// Export handlers using type assertion
// @ts-ignore - NextAuth v5 has different types
export const handlers = nextAuth;

// @ts-ignore
export const GET = nextAuth;
// @ts-ignore
export const POST = nextAuth;

// @ts-ignore
export const auth = nextAuth;
// @ts-ignore
export const signIn = nextAuth.signIn.bind(nextAuth);
// @ts-ignore
export const signOut = nextAuth.signOut.bind(nextAuth);

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
