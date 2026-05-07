export type ConsistencyInputs = {
  dailyPracticeRate: number;
  speakingMinutesRate: number;
  lessonCompletionRate: number;
  listeningActivityRate: number;
  pronunciationExerciseRate: number;
};

const weights = {
  dailyPracticeRate: 0.32,
  speakingMinutesRate: 0.24,
  lessonCompletionRate: 0.16,
  listeningActivityRate: 0.12,
  pronunciationExerciseRate: 0.16,
} satisfies Record<keyof ConsistencyInputs, number>;

export function calculateConsistencyScore(inputs: ConsistencyInputs) {
  const score = Object.entries(weights).reduce((total, [key, weight]) => {
    const value = inputs[key as keyof ConsistencyInputs];
    return total + Math.max(0, Math.min(100, value)) * weight;
  }, 0);

  return Math.round(score);
}

export function getConsistencyRank(score: number) {
  if (score >= 92) return "Elite Speaker";
  if (score >= 78) return "Fluent Performer";
  if (score >= 62) return "Consistent Speaker";
  if (score >= 42) return "Active Learner";
  return "Beginner";
}

export function getPenaltyPlan(missedDays: number) {
  if (missedDays <= 0) {
    return {
      xpAdjustment: 0,
      roadmapDelayDays: 0,
      leaderboardImpact: "No penalty",
      recoveryTask: "Complete today's speaking mission to protect the streak.",
    };
  }

  return {
    xpAdjustment: -Math.min(180, missedDays * 35),
    roadmapDelayDays: Math.min(4, Math.ceil(missedDays / 2)),
    leaderboardImpact: missedDays > 2 ? "High drop risk" : "Small drop risk",
    recoveryTask:
      missedDays > 2
        ? "Record a 5-minute recovery monologue and repeat the weak pronunciation drill."
        : "Submit a 2-minute streak recovery recording before midnight.",
  };
}

export function detectWeakHabits(transcript: string, seconds: number) {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const fillerWords = words.filter((word) => /^(um+|uh+|like|actually|basically)$/i.test(word)).length;
  const wordsPerMinute = seconds > 0 ? Math.round((words.length / seconds) * 60) : 0;
  const repeatedWords = words.filter((word, index) => index > 0 && word.toLowerCase() === words[index - 1]?.toLowerCase()).length;

  return {
    fillerWords,
    wordsPerMinute,
    repeatedWords,
    recommendations: [
      fillerWords > 2 ? "Pause silently instead of using filler words." : "Filler-word control is improving.",
      wordsPerMinute < 95 ? "Use shadowing practice to lift speaking speed toward 110-130 WPM." : "Speaking speed is in a useful range.",
      repeatedWords > 1 ? "Repeat the sentence once cleanly after every hesitation." : "Repetition pattern looks controlled.",
    ],
  };
}
