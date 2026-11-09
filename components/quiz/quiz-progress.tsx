"use client";

interface QuizProgressProps {
  current: number;
  total: number;
  answered: number;
}

export function QuizProgress({ current, total, answered }: QuizProgressProps) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Question {current + 1} of {total}
        </span>
        <span className="text-muted-foreground">
          {answered} answered
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
