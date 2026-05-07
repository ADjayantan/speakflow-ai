"use client";

import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleDollarSign,
  Flame,
  Headphones,
  LockKeyhole,
  Mic,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Waveform } from "@/components/shared/waveform";
import { landingFeatures, pricingPlans, pronunciationIssues, roadmap } from "@/lib/mock-data";

const transformations = [
  { name: "Kavin", before: "Translated every sentence", after: "Cleared HR mock interview", score: "+31 fluency" },
  { name: "Nisha", before: "Avoided phone calls", after: "Handles client updates", score: "+24 confidence" },
  { name: "Praveen", before: "Dropped final sounds", after: "Improved American rhythm", score: "+28 pronunciation" },
];

const faqs = [
  {
    question: "Is SpeakFlow AI only for Tamil speakers?",
    answer: "The learning path is optimized for Tamil-native patterns, especially pronunciation and translation habits.",
  },
  {
    question: "Does every lesson require speaking?",
    answer: "Yes. Reading alone never completes a lesson. Each day requires recording, pronunciation attempt, and AI feedback.",
  },
  {
    question: "Will the coach shame users?",
    answer: "No. The tone is strict and performance-focused, but the system avoids toxic pressure and personal shaming.",
  },
  {
    question: "Can this connect to Supabase and OpenAI?",
    answer: "The app is structured for Supabase Auth, PostgreSQL, Whisper transcription, and AI feedback routes.",
  },
];

