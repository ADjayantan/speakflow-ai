import { ok } from "@/lib/api";
import { roadmap } from "@/lib/mock-data";

export function GET() {
  return ok({
    phases: [
      {
        name: "Phase 1",
        days: "1-30",
        goal: "Build confidence and basic speaking habits",
      },
      {
        name: "Phase 2",
        days: "31-60",
        goal: "Improve fluency and pronunciation",
      },
      {
        name: "Phase 3",
        days: "61-90",
        goal: "Natural fluent communication",
      },
    ],
    sampleDays: roadmap,
  });
}
