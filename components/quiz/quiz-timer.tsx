"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  formatted: string;
  timeRemaining: number;
}

export function QuizTimer({ formatted, timeRemaining }: QuizTimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-mono font-medium",
        timeRemaining <= 300
          ? "bg-danger/10 text-danger"
          : timeRemaining <= 600
            ? "bg-amber-500/10 text-amber-500"
            : "bg-muted text-foreground"
      )}
    >
      <Clock className="h-4 w-4" />
      {formatted}
    </div>
  );
}
