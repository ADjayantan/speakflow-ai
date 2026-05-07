import { ok } from "@/lib/api";

export function GET() {
  return ok({
    status: "OK",
    service: "SpeakFlow AI",
    deployment: "stateless REST API for Vercel",
    timestamp: new Date().toISOString(),
  });
}
