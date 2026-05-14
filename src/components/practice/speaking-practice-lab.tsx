"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  BrainCircuit,
  Check,
  CircleAlert,
  Clock,
  Flame,
  Gauge,
  Headphones,
  Mic,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProgressRing } from "@/components/shared/progress-ring";
import { Waveform } from "@/components/shared/waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useLearningStore } from "@/store/learning-store";

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type FeedbackData = {
  lessonId: string;
  transcript: string;
  scores: {
    pronunciation: number;
    fluency: number;
    grammar: number;
    confidence: number;
    hesitation: number;
    speakingSpeedWpm: number;
  };
  tamilAccentSignals: string[];
  weakHabits: {
    fillerWords: number;
    wordsPerMinute: number;
    repeatedWords: number;
    recommendations: string[];
  };
  coachMessage: string;
};

type FeedbackResponse = {
  ok: boolean;
  data?: FeedbackData;
  error?: string;
};

const practicePrompt =
  "Speak for 90 seconds: Tell an American friend what you did today. Do not translate from Tamil word by word. Use short, natural English sentences.";

const demoTranscript =
  "Um I want to improve my voice because I want to speak with clients confidently. Yesterday I practiced pronunciation but I skipped shadowing. I feel nervous when I speak fast, so I want to become more natural.";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const speechWindow = window as Window &
    typeof globalThis & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

