import type { CoachInsight, ConversationAvatar, DailyTask, RoadmapDay, SkillMetric, WeeklyReport } from "@/lib/types";

export const landingFeatures = [
  {
    title: "Tamil-native pronunciation repair",
    description: "Target v/w, z sounds, ending consonants, stress timing, and silent-letter patterns without making learners depend on translation.",
  },
  {
    title: "Mandatory speaking in every lesson",
    description: "Each learning unit requires voice recording, pronunciation attempt, AI evaluation, and a clear retry path.",
  },
  {
    title: "Strict accountability coach",
    description: "A supportive but disciplined mentor spots skipped practice, weak habits, and progress drops before motivation disappears.",
  },
  {
    title: "90-day fluency roadmap",
    description: "Daily speaking, listening, vocabulary, pronunciation, quiz, conversation, and fluency exercises progress in three focused phases.",
  },
];

export const roadmap: RoadmapDay[] = [
  {
    day: 1,
    phase: "Foundation",
    title: "Stop translating short answers",
    focus: "Think in simple English chunks",
    speaking: "Introduce yourself in 45 seconds",
    pronunciation: "v vs w minimal pairs",
    listening: "Slow native greeting clips",
  },
  {
    day: 18,
    phase: "Foundation",
    title: "Daily conversation confidence",
    focus: "Sentence formation under time pressure",
    speaking: "Order food without Tamil-first planning",
    pronunciation: "Ending consonants",
    listening: "Restaurant and shop phrases",
  },
  {
    day: 42,
    phase: "Fluency",
    title: "American rhythm and speed",
    focus: "Shadowing and stress timing",
    speaking: "2-minute opinion answer",
    pronunciation: "Word stress and reductions",
    listening: "Fast casual conversation",
  },
  {
    day: 67,
    phase: "Natural Speech",
    title: "Interview-grade speaking",
    focus: "Storytelling, confidence, and clarity",
    speaking: "STAR answer with AI interviewer",
    pronunciation: "Accent polish on weak sounds",
    listening: "HR and office scenarios",
  },
  {
    day: 90,
    phase: "Natural Speech",
    title: "Fluent performance check",
    focus: "Natural response without translation",
    speaking: "5-minute final fluency recording",
    pronunciation: "Native comparison replay",
    listening: "Full-speed conversation",
  },
];

export const dailyTasks: DailyTask[] = [
  {
    id: "voice-checkin",
    title: "Mandatory voice check-in",
    duration: "3 min",
    type: "speaking",
    required: true,
    xp: 80,
    status: "ready",
    prompt: "Speak about your day without switching to Tamil for 90 seconds.",
  },
  {
    id: "shadowing",
    title: "American shadowing drill",
    duration: "5 min",
    type: "pronunciation",
    required: true,
    xp: 60,
    status: "ready",
    prompt: "Repeat the native audio and match stress, rhythm, and final consonants.",
  },
  {
    id: "listen-repeat",
    title: "Native listening replay",
    duration: "4 min",
    type: "listening",
    required: false,
    xp: 40,
    status: "ready",
    prompt: "Listen to the coffee shop dialogue and answer with natural short phrases.",
  },
  {
    id: "vocab-active",
    title: "Active vocabulary use",
    duration: "3 min",
    type: "vocabulary",
    required: false,
    xp: 35,
    status: "ready",
    prompt: "Use five job-interview words in your own spoken sentences.",
  },
];

export const skillMetrics: SkillMetric[] = [
  { label: "Speaking score", value: 78, delta: "+8 this week", tone: "blue" },
  { label: "Pronunciation", value: 72, delta: "-3 after missed drill", tone: "amber" },
  { label: "Listening", value: 81, delta: "+6", tone: "green" },
  { label: "Confidence", value: 69, delta: "+11", tone: "violet" },
  { label: "Vocabulary", value: 64, delta: "+42 words", tone: "green" },
  { label: "Consistency", value: 84, delta: "Active streak", tone: "blue" },
];

export const coachInsights: CoachInsight[] = [
  {
    title: "Missed-session pattern",
    message: "You missed 2 speaking sessions this week. Recover today with a 5-minute voice submission.",
    severity: "discipline",
  },
  {
    title: "Pronunciation drop",
    message: "Your pronunciation score dropped because you skipped shadowing practice.",
    severity: "warning",
  },
  {
    title: "Performance truth",
    message: "Consistency matters more than motivation. Finish the speaking task before reading another lesson.",
    severity: "progress",
  },
];

export const weeklyReport: WeeklyReport = {
  consistencyScore: 84,
  confidenceScore: 69,
  strengths: ["Daily check-ins improved response confidence", "Vocabulary recall is faster in job scenarios", "Listening accuracy rose on native-speed clips"],
  weaknesses: ["Final consonants disappear in longer sentences", "Filler words increase after 90 seconds", "Shadowing practice was skipped twice"],
  nextWeekFocus: ["5-minute daily monologue", "v/w and z sound repair", "Interview answer rhythm"],
};

export const conversationAvatars: ConversationAvatar[] = [
  {
    name: "Maya",
    role: "American friend",
    difficulty: "Beginner",
    openingLine: "Tell me what you did today, but keep it natural.",
  },
  {
    name: "Jordan",
    role: "HR interviewer",
    difficulty: "Advanced",
    openingLine: "Walk me through a challenge you solved at work or college.",
  },
  {
    name: "Casey",
    role: "Coffee shop employee",
    difficulty: "Intermediate",
    openingLine: "What can I get started for you today?",
  },
  {
    name: "Avery",
    role: "Airport officer",
    difficulty: "Intermediate",
    openingLine: "What is the purpose of your visit?",
  },
];

export const pronunciationIssues = [
  { issue: "v vs w", accuracy: 62, fix: "Upper teeth touch lower lip for v. Round lips for w." },
  { issue: "z sound", accuracy: 58, fix: "Keep voice vibrating. Do not replace it with s." },
  { issue: "Ending consonants", accuracy: 54, fix: "Finish words like went, asked, and job clearly." },
  { issue: "Stress timing", accuracy: 70, fix: "Punch content words and reduce filler words." },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Start with daily habit checks and limited pronunciation feedback.",
    features: ["Daily task preview", "3 AI evaluations/week", "Basic streaks", "Community leaderboard"],
  },
  {
    name: "Pro",
    price: "$12",
    description: "Full 90-day roadmap with advanced pronunciation and fluency tracking.",
    features: ["Unlimited voice submissions", "Accent trainer", "Weekly AI reports", "Smart reminders", "Vocabulary SRS"],
    highlighted: true,
  },
  {
    name: "Premium AI Coach",
    price: "$29",
    description: "Strict daily coaching, deep habit detection, and realistic performance review.",
    features: ["Everything in Pro", "AI conversation avatars", "Personal accountability coach", "Interview simulator", "Priority analysis"],
  },
];
