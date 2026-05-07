"use client";

import { Mic, Square } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingMic({ className }: { className?: string }) {
  const [recording, setRecording] = useState(false);

  return (
    <div className={cn("fixed bottom-5 right-5 z-50", className)}>
      <div className="relative">
        {recording ? (
          <>
            <span className="absolute inset-0 rounded-full bg-speak-red/45 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full bg-speak-red/30 animate-pulse-ring [animation-delay:.45s]" />
          </>
        ) : null}
        <Button
          aria-label={recording ? "Stop voice recording" : "Start voice recording"}
          className={cn(
            "relative h-14 w-14 rounded-full shadow-[0_24px_60px_rgba(59,130,246,0.35)]",
            recording && "bg-speak-red hover:bg-speak-red/90",
          )}
          size="icon"
          onClick={() => setRecording((value) => !value)}
        >
          {recording ? <Square className="fill-current" /> : <Mic />}
        </Button>
      </div>
    </div>
  );
}
