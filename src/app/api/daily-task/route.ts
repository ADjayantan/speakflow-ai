import { dailyTasks } from "@/lib/mock-data";
import { ok } from "@/lib/api";

export function GET() {
  return ok({
    date: new Date().toISOString().slice(0, 10),
    mandatoryVoiceSubmission: true,
    tasks: dailyTasks,
    completionRule: "A lesson is complete only after speaking attempt, voice recording, pronunciation check, and AI evaluation.",
  });
}
