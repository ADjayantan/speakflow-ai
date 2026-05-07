"use client";

import { ArrowRight, BrainCircuit, Check, Gauge, Mic, Target } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const levels = ["Beginner", "Basic speaker", "Intermediate", "Confident but accented"] as const;
const purposes = ["Jobs", "Travel", "Interviews", "College", "Social speaking"] as const;
const goals = ["10 min/day", "15 min/day", "25 min/day"] as const;

export default function OnboardingPage() {
  const [level, setLevel] = useState<(typeof levels)[number]>("Basic speaker");
  const [purpose, setPurpose] = useState<(typeof purposes)[number]>("Interviews");
  const [goal, setGoal] = useState<(typeof goals)[number]>("15 min/day");
  const [confidence, setConfidence] = useState(42);
  const [pronunciation, setPronunciation] = useState(38);

  const plan = useMemo(() => {
    const intensity = goal === "25 min/day" ? "Intensive" : goal === "15 min/day" ? "Balanced" : "Starter";
    return {
      intensity,
      speakingMinutes: goal.split(" ")[0],
      focus:
        purpose === "Interviews"
          ? "HR answers, storytelling, confidence, and American rhythm"
          : purpose === "Jobs"
            ? "Office communication, client updates, and meeting speech"
            : purpose === "Travel"
              ? "Airport, hotel, ordering, and help-seeking scenarios"
              : "Natural daily conversation without Tamil-to-English translation",
      pronunciationFocus: pronunciation < 50 ? "v/w, z sound, ending consonants" : "stress timing and connected speech",
      confidenceFocus: confidence < 50 ? "short daily wins and mandatory voice check-ins" : "longer responses and real conversation speed",
    };
  }, [confidence, goal, pronunciation, purpose]);

  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#07111f,#081a2e_52%,#07111f)] px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Mic className="h-5 w-5" />
            </span>
            <span className="font-semibold">SpeakFlow AI</span>
          </Link>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Skip to Demo</Link>
          </Button>
        </header>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Badge variant="default">Personalized setup</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-normal md:text-6xl">
              Build your 90-day fluency plan before the first recording.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The roadmap adapts to current English level, pronunciation confidence, daily learning goal, speaking confidence, and target purpose.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Onboarding questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ChoiceGroup title="Current English level" value={level} values={levels} onChange={setLevel} />
              <ChoiceGroup title="Target purpose" value={purpose} values={purposes} onChange={setPurpose} />
              <ChoiceGroup title="Daily learning goal" value={goal} values={goals} onChange={setGoal} />
              <Slider title="Speaking confidence" value={confidence} onChange={setConfidence} />
              <Slider title="Pronunciation confidence" value={pronunciation} onChange={setPronunciation} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 pb-14 lg:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>Generated roadmap profile</CardTitle>
                <Badge variant="success">{plan.intensity}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <PlanItem icon={Target} title="Daily targets" items={[`${plan.speakingMinutes} speaking`, "10 vocabulary words", "8 minutes listening", "1 pronunciation drill"]} />
              <PlanItem icon={BrainCircuit} title="Main focus" items={[plan.focus, plan.pronunciationFocus]} />
              <PlanItem icon={Gauge} title="Coach pressure" items={[plan.confidenceFocus, "Strict reminders after missed voice practice"]} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ready to unlock Day 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                Your first task requires a voice submission. Roadmap progression, XP, and streak protection begin only after speaking.
              </p>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/dashboard">
                  Enter Dashboard <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function ChoiceGroup<T extends string>({
  title,
  value,
  values,
  onChange,
}: {
  title: string;
  value: T;
  values: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <button
            key={item}
            className={[
              "rounded-lg border px-3 py-2 text-sm font-semibold transition",
              item === value ? "border-primary bg-primary/15 text-primary" : "border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground",
            ].join(" ")}
            onClick={() => onChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ title, value, onChange }: { title: string; value: number; onChange: (value: number) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm font-semibold">
        <span>{title}</span>
        <span>{value}%</span>
      </div>
      <input
        aria-label={title}
        className="h-2 w-full accent-blue-500"
        max={100}
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
      <Progress value={value} className="mt-3" />
    </div>
  );
}

function PlanItem({ icon: Icon, title, items }: { icon: typeof Target; title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-1 h-4 w-4 text-speak-green" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
