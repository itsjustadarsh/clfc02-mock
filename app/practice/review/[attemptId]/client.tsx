"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAttempt, Question } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getAttempt } from "@/lib/storage";
import { getQuestionById } from "@/lib/questions";
import { QuestionCard } from "@/components/quiz/question-card";
import { ArrowLeft, Filter } from "lucide-react";
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
          className="mt-4 inline-block text-primary hover:underline"
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
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6">
        <Link
          href="/history"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Link>
        <h1 className="text-2xl font-bold">Review Answers</h1>
        <p className="text-muted-foreground">
          Score: {attempt.score}% &middot; {attempt.correctCount}/
          {attempt.totalQuestions} correct
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "wrong", "correct"] as ReviewFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            {f === "all"
              ? `All (${questions.length})`
              : f === "wrong"
                ? `Wrong (${wrongCount})`
                : `Correct (${correctCount})`}
          </button>
        ))}
        <span className="mx-1 text-border">|</span>
        <button
          onClick={() => setDomainFilter(null)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            domainFilter === null
              ? "border-primary bg-primary/10 text-primary"
              : "hover:bg-muted"
          )}
        >
          All Domains
        </button>
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDomainFilter(d.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              domainFilter === d.id
                ? "border-primary bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            D{d.id}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredQuestions.map((q, i) => {
          const answer = answerMap.get(q.id);
          return (
            <div key={q.id} className="rounded-xl border bg-card p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Q{i + 1}</span>
                <span>&middot;</span>
                <span>Domain {q.domain}</span>
                <span>&middot;</span>
                <span
                  className={
                    answer?.isCorrect ? "text-success" : "text-danger"
                  }
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
          <p className="py-8 text-center text-muted-foreground">
            No questions match the current filter.
          </p>
        )}
      </div>
    </div>
  );
}