export function SpeakingPracticeLab() {
  const [status, setStatus] = useState<"idle" | "recording" | "analyzing" | "complete">("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState(demoTranscript);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const submitVoiceTask = useLearningStore((state) => state.submitVoiceTask);
  const chunksRef = useRef<BlobPart[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const readiness = useMemo(
    () => [
      { label: "Voice recording attempted", done: Boolean(audioUrl) || seconds > 0 },
      { label: "Transcript captured or edited", done: transcript.trim().length > 24 },
      { label: "AI evaluation received", done: Boolean(feedback) },
      { label: "Daily task can unlock roadmap", done: completed },
    ],
    [audioUrl, completed, feedback, seconds, transcript],
  );

  useEffect(() => {
    return () => {
      stopTimer();
      stopMedia();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function stopMedia() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function startRecording() {
    setError(null);
    setFeedback(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("This browser does not expose microphone recording. You can still paste a transcript and run AI evaluation.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stopTimer();
        stopMedia();
        setStatus("idle");
      };

      const Recognition = getSpeechRecognition();
      if (Recognition) {
        const recognition = new Recognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
          let combined = "";
          for (let index = 0; index < event.results.length; index += 1) {
            combined += event.results[index][0].transcript;
          }
          if (combined.trim()) setTranscript(combined.trim());
        };
        recognition.onerror = () => undefined;
        recognitionRef.current = recognition;
        recognition.start();
      }

      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((value) => value + 1), 1000);
      recorder.start();
      setStatus("recording");
    } catch {
      setError("Microphone permission was blocked or unavailable. Paste a transcript to continue the scoring flow.");
      stopMedia();
      stopTimer();
      setStatus("idle");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    recognitionRef.current?.stop();
    stopTimer();
    setStatus("idle");
  }

  async function analyzeSubmission() {
    if (!transcript.trim()) {
      setError("Add a spoken transcript before requesting AI feedback.");
      return;
    }

    setStatus("analyzing");
    setError(null);

    const response = await fetch("/api/speaking-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript,
        durationSeconds: Math.max(seconds, 38),
        lessonId: "day-42-american-rhythm",
      }),
    });
    const payload = (await response.json()) as FeedbackResponse;

    if (!payload.ok || !payload.data) {
      setError(payload.error ?? "AI feedback failed. Try again after editing the transcript.");
      setStatus("idle");
      return;
    }

    setFeedback(payload.data);
    setStatus("complete");
  }

  function completeDailyTask() {
    submitVoiceTask();
    setCompleted(true);
  }

  function resetPractice() {
    stopTimer();
    stopMedia();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setFeedback(null);
    setCompleted(false);
    setSeconds(0);
    setTranscript(demoTranscript);
    setStatus("idle");
    setError(null);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#07111f,#081a2e_52%,#07111f)] px-4 py-6 text-foreground">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <Button asChild size="sm" variant="ghost" className="-ml-3 mb-4">
              <Link href="/dashboard">
                <ArrowLeft /> Back to dashboard
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2">
              <Badge variant="danger">Mandatory speaking flow</Badge>
              <Badge variant="warning">Day 42 / 90</Badge>
              <Badge variant="default">American rhythm</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-normal md:text-6xl">
              Record, transcribe, evaluate, then unlock today&apos;s roadmap.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              This is the voice-first lesson gate. Watching or reading does not count until the learner submits speech and receives AI feedback.
            </p>
          </div>
          <div className="grid min-w-48 place-items-center rounded-lg border border-white/10 bg-white/[0.045] p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Timer</div>
            <div className="mt-2 text-4xl font-semibold tabular-nums">{formatTime(seconds)}</div>
            <div className="mt-2 text-sm text-muted-foreground">Target 01:30</div>
          </div>
        </header>

        <section className="grid gap-5 py-6 xl:grid-cols-[1fr_390px]">
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <CardTitle>Speaking prompt</CardTitle>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{practicePrompt}</p>
                  </div>
                  <Badge variant={status === "recording" ? "danger" : status === "complete" ? "success" : "default"}>
                    {status === "recording" ? "Recording" : status === "analyzing" ? "Analyzing" : status === "complete" ? "Evaluated" : "Ready"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold">Live waveform</div>
                        <div className="text-sm text-muted-foreground">
                          {status === "recording" ? "Speak naturally. Avoid filler words." : "Press record or use the demo transcript."}
                        </div>
                      </div>
                      <Button size="icon" variant={status === "recording" ? "danger" : "default"} onClick={status === "recording" ? stopRecording : startRecording}>
                        {status === "recording" ? <Square className="fill-current" /> : <Mic />}
                      </Button>
                    </div>
                    <Waveform active={status === "recording"} className="mt-5 h-36 rounded-lg border border-white/10 bg-[#071725]" />
                    {audioUrl ? (
                      <audio className="mt-5 w-full" controls src={audioUrl}>
                        <track kind="captions" />
                      </audio>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <ControlButton
                      active={status === "recording"}
                      icon={status === "recording" ? Pause : Mic}
                      label={status === "recording" ? "Stop recording" : "Start recording"}
                      onClick={status === "recording" ? stopRecording : startRecording}
                    />
                    <ControlButton
                      disabled={status === "analyzing" || transcript.trim().length < 8}
                      icon={WandSparkles}
                      label={status === "analyzing" ? "Analyzing..." : "Analyze speech"}
                      onClick={analyzeSubmission}
                      tone="green"
                    />
                    <ControlButton icon={RotateCcw} label="Reset practice" onClick={resetPractice} tone="muted" />
                  </div>
                </div>

                {error ? (
                  <div className="mt-5 rounded-lg border border-speak-red/25 bg-speak-red/10 p-4 text-sm text-slate-200">
                    <div className="flex items-center gap-2 font-semibold text-speak-red">
                      <CircleAlert className="h-4 w-4" />
                      Recording notice
                    </div>
                    <p className="mt-2 leading-6">{error}</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Live transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea value={transcript} onChange={(event) => setTranscript(event.target.value)} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="secondary" onClick={() => setTranscript(demoTranscript)}>
                      <Sparkles /> Use demo transcript
                    </Button>
                    <Button disabled={!feedback} onClick={completeDailyTask}>
                      <Send /> Complete mandatory task
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Native comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">American model audio</div>
                        <div className="text-sm text-muted-foreground">Slow playback, stress timing, then shadow mode.</div>
                      </div>
                      <Button size="icon" aria-label="Play native comparison">
                        <Volume2 />
                      </Button>
                    </div>
                    <Waveform className="mt-4 h-24" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {["v/w separation", "ending consonants", "stress timing"].map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-sm font-semibold">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <FeedbackPanel feedback={feedback} />
          </div>

          <aside className="space-y-5">
            <Checklist readiness={readiness} />
            <CoachGate feedback={feedback} completed={completed} />
            <HabitPanel feedback={feedback} />
          </aside>
        </section>
      </div>
    </main>
  );
}

function ControlButton({
  active,
  disabled,
  icon: Icon,
  label,
  onClick,
  tone = "blue",
}: {
  active?: boolean;
  disabled?: boolean;
  icon: typeof Mic;
  label: string;
  onClick: () => void;
  tone?: "blue" | "green" | "muted";
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        tone === "green" && "border-speak-green/25 bg-speak-green/10 text-speak-green hover:bg-speak-green/15",
        tone === "blue" && "border-primary/25 bg-primary/10 text-primary hover:bg-primary/15",
        tone === "muted" && "border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground",
        active && "border-speak-red/35 bg-speak-red/12 text-speak-red",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function FeedbackPanel({ feedback }: { feedback: FeedbackData | null }) {
  if (!feedback) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI evaluation rubric</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          {["Pronunciation", "Fluency", "Grammar", "Confidence", "Hesitation"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="text-sm font-semibold">{item}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Scored after transcript analysis and voice metadata.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <CardTitle>AI speaking evaluation</CardTitle>
          <Badge variant="success">Feedback received</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="grid place-items-center rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <ProgressRing value={feedback.scores.fluency} label="Fluency" size={170} tone="blue" />
            <p className="mt-4 text-center text-sm leading-6 text-muted-foreground">{feedback.coachMessage}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ScoreRow label="Pronunciation" value={feedback.scores.pronunciation} tone="green" />
            <ScoreRow label="Grammar" value={feedback.scores.grammar} tone="blue" />
            <ScoreRow label="Confidence" value={feedback.scores.confidence} tone="violet" />
            <ScoreRow label="Hesitation risk" value={feedback.scores.hesitation} tone="amber" invert />
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:col-span-2">
              <div className="flex items-center gap-2 font-semibold">
                <Headphones className="h-4 w-4 text-primary" />
                Tamil accent signals
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {feedback.tamilAccentSignals.map((signal) => (
                  <Badge key={signal} variant="warning">
                    {signal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreRow({ label, value, tone, invert }: { label: string; value: number; tone: "blue" | "green" | "violet" | "amber"; invert?: boolean }) {
  const progressValue = invert ? 100 - value : value;
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <Progress
        value={progressValue}
        className="mt-4"
        indicatorClassName={
          tone === "green" ? "bg-speak-green" : tone === "violet" ? "bg-speak-violet" : tone === "amber" ? "bg-speak-amber" : "bg-primary"
        }
      />
    </div>
  );
}

function Checklist({ readiness }: { readiness: Array<{ label: string; done: boolean }> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-speak-green" />
          Completion gate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {readiness.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <span className={cn("grid h-7 w-7 place-items-center rounded-full border", item.done ? "border-speak-green bg-speak-green/15 text-speak-green" : "border-white/15 text-muted-foreground")}>
              {item.done ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </span>
            <span className="text-sm font-semibold">{item.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CoachGate({ feedback, completed }: { feedback: FeedbackData | null; completed: boolean }) {
  return (
    <Card className={completed ? "border-speak-green/25 bg-speak-green/8" : "border-speak-red/25 bg-speak-red/8"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className={cn("h-5 w-5", completed ? "text-speak-green" : "text-speak-red")} />
          Accountability coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-200">
          {completed
            ? "Good. Today counts because you spoke, submitted, and accepted feedback."
            : feedback
              ? "You received feedback. Now complete the mandatory task to protect your streak."
              : "No speaking evaluation means no roadmap progress. Record or paste your speech, then request feedback."}
        </p>
        <div className="mt-4 rounded-lg border border-white/10 bg-black/18 p-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Speaking daily matters more than watching lessons.
        </div>
      </CardContent>
    </Card>
  );
}

function HabitPanel({ feedback }: { feedback: FeedbackData | null }) {
  const habits = feedback?.weakHabits;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Weak habit detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <HabitMetric icon={Gauge} label="Speaking speed" value={habits ? `${habits.wordsPerMinute} WPM` : "Waiting"} warning={Boolean(habits && habits.wordsPerMinute < 95)} />
        <HabitMetric icon={AlertTriangle} label="Filler words" value={habits ? `${habits.fillerWords}` : "Waiting"} warning={Boolean(habits && habits.fillerWords > 2)} />
        <HabitMetric icon={RotateCcw} label="Repeated words" value={habits ? `${habits.repeatedWords}` : "Waiting"} warning={Boolean(habits && habits.repeatedWords > 1)} />
        {habits ? (
          <div className="rounded-lg border border-primary/20 bg-primary/8 p-4">
            <div className="font-semibold text-primary">Correction plan</div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              {habits.recommendations.map((recommendation) => (
                <li key={recommendation} className="flex gap-2">
                  <Check className="mt-1 h-4 w-4 text-speak-green" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function HabitMetric({ icon: Icon, label, value, warning }: { icon: typeof Gauge; label: string; value: string; warning?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
      <div className="flex items-center gap-3">
        <div className={cn("grid h-9 w-9 place-items-center rounded-lg", warning ? "bg-speak-amber/15 text-speak-amber" : "bg-primary/15 text-primary")}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="font-semibold">{label}</div>
      </div>
      <Badge variant={warning ? "warning" : "default"}>{value}</Badge>
    </div>
  );
}
