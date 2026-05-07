import { ok } from "@/lib/api";

export function GET() {
  return ok({
    channels: ["in-app", "push", "email"],
    reminders: [
      {
        type: "speaking-reminder",
        schedule: "08:00",
        message: "Submit your daily speaking task before consuming lessons.",
      },
      {
        type: "pronunciation-practice",
        schedule: "14:00",
        message: "Repeat your v/w and ending-consonant drill.",
      },
      {
        type: "inactivity-warning",
        schedule: "20:30",
        message: "Your streak is at risk. Record 90 seconds before midnight.",
      },
    ],
    productionNote: "Use Vercel Cron or Supabase Edge Functions for scheduled fan-out; do not depend on a sleeping free-tier server.",
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return ok({
    queued: true,
    notification: body,
    delivery: {
      inApp: true,
      push: Boolean(body.pushToken),
      email: Boolean(body.email),
    },
  });
}
