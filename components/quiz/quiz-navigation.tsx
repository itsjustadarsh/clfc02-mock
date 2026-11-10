"use client";

import { ChevronLeft, ChevronRight, Flag, Grid3X3, SendHorizontal } from "lucide-react";
import { playClick } from "@/lib/sounds";
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
          onClick={() => { playClick(); onPrev(); }}
          disabled={isFirst}
          className="btn btn-secondary flex items-center gap-1 rounded-lg px-3 py-2 text-xs"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { playClick(); onToggleFlag(); }}
            className={cn(
              "btn flex items-center gap-1 rounded-lg px-3 py-2 text-xs",
              isFlagged ? "btn-xp" : "btn-secondary"
            )}
          >
            <Flag className="h-4 w-4" />
          </button>

          <button
            onClick={() => { playClick(); setShowGrid(!showGrid); }}
            className={cn(
              "btn flex items-center gap-1 rounded-lg px-3 py-2 text-xs",
              showGrid ? "btn-primary" : "btn-secondary"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>

          <button
            onClick={() => { playClick(); onSubmit(); }}
            className="btn btn-success flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs"
          >
            <SendHorizontal className="h-4 w-4" />
            Submit
          </button>
        </div>

        <button
          onClick={() => { playClick(); onNext(); }}
          disabled={isLast}
          className="btn btn-secondary flex items-center gap-1 rounded-lg px-3 py-2 text-xs"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {showGrid && (
        <div className="rounded-xl border bg-card p-3 animate-fade-in">
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-13">
            {questionIds.map((id, index) => {
              const isAnswered = answers.has(id);
              const isFlaggedQ = flagged.has(id);
              const isCurrent = index === currentIndex;

              return (
                <button
                  key={id}
                  onClick={() => { playClick(); onGoTo(index); setShowGrid(false); }}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium transition-all",
                    isCurrent && "ring-2 ring-primary bg-primary/10 text-primary",
                    isAnswered && !isCurrent && "bg-primary/10 text-primary",
                    isFlaggedQ && !isCurrent && "bg-xp/10 text-xp",
                    !isAnswered && !isCurrent && !isFlaggedQ && "bg-muted text-muted-foreground hover:bg-border"
                  )}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-primary/20" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-xp/20" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-muted" /> Unanswered
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
