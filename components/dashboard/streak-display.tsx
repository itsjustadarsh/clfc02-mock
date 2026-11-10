"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  streak: number;
  compact?: boolean;
}

export function StreakDisplay({ streak, compact }: StreakDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Flame className={cn("h-4 w-4", streak > 0 ? "text-streak animate-streak-glow" : "text-muted-foreground")} />
        <span className={cn("text-sm font-medium", streak > 0 ? "text-streak" : "text-muted-foreground")}>
          {streak}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", streak > 0 ? "bg-streak/10" : "bg-muted")}>
        <Flame className={cn("h-5 w-5", streak > 0 ? "text-streak animate-streak-glow" : "text-muted-foreground")} />
      </div>
      <div>
        <div className={cn("text-xl font-semibold", streak > 0 ? "text-streak" : "text-muted-foreground")}>
          {streak} day{streak !== 1 ? "s" : ""}
        </div>
        <div className="text-xs text-muted-foreground">
          {streak > 0 ? "Keep the streak alive!" : "Start a streak today!"}
        </div>
      </div>
    </div>
  );
}
