import { cn } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  label: string;
  size?: number;
  className?: string;
  tone?: "blue" | "green" | "amber" | "red" | "violet";
};

const toneMap = {
  blue: "#3b82f6",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  violet: "#8b5cf6",
};

export function ProgressRing({ value, label, size = 120, className, tone = "blue" }: ProgressRingProps) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="rgba(255,255,255,0.11)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={toneMap[tone]}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}
