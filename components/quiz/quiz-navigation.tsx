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
          className="btn-3d btn-shadow-secondary flex items-center gap-1 rounded-xl bg-muted px-3 py-2 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { playClick(); onToggleFlag(); }}
            className={cn(
              "btn-3d flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition-all",
              isFlagged
                ? "bg-amber-500 text-white shadow-[0_3px_0_#b45309]"
                : "bg-muted btn-shadow-secondary"
            )}
          >
            <Flag className="h-4 w-4" />
          </button>

          <button
            onClick={() => { playClick(); setShowGrid(!showGrid); }}
            className={cn(
              "btn-3d flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition-all",
              showGrid
                ? "bg-primary text-white btn-shadow-primary"
                : "bg-muted btn-shadow-secondary"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>

          <button
            onClick={() => { playClick(); onSubmit(); }}
            className="btn-3d btn-shadow-success flex items-center gap-1.5 rounded-xl bg-success px-4 py-2 text-xs font-bold text-white"
          >
            <SendHorizontal className="h-4 w-4" />
            Submit
          </button>
        </div>

        <button
          onClick={() => { playClick(); onNext(); }}
          disabled={isLast}
          className="btn-3d btn-shadow-secondary flex items-center gap-1 rounded-xl bg-muted px-3 py-2 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {showGrid && (
        <div className="rounded-2xl border bg-card p-3 animate-fade-in">
          <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-13">
            {questionIds.map((id, index) => {
              const isAnswered = answers.has(id);
              const isFlaggedQ = flagged.has(id);
              const isCurrent = index === currentIndex;

              return (
                <button
                  key={id}
                  onClick={() => {
                    playClick();
                    onGoTo(index);
                    setShowGrid(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold transition-all",
                    "hover:scale-110",
                    isCurrent && "ring-2 ring-primary scale-110",
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
          <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground font-medium">
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
