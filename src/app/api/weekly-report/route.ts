import { ok } from "@/lib/api";
import { weeklyReport } from "@/lib/mock-data";
import { getConsistencyRank } from "@/lib/scoring";

export function GET() {
  return ok({
    ...weeklyReport,
    rank: getConsistencyRank(weeklyReport.consistencyScore),
    generatedAt: new Date().toISOString(),
  });
}
