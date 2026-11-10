"use client";

import type { Unit } from "@/lib/lessons";
import { cn } from "@/lib/utils";

const domainStyles: Record<string, string> = {
  blue: "from-cyan-600 to-cyan-500",
  red: "from-rose-600 to-rose-500",
  green: "from-emerald-600 to-emerald-500",
  orange: "from-amber-600 to-amber-500",
};

interface UnitHeaderProps {
  unit: Unit;
  index: number;
}

export function UnitHeader({ unit, index }: UnitHeaderProps) {
  const gradient = domainStyles[unit.color] ?? domainStyles.blue;
  const pct = unit.progress.total > 0
    ? Math.round((unit.progress.completed / unit.progress.total) * 100)
    : 0;

  return (
    <div className={cn(
      "mx-auto w-full max-w-sm rounded-xl bg-gradient-to-r p-4 text-center text-white",
      gradient
    )}>
      <div className="text-[10px] font-medium uppercase tracking-wider opacity-70">
        Unit {index + 1}
      </div>
      <h3 className="mt-0.5 text-base font-semibold">{unit.name}</h3>
      <div className="mt-1.5 flex items-center justify-center gap-2 text-xs opacity-80">
        <span>{unit.progress.completed}/{unit.progress.total} lessons</span>
        <span>·</span>
        <span>{Math.round(unit.weight * 100)}% of exam</span>
      </div>
      <div className="mx-auto mt-2 h-1.5 w-3/4 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white/80 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
