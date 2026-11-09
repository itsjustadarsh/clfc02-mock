"use client";

import { ChevronLeft, ChevronRight, Flag, Grid3X3, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isFlagged: boolean;
  answers: Map<string, string[]>;
  flagged: Set<string>;
  questionIds: string[];
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onToggleFlag: () => void;
  onSubmit: () => void;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  isFlagged,
  answers,
  flagged,
  questionIds,
  onPrev,
  onNext,
  onGoTo,
  onToggleFlag,
  onSubmit,
}: QuizNavigationProps) {
  const [showGrid, setShowGrid] = useState(false);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFlag}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              isFlagged
                ? "border-amber-500/50 bg-amber-500/10 text-amber-500"
                : "hover:bg-muted"
            )}
          >
            <Flag className="h-4 w-4" />
            Flag
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              showGrid ? "border-primary/50 bg-primary/10 text-primary" : "hover:bg-muted"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>

          <button
            onClick={onSubmit}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <SendHorizontal className="h-4 w-4" />
            Submit
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {showGrid && (
        <div className="rounded-lg border bg-card p-3">
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-13">
            {questionIds.map((id, index) => {
              const isAnswered = answers.has(id);
              const isFlaggedQ = flagged.has(id);
              const isCurrent = index === currentIndex;

              return (
                <button
                  key={id}
                  onClick={() => {
                    onGoTo(index);
                    setShowGrid(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition-colors",
                    isCurrent && "ring-2 ring-primary",
                    isAnswered && !isCurrent && "bg-primary/20 text-primary",
                    isFlaggedQ && "bg-amber-500/20 text-amber-500",
                    !isAnswered && !isCurrent && !isFlaggedQ && "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded bg-primary/20" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded bg-amber-500/20" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded bg-muted" /> Unanswered
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
