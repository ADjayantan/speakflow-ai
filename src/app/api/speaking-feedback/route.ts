import { fail, ok } from "@/lib/api";
import { detectWeakHabits } from "@/lib/scoring";

type SpeakingFeedbackBody = {
  transcript?: string;
  durationSeconds?: number;
  lessonId?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SpeakingFeedbackBody | null;

  if (!body?.transcript) {
    return fail("Transcript is required. Upload voice to Whisper first, then send transcript for scoring.", 422);
  }

  const habits = detectWeakHabits(body.transcript, body.durationSeconds ?? 90);
  const pronunciationPenalty = habits.repeatedWords > 1 ? 8 : 0;
  const fillerPenalty = Math.min(16, habits.fillerWords * 3);
  const speedPenalty = habits.wordsPerMinute < 95 ? 10 : 0;
  const fluencyScore = Math.max(40, 88 - fillerPenalty - speedPenalty);
  const pronunciationScore = Math.max(35, 82 - pronunciationPenalty);

  return ok({
    lessonId: body.lessonId ?? "demo-speaking-task",
    transcript: body.transcript,
    scores: {
      pronunciation: pronunciationScore,
      fluency: fluencyScore,
      grammar: 78,
      confidence: habits.wordsPerMinute >= 100 ? 74 : 62,
      hesitation: Math.min(100, habits.fillerWords * 12 + habits.repeatedWords * 8),
      speakingSpeedWpm: habits.wordsPerMinute,
    },
    tamilAccentSignals: ["Check v/w separation", "Finish ending consonants", "Keep z voiced"],
    weakHabits: habits,
    coachMessage:
      habits.fillerWords > 2
        ? "You are using filler words when pressure rises. Pause silently, then finish the sentence cleanly."
        : "Good control. Repeat the same answer with stronger ending consonants.",
  });
}
