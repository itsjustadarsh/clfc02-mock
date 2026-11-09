"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAttempt, Question } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getAttempt } from "@/lib/storage";
import { getQuestionById } from "@/lib/questions";
import { QuestionCard } from "@/components/quiz/question-card";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewFilter = "all" | "wrong" | "correct";

export function ReviewClient({ attemptId }: { attemptId: string }) {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [domainFilter, setDomainFilter] = useState<number | null>(null);

  useEffect(() => {
    const a = getAttempt(attemptId);
    if (a) {
      setAttempt(a);
      const qs = a.questionIds
        .map((id) => getQuestionById(id))
        .filter((q): q is Question => q !== undefined);
      setQuestions(qs);
    }
  }, [attemptId]);

  if (!attempt) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Attempt not found</h1>
        <Link
          href="/history"
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Back to History
        </Link>
      </div>
    );
  }

  const answerMap = new Map(attempt.answers.map((a) => [a.questionId, a]));

  const filteredQuestions = questions.filter((q) => {
    const answer = answerMap.get(q.id);
    if (filter === "wrong" && answer?.isCorrect) return false;
    if (filter === "correct" && !answer?.isCorrect) return false;
    if (domainFilter !== null && q.domain !== domainFilter) return false;
    return true;
  });

  const wrongCount = attempt.answers.filter((a) => !a.isCorrect).length;
  const correctCount = attempt.answers.filter((a) => a.isCorrect).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <Link
          href="/history"
          className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          History
        </Link>
        <h1 className="text-xl font-bold">Review Answers</h1>
      </div>

      {/* Sticky summary */}
      <div className="sticky top-12 z-40 -mx-4 mb-4 border-b bg-background/95 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">
            <span className={attempt.passed ? "text-success" : "text-danger"}>
              {attempt.score}%
            </span>
            {" · "}{attempt.correctCount}/{attempt.totalQuestions} correct
          </span>
          <span className="text-muted-foreground">
            {filteredQuestions.length} showing
          </span>
        </div>
      </div>

      {/* Filters — segmented control style */}
      <div className="mb-5 flex flex-wrap items-center gap-1.5">
        <div className="inline-flex overflow-hidden rounded-lg border">
          {(["all", "wrong", "correct"] as ReviewFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted",
                f !== "all" && "border-l"
              )}
            >
              {f === "all"
                ? `All (${questions.length})`
                : f === "wrong"
                  ? `Wrong (${wrongCount})`
                  : `Correct (${correctCount})`}
            </button>
          ))}
        </div>

        <div className="inline-flex overflow-hidden rounded-lg border">
          <button
            onClick={() => setDomainFilter(null)}
            className={cn(
              "px-2.5 py-1.5 text-xs font-medium transition-colors",
              domainFilter === null
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            All
          </button>
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDomainFilter(d.id)}
              className={cn(
                "border-l px-2.5 py-1.5 text-xs font-medium transition-colors",
                domainFilter === d.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              )}
            >
              D{d.id}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((q, i) => {
          const answer = answerMap.get(q.id);
          return (
            <div key={q.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span>Q{i + 1}</span>
                <span>·</span>
                <span>D{q.domain}</span>
                <span>·</span>
                <span
                  className={answer?.isCorrect ? "text-success" : "text-danger"}
                >
                  {answer?.isCorrect ? "Correct" : "Wrong"}
                </span>
              </div>
              <QuestionCard
                question={q}
                selectedAnswers={answer?.selected ?? []}
                onSelect={() => {}}
                showResult
                disabled
              />
            </div>
          );
        })}
        {filteredQuestions.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No questions match the current filter.
          </p>
        )}
      </div>
    </div>
  );
}