export function LandingPage() {
  return (
    <main className="overflow-hidden bg-speak-navy text-foreground">
      <HeroSection />
      <FeaturesSection />
      <PronunciationDemoSection />
      <RoadmapSection />
      <TransformationsSection />
      <DailyPreviewSection />
      <PricingSection />
      <FaqSection />
      <FooterCta />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-speak-navy/75 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SpeakFlow AI home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Mic className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-normal">SpeakFlow AI</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#roadmap" className="transition hover:text-foreground">
            90-Day Roadmap
          </a>
          <a href="#pricing" className="transition hover:text-foreground">
            Pricing
          </a>
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/onboarding">
              Start <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[760px] overflow-hidden pt-16 md:min-h-[860px]">
      <Header />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#07111f_0%,#0a1c32_48%,#07111f_100%)]" />
      <div className="noise-mask absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(120deg,rgba(59,130,246,.26),transparent_35%,rgba(16,185,129,.14)_70%,transparent)] opacity-80" />
      <div className="absolute bottom-0 right-0 h-[78%] w-full md:w-[72%]">
        <HeroProductPreview />
      </div>

      <div className="container relative z-10 flex min-h-[700px] items-center pb-24 pt-16 md:min-h-[780px]">
        <div className="max-w-3xl">
          <MotionReveal>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-speak-white md:text-7xl lg:text-8xl">
              Stop Translating. Start Speaking.
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Built specifically for Tamil speakers who want fluent American English in just 90 days.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.16}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Start Your Speaking Journey <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">
                  View Dashboard <TrendingUp />
                </Link>
              </Button>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.24}>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-sm text-muted-foreground">
              {[
                ["90", "days"],
                ["15m", "daily speaking"],
                ["AI", "strict coach"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/12 pl-4">
                  <div className="text-2xl font-semibold text-foreground">{value}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground md:flex">
        <ChevronDown className="h-4 w-4 animate-bounce" />
        Roadmap preview
      </div>
    </section>
  );
}

function HeroProductPreview() {
  return (
    <div className="absolute inset-0 opacity-85 [mask-image:linear-gradient(to_left,black_0%,black_70%,transparent_100%)]">
      <div className="absolute right-[-90px] top-16 w-[820px] rotate-[-3deg] rounded-lg border border-white/10 bg-[#071725]/90 p-4 shadow-[0_40px_140px_rgba(0,0,0,.55)] backdrop-blur-2xl md:right-[-80px] lg:right-[-20px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-sm font-semibold">Today&apos;s Speaking Mission</div>
            <div className="mt-1 text-xs text-muted-foreground">Voice submission required before roadmap unlock</div>
          </div>
          <Badge variant="danger">Strict mode</Badge>
        </div>
        <div className="grid gap-4 pt-4 md:grid-cols-[1fr_280px]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Record 90 seconds</div>
                  <div className="text-xs text-muted-foreground">Topic: Talk about your day without Tamil-first planning</div>
                </div>
              </div>
              <Button size="icon" aria-label="Play demo">
                <Play className="fill-current" />
              </Button>
            </div>
            <Waveform className="mt-5 h-28 rounded-lg border border-primary/20 bg-primary/5" />
            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
              {[
                ["Fluency", "78"],
                ["Pronunciation", "72"],
                ["Filler words", "4"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-muted-foreground">{label}</div>
                  <div className="mt-1 text-xl font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-speak-red/20 bg-speak-red/8 p-4 shadow-coach">
            <div className="flex items-center gap-2 text-sm font-semibold text-speak-red">
              <BellRing className="h-4 w-4" />
              Accountability Coach
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-200">
              You missed 2 speaking sessions this week. Finish the voice task before watching another lesson.
            </p>
            <div className="mt-4 rounded-lg bg-black/20 p-3 text-xs text-muted-foreground">
              Consistency matters more than motivation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative border-y border-white/10 bg-[#08182a] py-24">
      <div className="container">
        <MotionReveal>
          <SectionHeading
            title="Built around daily speaking discipline."
            description="SpeakFlow AI combines a voice-first learning engine, Tamil-specific correction, AI evaluation, and accountable habit loops that make practice hard to ignore."
          />
        </MotionReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {landingFeatures.map((feature, index) => (
            <MotionReveal key={feature.title} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                    {[BrainCircuit, Mic, ShieldCheck, Zap][index] ? (
                      (() => {
                        const Icon = [BrainCircuit, Mic, ShieldCheck, Zap][index];
                        return <Icon className="h-5 w-5" />;
                      })()
                    ) : null}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PronunciationDemoSection() {
  return (
    <section className="bg-speak-navy py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <MotionReveal>
          <SectionHeading
            title="American accent training for Tamil speech patterns."
            description="The trainer compares native playback, shadow speaking, mouth placement, stress timing, and pronunciation heatmaps."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {pronunciationIssues.map((item) => (
              <div key={item.issue} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{item.issue}</div>
                  <Badge variant={item.accuracy < 60 ? "danger" : "warning"}>{item.accuracy}%</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.fix}</p>
              </div>
            ))}
          </div>
        </MotionReveal>
        <MotionReveal delay={0.12}>
          <div className="rounded-lg border border-white/10 bg-[#0a1b2e] p-5 shadow-[0_30px_90px_rgba(0,0,0,.34)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Pronunciation Heatmap</div>
                <div className="mt-1 text-sm text-muted-foreground">Native comparison: “I want to improve my voice.”</div>
              </div>
              <Button size="icon" aria-label="Play native pronunciation">
                <Volume2 />
              </Button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_190px]">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Waveform className="h-36" />
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {["I", "want", "to", "improve", "my", "voice"].map((word, index) => (
                    <span
                      key={word}
                      className={[
                        "rounded-md border px-3 py-1.5 font-semibold",
                        index === 1 || index === 5
                          ? "border-speak-red/35 bg-speak-red/12 text-speak-red"
                          : "border-speak-green/25 bg-speak-green/12 text-speak-green",
                      ].join(" ")}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  ["Stress", "Good", "success"],
                  ["v sound", "Needs work", "danger"],
                  ["Speed", "104 WPM", "default"],
                ].map(([label, value, tone]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
                    <Badge className="mt-3" variant={tone as "success" | "danger" | "default"}>
                      {value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="border-y border-white/10 bg-[#08182a] py-24">
      <div className="container">
        <MotionReveal>
          <SectionHeading
            align="center"
            title="A 90-day roadmap that unlocks only when you speak."
            description="The path moves learners from basic confidence to American rhythm, interview speaking, storytelling, and natural real-world conversation."
          />
        </MotionReveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {roadmap.map((day, index) => (
            <MotionReveal key={day.day} delay={index * 0.05}>
              <div className="relative h-full rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">Day {day.day}</span>
                  <Badge variant={index < 2 ? "success" : index < 4 ? "violet" : "warning"}>{day.phase}</Badge>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-6">{day.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{day.focus}</p>
                <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-xs text-slate-300">
                  <div>Speaking: {day.speaking}</div>
                  <div>Pronunciation: {day.pronunciation}</div>
                  <div>Listening: {day.listening}</div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformationsSection() {
  return (
    <section className="bg-speak-navy py-24">
      <div className="container">
        <MotionReveal>
          <SectionHeading title="Student transformations with measurable speaking proof." />
        </MotionReveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {transformations.map((student, index) => (
            <MotionReveal key={student.name} delay={index * 0.05}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-primary/40 to-speak-green/30 font-bold">
                      {student.name[0]}
                    </div>
                    <Badge variant="success">{student.score}</Badge>
                  </div>
                  <CardTitle>{student.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 text-sm">
                    <div className="rounded-lg border border-speak-red/15 bg-speak-red/8 p-3 text-muted-foreground">{student.before}</div>
                    <div className="rounded-lg border border-speak-green/20 bg-speak-green/10 p-3 text-slate-100">{student.after}</div>
                  </div>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DailyPreviewSection() {
  const tasks = [
    ["15-minute speaking mission", Mic],
    ["Listening exercise", Headphones],
    ["Vocabulary challenge", Sparkles],
    ["Pronunciation practice", Volume2],
    ["AI speaking interaction", BrainCircuit],
    ["Real-life speaking task", Users],
  ];

  return (
    <section className="border-y border-white/10 bg-[#08182a] py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionReveal>
          <SectionHeading
            title="Daily learning feels rewarding, but skipping has consequences."
            description="XP, badges, streaks, freeze days, leaderboard position, and roadmap access all respond to actual voice practice."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge variant="warning">
              <Flame className="mr-1 h-3 w-3" /> 14-day streak
            </Badge>
            <Badge variant="danger">XP penalty enabled</Badge>
            <Badge variant="success">Freeze day available</Badge>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.12}>
          <div className="grid gap-3 sm:grid-cols-2">
            {tasks.map(([task, Icon]) => (
              <div key={task as string} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">{task as string}</span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-speak-navy py-24">
      <div className="container">
        <MotionReveal>
          <SectionHeading
            align="center"
            title="Choose the pressure level that keeps you consistent."
            description="Start free, upgrade for full AI evaluation, or choose premium coaching when daily discipline matters."
          />
        </MotionReveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.05}>
              <Card className={plan.highlighted ? "border-primary/45 bg-primary/10 shadow-glow" : undefined}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.highlighted ? <Badge>Recommended</Badge> : null}
                  </div>
                  <div className="pt-3">
                    <span className="text-4xl font-semibold">{plan.price}</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 text-speak-green" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-7 w-full" variant={plan.highlighted ? "default" : "secondary"}>
                    <CircleDollarSign /> Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-y border-white/10 bg-[#08182a] py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <MotionReveal>
          <SectionHeading title="Questions before the first recording?" />
        </MotionReveal>
        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <MotionReveal key={faq.question} delay={index * 0.04}>
              <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCta() {
  return (
    <footer className="relative overflow-hidden bg-speak-navy py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container">
        <MotionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <h2 className="text-balance text-4xl font-semibold tracking-normal md:text-6xl">
              Make speaking practice non-negotiable.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              SpeakFlow AI keeps learners moving with disciplined coaching, visible progress, and every lesson anchored in voice.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Start Your Speaking Journey <Star />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Open Product Demo</Link>
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </footer>
  );
}
