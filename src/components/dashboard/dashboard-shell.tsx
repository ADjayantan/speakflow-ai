"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  BellRing,
  BookOpenCheck,
  CalendarCheck,
  Flame,
  Gauge,
  Headphones,
  Home,
  LineChart,
  Lock,
  Mic,
  MessageSquareText,
  Play,
  Repeat2,
  ShieldAlert,
  Sparkles,
  Target,
  Trophy,
  UserRoundCheck,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FloatingMic } from "@/components/shared/floating-mic";
import { ProgressRing } from "@/components/shared/progress-ring";
import { Waveform } from "@/components/shared/waveform";
import { coachInsights, conversationAvatars, dailyTasks, pronunciationIssues, skillMetrics, weeklyReport } from "@/lib/mock-data";
import { getConsistencyRank, getPenaltyPlan } from "@/lib/scoring";
import { useLearningStore } from "@/store/learning-store";

const weekData = [
  { day: "Mon", speaking: 16, pronunciation: 78, listening: 12 },
  { day: "Tue", speaking: 18, pronunciation: 80, listening: 10 },
  { day: "Wed", speaking: 0, pronunciation: 67, listening: 4 },
  { day: "Thu", speaking: 21, pronunciation: 74, listening: 13 },
  { day: "Fri", speaking: 14, pronunciation: 72, listening: 8 },
  { day: "Sat", speaking: 0, pronunciation: 63, listening: 5 },
  { day: "Sun", speaking: 19, pronunciation: 76, listening: 14 },
];

const heatmap = [
  1, 1, 0.8, 0.7, 1, 0.4, 1, 1, 0.9, 0, 0.8, 1, 1, 0.7, 0.6, 1, 0.9, 0.3, 1, 1, 0.8, 1, 0.7, 0.5, 1, 0.9, 1, 0.6,
];

const modules = [
  { title: "AI Speaking Practice", icon: Mic, progress: 72, locked: false, href: "/practice" },
  { title: "Accent Trainer", icon: Volume2, progress: 61, locked: false },
  { title: "Vocabulary Builder", icon: Sparkles, progress: 54, locked: false },
  { title: "Listening Practice", icon: Headphones, progress: 81, locked: false },
  { title: "Daily Challenge", icon: Target, progress: 38, locked: false },
  { title: "Grammar Fixer", icon: BookOpenCheck, progress: 46, locked: false },
  { title: "Shadowing Practice", icon: Repeat2, progress: 68, locked: false },
  { title: "Conversation Simulator", icon: MessageSquareText, progress: 33, locked: true },
  { title: "Progress Analytics", icon: BarChart3, progress: 84, locked: false },
];

export function DashboardShell() {
  const { recording, submittedToday, streak, xp, startRecording, stopRecording, submitVoiceTask, applySkipPenalty } =
    useLearningStore();
  const penalty = getPenaltyPlan(2);
  const rank = getConsistencyRank(weeklyReport.consistencyScore);

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#07111f,#081a2e_52%,#07111f)] text-foreground">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <TopBar streak={streak} xp={xp} />
          <div className="container max-w-[1500px] py-6 lg:py-8">
            <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <div className="space-y-5">
                <HeroAccountability
                  recording={recording}
                  submittedToday={submittedToday}
                  onStart={startRecording}
                  onStop={stopRecording}
                  onSubmit={submitVoiceTask}
                  onPenalty={applySkipPenalty}
                />
                <StatsGrid />
                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <TodayTasks />
                  <SpeakingAnalytics />
                </div>
                <ModuleGrid />
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <PronunciationRepair />
                  <WeeklyReportPanel rank={rank} />
                </div>
              </div>
              <aside className="space-y-5">
                <CoachPanel penalty={penalty} />
                <ConsistencyPanel rank={rank} />
                <ReminderPanel />
                <ConversationPanel />
              </aside>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <FloatingMic />
    </div>
  );
}

