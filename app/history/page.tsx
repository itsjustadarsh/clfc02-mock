"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAttempt, QuizMode } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getAttempts, clearHistory, getStreak, getTotalQuestionsAnswered } from "@/lib/storage";
import { Trash2, Eye, History, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ModeFilter = "all" | QuizMode;

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all");

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
  const streak = getStreak();
  const totalQs = getTotalQuestionsAnswered();

  const filteredAttempts = modeFilter === "all"
    ? attempts
    : attempts.filter((a) => a.mode === modeFilter);

  // Last 20 attempts for trend chart (reversed for left-to-right chronological)
  const trendData = attempts.slice(0, 20).reverse();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        {attempts.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 rounded-lg border border-danger/30 px-2.5 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {attempts.length > 0 && (
        <>
          {/* Stats grid */}
          <div className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Attempts</div>
              <div className="text-xl font-bold">{attempts.length}</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Avg Score</div>
              <div className="text-xl font-bold">{avgScore}%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Best</div>
              <div className="text-xl font-bold text-success">{bestScore}%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Pass Rate</div>
              <div className="text-xl font-bold">{passRate}%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Questions</div>
              <div className="text-xl font-bold">{totalQs}</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="text-[10px] text-muted-foreground">Streak</div>
              <div className="flex items-center gap-1 text-xl font-bold">
                {streak > 0 && <Flame className="h-4 w-4 text-primary" />}
                {streak}d
              </div>
            </div>
          </div>

          {/* Score trend */}
          {trendData.length > 1 && (
            <div className="mb-5 rounded-lg border bg-card p-3">
              <div className="mb-2 text-[10px] font-medium text-muted-foreground">Score Trend</div>
              <div className="flex items-end gap-1" style={{ height: "48px" }}>
                {trendData.map((a, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t-sm transition-all",
                      a.passed ? "bg-success/60" : "bg-danger/60"
                    )}
                    style={{ height: `${Math.max(a.score, 5)}%` }}
                    title={`${a.score}%`}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
                <span>Oldest</span>
                <span>Latest</span>
              </div>
            </div>
          )}

          {/* Mode filters */}
          <div className="mb-3 flex gap-1">
            {(["all", "exam", "quick", "domain"] as ModeFilter[]).map((m) => (
              <button
                key={m}
                onClick={() => setModeFilter(m)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                  modeFilter === m
                    ? "border-primary bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                {m === "all" ? "All" : m === "exam" ? "Exams" : m === "quick" ? "Quick" : "Domain"}
              </button>
            ))}
          </div>
        </>
      )}

      {attempts.length === 0 ? (
        <div className="py-14 text-center">
          <History className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <h2 className="text-base font-semibold">No attempts yet</h2>
          <p className="mb-4 text-sm text-muted-foreground">Complete a test to see results here.</p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Start Practicing
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAttempts.map((attempt) => {
            const date = new Date(attempt.date);
            const modeName =
              attempt.mode === "exam"
                ? "Mock Exam"
                : attempt.mode === "domain"
                  ? `D${attempt.domain}: ${DOMAINS.find((d) => d.id === attempt.domain)?.shortName ?? ""}`
                  : "Quick Quiz";

            return (
              <div
                key={attempt.id}
                className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                    attempt.passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  )}
                >
                  {attempt.score}%
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{modeName}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {date.toLocaleDateString()} · {attempt.correctCount}/{attempt.totalQuestions} · {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      attempt.passed
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    )}
                  >
                    {attempt.passed ? "PASS" : "FAIL"}
                  </span>
                  <Link
                    href={`/practice/review/${attempt.id}`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
          {filteredAttempts.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No {modeFilter} attempts yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
