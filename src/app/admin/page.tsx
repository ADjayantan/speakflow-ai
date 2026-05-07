import { Activity, BarChart3, BrainCircuit, Database, Upload, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminCards = [
  ["Manage lessons", "Upload reels-style clips, pronunciation drills, quizzes, and daily speaking tasks.", Upload],
  ["Monitor users", "Track streak risk, missed sessions, leaderboard drops, and consistency ranks.", Users],
  ["AI usage", "Audit transcription, TTS, speaking evaluation, and weekly report generation costs.", BrainCircuit],
  ["Analytics", "Review lesson completion, vocabulary growth, pronunciation changes, and confidence scores.", BarChart3],
  ["Database", "Supabase tables, RLS policies, notification logs, subscriptions, and AI feedback records.", Database],
  ["Operations", "Render/Vercel health, PWA status, push notification delivery, and background job strategy.", Activity],
] as const;

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#07111f,#081a2e_52%,#07111f)] px-4 py-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <Badge variant="danger">Admin panel</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">Content and accountability operations</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Manage lessons, assign daily tasks, monitor users, control leaderboards, and track AI evaluation cost from one operational surface.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </header>
        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
          {adminCards.map(([title, description, Icon]) => (
            <Card key={title}>
              <CardHeader>
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
