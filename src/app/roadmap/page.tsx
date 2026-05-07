import { Flame, Lock, Mic, Volume2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { roadmap } from "@/lib/mock-data";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#07111f,#081a2e_52%,#07111f)] px-4 py-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <Badge variant="warning">
              <Flame className="mr-1 h-3 w-3" />
              Day 42 active
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">90-Day Roadmap</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Every day includes speaking, listening, vocabulary, pronunciation drill, mini quiz, AI conversation, and fluency exercise.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </header>

        <section className="grid gap-5 py-8 lg:grid-cols-3">
          {[
            ["Phase 1", "Days 1-30", "Build confidence and reduce Tamil translation dependency", 100],
            ["Phase 2", "Days 31-60", "Improve fluency, American pronunciation, and listening comprehension", 42],
            ["Phase 3", "Days 61-90", "Natural fluent communication, interviews, storytelling, accent polish", 0],
          ].map(([phase, days, description, value]) => (
            <Card key={phase as string}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{phase}</CardTitle>
                  <Badge variant={Number(value) === 0 ? "muted" : Number(value) === 100 ? "success" : "default"}>{days}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                <Progress value={Number(value)} className="mt-5" />
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          {roadmap.map((day, index) => (
            <div key={day.day} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <div className="flex items-center justify-between">
                <Badge variant={index <= 2 ? "success" : "muted"}>Day {day.day}</Badge>
                {index > 2 ? <Lock className="h-4 w-4 text-speak-amber" /> : null}
              </div>
              <h2 className="mt-5 text-lg font-semibold">{day.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{day.focus}</p>
              <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="flex gap-2">
                  <Mic className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{day.speaking}</span>
                </div>
                <div className="flex gap-2">
                  <Volume2 className="mt-0.5 h-4 w-4 text-speak-green" />
                  <span>{day.pronunciation}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
