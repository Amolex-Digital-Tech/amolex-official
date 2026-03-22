import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buildMetadata } from "@/lib/site";
import { Mail, Chrome, Apple, Globe } from "lucide-react";

export const metadata = buildMetadata({
  title: "Subscribe to Updates | Amolex Digital Tech",
  path: "/dashboard/sign-in"
});

export default function SubscribePage() {
  return (
    <div className="container py-20">
      <Card className="mx-auto max-w-lg p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-secondary">Stay Updated</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold">Subscribe to Our Newsletter</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Get the latest news, updates, and insights directly to your email. 
          Subscribe using your preferred email provider.
        </p>

        {/* Social Login Buttons */}
        <div className="mt-8 grid gap-3">
          <Button 
            type="button" 
            className="flex items-center justify-center gap-2"
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button 
            type="button" 
            className="flex items-center justify-center gap-2"
          >
            <Apple className="h-5 w-5" />
            Continue with Apple
          </Button>
          <Button 
            type="button" 
            className="flex items-center justify-center gap-2"
          >
            <Globe className="h-5 w-5" />
            Continue with Microsoft
          </Button>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Email Subscription Form */}
        <form className="grid gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              name="email" 
              type="email" 
              placeholder="Enter your email address" 
              className="pl-10"
              required 
            />
          </div>
          <Button type="submit">Subscribe</Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          By subscribing, you agree to receive marketing emails. 
          Unsubscribe at any time.
        </p>
      </Card>
    </div>
  );
}
