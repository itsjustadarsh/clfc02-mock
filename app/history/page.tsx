"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAttempt } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getAttempts, clearHistory } from "@/lib/storage";
import { Trash2, Eye, History, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    setAttempts(getAttempts());
  }, []);

  function handleClear() {
    if (confirm("Clear all history? This cannot be undone.")) {
      clearHistory();
      setAttempts([]);
      toast.success("History cleared");
    }
  }

  const examAttempts = attempts.filter((a) => a.mode === "exam");
  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
    : 0;
  const passRate = examAttempts.length > 0
    ? Math.round((examAttempts.filter((a) => a.passed).length / examAttempts.length) * 100)
    : 0;
  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map((a) => a.score))
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground">Your past practice attempts</p>
        </div>
        {attempts.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {attempts.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Total Attempts</div>
            <div className="text-2xl font-bold">{attempts.length}</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Average Score</div>
            <div className="text-2xl font-bold">{avgScore}%</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Best Score</div>
            <div className="text-2xl font-bold text-success">{bestScore}%</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Exam Pass Rate</div>
            <div className="text-2xl font-bold">{passRate}%</div>
          </div>
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="py-16 text-center">
          <History className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
          <h2 className="text-lg font-semibold">No attempts yet</h2>
          <p className="mb-4 text-muted-foreground">Complete a practice test to see your results here.</p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Start Practicing
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt) => {
            const date = new Date(attempt.date);
            const modeName =
              attempt.mode === "exam"
                ? "Mock Exam"
                : attempt.mode === "domain"
                  ? `Domain ${attempt.domain}: ${DOMAINS.find((d) => d.id === attempt.domain)?.shortName ?? ""}`
                  : "Quick Quiz";

            return (
              <div
                key={attempt.id}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/30"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold",
                    attempt.passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  )}
                >
                  {attempt.score}%
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{modeName}</div>
                  <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString()} &middot;{" "}
                    {attempt.correctCount}/{attempt.totalQuestions} correct &middot;{" "}
                    {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      attempt.passed
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    )}
                  >
                    {attempt.passed ? "PASS" : "FAIL"}
                  </span>
                  <Link
                    href={`/practice/review/${attempt.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
