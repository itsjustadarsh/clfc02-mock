"use client";

import { getLevelProgress } from "@/lib/gamification";
import { Star } from "lucide-react";

interface XPBarProps {
  xp: number;
}

export function XPBar({ xp }: XPBarProps) {
  const { current, next, progress, xpInLevel, xpForLevel } = getLevelProgress(xp);

  return (
    <div className="rounded-xl border bg-card p-4 glow-purple">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <span className="text-sm font-bold">{current.level}</span>
          </div>
          <div>
            <div className="text-sm font-bold">{current.title}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 text-xp" />
              {xp.toLocaleString()} XP total
            </div>
          </div>
        </div>
        {next && (
          <div className="text-right text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{xpInLevel}</span>/{xpForLevel}
          </div>
        )}
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="animate-shimmer h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(progress * 100, 2)}%` }}
        />
      </div>
      {next && (
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          {xpForLevel - xpInLevel} XP to Lv.{next.level} {next.title}
        </p>
      )}
    </div>
  );
}
