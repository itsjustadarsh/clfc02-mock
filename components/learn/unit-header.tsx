"use client";

import type { Unit } from "@/lib/lessons";
import { cn } from "@/lib/utils";

const domainColors: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500", text: "text-white", border: "border-blue-400" },
  red: { bg: "bg-red-500", text: "text-white", border: "border-red-400" },
  green: { bg: "bg-green-500", text: "text-white", border: "border-green-400" },
  orange: { bg: "bg-amber-500", text: "text-white", border: "border-amber-400" },
};

interface UnitHeaderProps {
  unit: Unit;
  index: number;
}

export function UnitHeader({ unit, index }: UnitHeaderProps) {
  const colors = domainColors[unit.color] ?? domainColors.blue;
  const pct = unit.progress.total > 0
    ? Math.round((unit.progress.completed / unit.progress.total) * 100)
    : 0;

  return (
    <div className={cn(
      "mx-auto w-full max-w-sm rounded-2xl p-4 text-center",
      colors.bg, colors.text,
      "shadow-[0_4px_0] shadow-black/20"
    )}>
      <div className="text-xs font-bold uppercase tracking-wider opacity-80">
        Unit {index + 1}
      </div>
      <h3 className="mt-1 text-lg font-extrabold">{unit.name}</h3>
      <div className="mt-2 flex items-center justify-center gap-2 text-xs font-bold">
        <span>{unit.progress.completed}/{unit.progress.total} lessons</span>
        <span className="opacity-60">·</span>
        <span>{Math.round(unit.weight * 100)}% of exam</span>
      </div>
      {/* Progress bar */}
      <div className="mx-auto mt-2 h-2 w-3/4 overflow-hidden rounded-full bg-black/20">
        <div
          className="h-full rounded-full bg-white/80 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