function Sidebar() {
  const items = [
    ["Dashboard", Home, "/dashboard"],
    ["Roadmap", Target, "/roadmap"],
    ["Speaking", Mic, "/practice"],
    ["Accent", Volume2, "/dashboard#accent"],
    ["Reports", LineChart, "/dashboard#reports"],
    ["Admin", ShieldAlert, "/admin"],
  ] as const;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-white/10 bg-black/18 p-5 backdrop-blur-2xl lg:block">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
          <Mic className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold">SpeakFlow AI</span>
      </Link>
      <nav className="mt-8 space-y-1">
        {items.map(([label, Icon, href], index) => (
          <Link
            key={label}
            href={href}
            className={[
              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition",
              index === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/8 hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-8 rounded-lg border border-speak-amber/20 bg-speak-amber/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-speak-amber">
          <Flame className="h-4 w-4" />
          Streak protection
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          One freeze day remains. Use it only when you cannot submit voice.
        </p>
      </div>
    </aside>
  );
}

function TopBar({ streak, xp }: { streak: number; xp: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-speak-navy/82 backdrop-blur-2xl">
      <div className="container flex h-16 max-w-[1500px] items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Day 42 / 90</div>
          <h1 className="truncate text-lg font-semibold">Today: American rhythm and shadowing discipline</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">
            <Flame className="mr-1 h-3 w-3" />
            {streak} streak
          </Badge>
          <Badge variant="success">
            <Trophy className="mr-1 h-3 w-3" />
            {xp.toLocaleString()} XP
          </Badge>
        </div>
      </div>
    </header>
  );
}

function HeroAccountability({
  recording,
  submittedToday,
  onStart,
  onStop,
  onSubmit,
  onPenalty,
}: {
  recording: boolean;
  submittedToday: boolean;
  onStart: () => void;
  onStop: () => void;
  onSubmit: () => void;
  onPenalty: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[0_28px_90px_rgba(0,0,0,.28)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/10 via-primary to-speak-green/30" />
      <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={submittedToday ? "success" : "danger"}>{submittedToday ? "Voice submitted" : "Voice required"}</Badge>
            <Badge variant="warning">Roadmap unlock depends on speaking</Badge>
          </div>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-normal md:text-5xl">
            Complete your daily speaking task before consuming more lessons.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Record a focused 90-second answer. The AI coach will check fluency, grammar, filler words, Tamil accent influence, hesitation,
            speaking speed, and pronunciation repetition.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button onClick={recording ? onStop : onStart} size="lg" variant={recording ? "danger" : "default"}>
              {recording ? <Activity /> : <Mic />}
              {recording ? "Stop Recording" : "Start Voice Check-in"}
            </Button>
            <Button onClick={onSubmit} size="lg" variant="success">
              <CalendarCheck />
              Submit Today
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/practice">
                <Mic />
                Open Speaking Lab
              </Link>
            </Button>
            <Button onClick={onPenalty} size="lg" variant="secondary">
              Apply Skip Demo
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-primary/20 bg-[#071725]/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Live voice analysis</div>
              <div className="text-xs text-muted-foreground">Whisper transcript and AI scoring route ready</div>
            </div>
            <Button size="icon" aria-label="Play sample audio">
              <Play className="fill-current" />
            </Button>
          </div>
          <Waveform active={recording} className="mt-4 rounded-lg border border-primary/20 bg-primary/5" />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              ["Speed", "104 WPM"],
              ["Fillers", "4"],
              ["Confidence", "69"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="text-muted-foreground">{label}</div>
                <div className="mt-1 font-semibold text-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {skillMetrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="p-4">
            <div className="text-xs font-medium text-muted-foreground">{metric.label}</div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <div className="text-3xl font-semibold">{metric.value}</div>
              <Badge variant={metric.tone === "red" ? "danger" : metric.tone === "amber" ? "warning" : metric.tone === "green" ? "success" : metric.tone === "violet" ? "violet" : "default"}>
                {metric.delta}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function TodayTasks() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Today&apos;s Task Engine</CardTitle>
          <Badge variant="danger">Mandatory speaking first</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {dailyTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{task.title}</h3>
                {task.required ? <Badge variant="danger">Required</Badge> : null}
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{task.prompt}</p>
            </div>
            <div className="text-right text-sm">
              <div className="font-semibold text-speak-green">+{task.xp} XP</div>
              <div className="text-muted-foreground">{task.duration}</div>
              {task.id === "voice-checkin" ? (
                <Button asChild className="mt-3" size="sm" variant="outline">
                  <Link href="/practice">Start</Link>
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SpeakingAnalytics() {
  return (
    <Card id="speaking">
      <CardHeader>
        <CardTitle>Weekly Speaking Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekData} margin={{ left: -25, right: 10, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="speakingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(248,250,252,0.55)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(248,250,252,0.55)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#071725", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8 }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Area type="monotone" dataKey="speaking" stroke="#3b82f6" strokeWidth={3} fill="url(#speakingFill)" />
              <Line type="monotone" dataKey="listening" stroke="#10b981" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard key={module.title} module={module} />
      ))}
    </section>
  );
}

function ModuleCard({ module }: { module: (typeof modules)[number] }) {
  const content = (
    <>
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary">
        <module.icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold">{module.title}</h3>
          {module.locked ? <Lock className="h-3.5 w-3.5 text-speak-amber" /> : null}
        </div>
        <Progress value={module.progress} className="mt-3" />
      </div>
    </>
  );

  if ("href" in module && module.href) {
    return (
      <Link className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/8 p-4 transition hover:bg-primary/12" href={module.href}>
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">{content}</div>;
}

function PronunciationRepair() {
  return (
    <Card id="accent">
      <CardHeader>
        <CardTitle>Tamil-Specific Accent Repair</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pronunciationIssues.map((issue) => (
          <div key={issue.issue} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="font-semibold">{issue.issue}</div>
              <Badge variant={issue.accuracy < 60 ? "danger" : "warning"}>{issue.accuracy}%</Badge>
            </div>
            <Progress value={issue.accuracy} className="mt-3" indicatorClassName={issue.accuracy < 60 ? "bg-speak-red" : "bg-speak-amber"} />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{issue.fix}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function WeeklyReportPanel({ rank }: { rank: string }) {
  return (
    <Card id="reports">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Weekly AI Performance Report</CardTitle>
          <Badge variant="success">{rank}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[170px_1fr]">
          <ProgressRing value={weeklyReport.consistencyScore} label="Consistency" tone="blue" />
          <div className="grid gap-4">
            <ReportList title="Strengths" items={weeklyReport.strengths} tone="success" />
            <ReportList title="Weaknesses" items={weeklyReport.weaknesses} tone="warning" />
            <ReportList title="Next week focus" items={weeklyReport.nextWeekFocus} tone="default" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportList({ title, items, tone }: { title: string; items: string[]; tone: "success" | "warning" | "default" }) {
  return (
    <div>
      <Badge variant={tone}>{title}</Badge>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoachPanel({ penalty }: { penalty: ReturnType<typeof getPenaltyPlan> }) {
  return (
    <Card className="border-speak-red/25 bg-speak-red/8 shadow-coach">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-speak-red">
            <ShieldAlert className="h-5 w-5" />
            AI Accountability Coach
          </CardTitle>
          <Badge variant="danger">Strict</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {coachInsights.map((insight) => (
          <div key={insight.title} className="rounded-lg border border-white/10 bg-black/18 p-4">
            <div className="font-semibold">{insight.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{insight.message}</p>
          </div>
        ))}
        <div className="rounded-lg border border-speak-amber/25 bg-speak-amber/10 p-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-speak-amber">
            <AlertTriangle className="h-4 w-4" />
            Skip penalty preview
          </div>
          <div className="mt-3 grid gap-2 text-muted-foreground">
            <span>XP adjustment: {penalty.xpAdjustment}</span>
            <span>Roadmap delay: {penalty.roadmapDelayDays} days</span>
            <span>Leaderboard: {penalty.leaderboardImpact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConsistencyPanel({ rank }: { rank: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Consistency Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid place-items-center">
          <ProgressRing value={weeklyReport.consistencyScore} label="Score" size={150} tone="green" />
          <div className="mt-4 text-center">
            <div className="text-xl font-semibold">{rank}</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Based on daily practice, speaking minutes, lesson completion, listening, and pronunciation exercises.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1">
          {heatmap.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="h-8 rounded-[6px] border border-white/5"
              style={{ background: value === 0 ? "rgba(255,255,255,.05)" : `rgba(16,185,129,${0.15 + value * 0.65})` }}
              title={`Day ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReminderPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-speak-amber" />
          Smart Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          ["8:00 AM", "Speaking reminder", "push"],
          ["2:00 PM", "Pronunciation practice", "in-app"],
          ["8:30 PM", "Inactivity warning", "email"],
        ].map(([time, title, channel]) => (
          <div key={title} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <div>
              <div className="font-semibold">{title}</div>
              <div className="text-xs text-muted-foreground">{time}</div>
            </div>
            <Badge variant={channel === "email" ? "warning" : "default"}>{channel}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ConversationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRoundCheck className="h-5 w-5 text-speak-green" />
          Conversation Avatars
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {conversationAvatars.map((avatar) => (
          <div key={avatar.name} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{avatar.name}</div>
                <div className="text-sm text-muted-foreground">{avatar.role}</div>
              </div>
              <Badge variant={avatar.difficulty === "Advanced" ? "danger" : avatar.difficulty === "Intermediate" ? "warning" : "success"}>
                {avatar.difficulty}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{avatar.openingLine}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-speak-navy/90 backdrop-blur-2xl lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {[
          [Home, "Home"],
          [Target, "Goals"],
          [Mic, "Speak"],
          [Volume2, "Accent"],
          [BarChart3, "Stats"],
        ].map(([Icon, label]) => (
          <button key={label as string} className="grid place-items-center text-xs font-semibold text-muted-foreground">
            <Icon className="h-5 w-5" />
            <span>{label as string}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
