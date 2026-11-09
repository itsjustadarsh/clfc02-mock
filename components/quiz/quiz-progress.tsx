"use client";

interface QuizProgressProps {
  current: number;
  total: number;
  answered: number;
}

export function QuizProgress({ current, total, answered }: QuizProgressProps) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">
          Q {current + 1}/{total}
        </span>
        <span className="text-muted-foreground">
          {answered} answered ({Math.round((answered / total) * 100)}%)
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
