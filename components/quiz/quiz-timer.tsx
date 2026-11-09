"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  formatted: string;
  timeRemaining: number;
  totalTime?: number;
}

export function QuizTimer({ formatted, timeRemaining, totalTime }: QuizTimerProps) {
  const depletedPercent = totalTime ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

  return (
    <div className="flex flex-col items-end gap-1">
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono font-medium",
          timeRemaining <= 60
            ? "animate-pulse-danger bg-danger/10 text-danger"
            : timeRemaining <= 300
              ? "bg-danger/10 text-danger"
              : timeRemaining <= 600
                ? "bg-amber-500/10 text-amber-500"
                : "bg-muted text-foreground"
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        {formatted}
      </div>
      {totalTime && (
        <div className="h-0.5 w-20 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              timeRemaining <= 300 ? "bg-danger" : timeRemaining <= 600 ? "bg-amber-500" : "bg-primary"
            )}
            style={{ width: `${100 - depletedPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
