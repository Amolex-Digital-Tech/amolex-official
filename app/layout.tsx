import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { SupportBot } from "@/components/ui/support-bot";
import { LeadFunnel } from "@/components/ui/lead-funnel";
import { LiquidBackground } from "@/components/ui/liquid-background";
import { buildMetadata, siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} | Digital Innovation Platform`
  })
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_top,rgba(16,61,46,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(178,146,103,0.16),transparent_24%)]" />
            <LiquidBackground />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <SupportBot />
            <LeadFunnel />
          </div>
        </Providers>
      </body>
    </html>
  );
}
