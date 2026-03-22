import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@amolex.tech";
const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/dashboard/sign-in"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        if (email === adminEmail && password === adminPassword) {
          return {
            id: "amolex-admin",
            email,
            name: "Amolex Admin",
            role: "admin"
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = typeof token.role === "string" ? token.role : "admin";
      }

      return session;
    }
  }
});

export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user) {
    redirect("/dashboard/sign-in");
  }

  return session;
}

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string;
  }
}
