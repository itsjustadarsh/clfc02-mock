"use client";

import Link from "next/link";
import type { QuizAttempt } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { RotateCcw, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  attempt: QuizAttempt;
  onRetry?: () => void;
}

export function QuizResults({ attempt, onRetry }: QuizResultsProps) {
  const passed = attempt.passed;
  const timePerQ = attempt.timeSpent > 0
    ? Math.round(attempt.timeSpent / attempt.totalQuestions)
    : 0;

  return (
    <div className="mx-auto max-w-lg space-y-4 animate-fade-in">
      {/* Score ring */}
      <div className="text-center">
        <div
          className="score-ring mx-auto mb-3 h-24 w-24"
          style={{
            background: `conic-gradient(${passed ? "var(--success)" : "var(--danger)"} ${attempt.score * 3.6}deg, var(--muted) 0deg)`,
          }}
        >
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-background">
            <span className={cn("text-2xl font-bold", passed ? "text-success" : "text-danger")}>
              {attempt.score}%
            </span>
          </div>
        </div>
        <h2 className="text-lg font-bold">
          {passed ? "Congratulations!" : "Keep Practicing"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {passed ? "You passed!" : "70% needed to pass."}
        </p>
      </div>

      {/* Stats */}
      <div className="rounded-xl border bg-card p-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold">
              {attempt.correctCount}/{attempt.totalQuestions}
            </div>
            <div className="text-[10px] text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="text-xl font-bold">
              {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
            </div>
            <div className="text-[10px] text-muted-foreground">Time</div>
          </div>
          <div>
            <div className="text-xl font-bold">{timePerQ}s</div>
            <div className="text-[10px] text-muted-foreground">Per Question</div>
          </div>
        </div>
        {attempt.violations && attempt.violations > 0 && (
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs text-amber-500">
            <AlertTriangle className="h-3 w-3" />
            {attempt.violations} tab switch{attempt.violations !== 1 ? "es" : ""} detected
          </div>
        )}
      </div>

      {/* Domain breakdown */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Domain Breakdown</h3>
        <div className="space-y-2.5">
          {attempt.domainBreakdown.map((ds) => {
            const domain = DOMAINS.find((d) => d.id === ds.domain);
            const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
            return (
              <div key={ds.domain}>
                <div className="mb-0.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{domain?.shortName ?? `D${ds.domain}`}</span>
                  <span className={cn("font-medium", pct >= 70 ? "text-success" : "text-danger")}>
                    {ds.correct}/{ds.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      pct >= 70 ? "bg-success" : "bg-danger"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/practice/review/${attempt.id}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </Link>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
