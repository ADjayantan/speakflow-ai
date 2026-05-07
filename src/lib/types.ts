export type SkillMetric = {
  label: string;
  value: number;
  delta: string;
  tone: "blue" | "green" | "amber" | "red" | "violet";
};

export type DailyTask = {
  id: string;
  title: string;
  duration: string;
  type: "speaking" | "listening" | "vocabulary" | "pronunciation" | "conversation";
  required: boolean;
  xp: number;
  status: "locked" | "ready" | "complete";
  prompt: string;
};

export type RoadmapDay = {
  day: number;
  phase: "Foundation" | "Fluency" | "Natural Speech";
  title: string;
  focus: string;
  speaking: string;
  pronunciation: string;
  listening: string;
};

export type CoachInsight = {
  title: string;
  message: string;
  severity: "discipline" | "warning" | "progress";
};

export type WeeklyReport = {
  consistencyScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  nextWeekFocus: string[];
};

export type ConversationAvatar = {
  name: string;
  role: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  openingLine: string;
};
