import { ok } from "@/lib/api";

export function GET() {
  return ok({
    authenticated: false,
    demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
    providers: ["google", "email_magic_link", "mobile_otp"],
    auth: "Supabase Auth-ready. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for production.",
  });
}
