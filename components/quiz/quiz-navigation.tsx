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
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
          <kbd className="ml-0.5 rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">←</kbd>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleFlag}
            className={cn(
              "flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
              isFlagged
                ? "border-amber-500/50 bg-amber-500/10 text-amber-500"
                : "hover:bg-muted"
            )}
          >
            <Flag className="h-3.5 w-3.5" />
            <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">F</kbd>
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              "flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
              showGrid ? "border-primary/50 bg-primary/10 text-primary" : "hover:bg-muted"
            )}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onSubmit}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <SendHorizontal className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <kbd className="ml-0.5 rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">→</kbd>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {showGrid && (
        <div className="rounded-lg border bg-card p-2.5 animate-fade-in">
          <div className="grid grid-cols-10 gap-1 sm:grid-cols-13">
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
                    "flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium transition-colors",
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
          <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-primary/20" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-amber-500/20" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-muted" /> Unanswered
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
