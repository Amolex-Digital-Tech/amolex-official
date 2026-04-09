"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 [font-family:var(--font-nexa)] font-bold">
      <div className="absolute inset-x-0 top-0 h-full bg-white/50 backdrop-blur-3xl border-b border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
      <div className="relative container flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border backdrop-blur-md",
                pathname === link.href 
                  ? "bg-white/60 text-[#103D2E] border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" 
                  : "bg-white/30 border-white/40 text-gray-700 hover:bg-white/50 hover:border-white/50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="icon" asChild aria-label="Open client portal">
            <Link href="/dashboard/sign-in">
              <LogIn className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Start Project</Link>
          </Button>
        </div>
        <MobileNav links={links} />
      </div>
    </header>
  );
}
