"use client";

import Link from "next/link";
import type { QuizAttempt } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { CheckCircle2, XCircle, RotateCcw, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  attempt: QuizAttempt;
  onRetry?: () => void;
}

export function QuizResults({ attempt, onRetry }: QuizResultsProps) {
  const passed = attempt.passed;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div
          className={cn(
            "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full",
            passed ? "bg-success/10" : "bg-danger/10"
          )}
        >
          {passed ? (
            <CheckCircle2 className="h-10 w-10 text-success" />
          ) : (
            <XCircle className="h-10 w-10 text-danger" />
          )}
        </div>
        <h2 className="text-2xl font-bold">
          {passed ? "Congratulations!" : "Keep Practicing"}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {passed
            ? "You passed the mock exam!"
            : "You need 70% to pass. Review your answers and try again."}
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={cn("text-3xl font-bold", passed ? "text-success" : "text-danger")}>
              {attempt.score}%
            </div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {attempt.correctCount}/{attempt.totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {Math.floor(attempt.timeSpent / 60)}m
            </div>
            <div className="text-sm text-muted-foreground">Time</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Domain Breakdown</h3>
        <div className="space-y-3">
          {attempt.domainBreakdown.map((ds) => {
            const domain = DOMAINS.find((d) => d.id === ds.domain);
            const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
            return (
              <div key={ds.domain}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{domain?.name ?? `Domain ${ds.domain}`}</span>
                  <span className={cn("font-medium", pct >= 70 ? "text-success" : "text-danger")}>
                    {ds.correct}/{ds.total} ({pct}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
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

      <div className="flex gap-3">
        <Link
          href={`/practice/review/${attempt.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 font-medium transition-colors hover:bg-muted"
        >
          <Eye className="h-4 w-4" />
          Review Answers
        </Link>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
