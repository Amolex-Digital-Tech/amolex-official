"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export function SignOutButton({ className, variant = "secondary", size = "default" }: Props) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  async function handleSignOut() {
    // Clear client session from localStorage
    localStorage.removeItem("client_session");
    localStorage.removeItem("user_company_name");
    
    // Also sign out from Supabase if needed
    await supabase.auth.signOut();
    
    router.push("/dashboard/sign-in");
    router.refresh();
  }

  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={handleSignOut}>
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
}
