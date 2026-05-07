import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#07111f,#0a1b2f_55%,#07111f)] px-4 py-10 text-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section>
          <Link href="/" className="mb-10 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">SpeakFlow AI</span>
          </Link>
          <h1 className="text-balance text-4xl font-semibold tracking-normal md:text-6xl">Sign in and protect your speaking streak.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Supabase Auth is ready for Google, email, and mobile OTP flows. Demo mode keeps the prototype open until production keys are set.
          </p>
        </section>
        <Card>
          <CardHeader>
            <CardTitle>Continue learning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" variant="secondary">
              <ShieldCheck /> Continue with Google
            </Button>
            <div className="grid gap-3">
              <Input placeholder="Email address" type="email" />
              <Button asChild className="w-full">
                <Link href="/onboarding">
                  <Mail /> Send magic link
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 border-t border-white/10 pt-4">
              <Input placeholder="+91 mobile number" type="tel" />
              <Button asChild className="w-full" variant="outline">
                <Link href="/onboarding">
                  <MessageCircle /> Send OTP
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
