import { cn } from "@/lib/utils";

const heights = [36, 58, 42, 74, 48, 88, 54, 68, 44, 76, 38, 64, 50, 86, 46, 70, 40, 60];

export function Waveform({ className, active = true }: { className?: string; active?: boolean }) {
  return (
    <div className={cn("flex h-24 items-center justify-center gap-1.5", className)} aria-label="Audio waveform">
      {heights.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn(
            "w-1.5 origin-center rounded-full bg-gradient-to-t from-primary via-speak-cyan to-speak-violet opacity-85",
            active && "animate-wave",
          )}
          style={{
            height,
            animationDelay: `${index * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}
