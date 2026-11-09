"use client";

import { useState } from "react";
import { selectDomainQuestions } from "@/lib/questions";
import { DOMAINS } from "@/lib/types";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import type { Question } from "@/lib/types";

export function DomainPracticeClient({ domainId }: { domainId: number }) {
  const domain = DOMAINS.find((d) => d.id === domainId);

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [count, setCount] = useState<number | undefined>(undefined);
  const [key, setKey] = useState(0);

  if (!domain) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Domain not found</h1>
      </div>
    );
  }

  function start() {
    setQuestions(selectDomainQuestions(domainId, count));
    setStarted(true);
    setKey((k) => k + 1);
  }

  if (!started) {
    const counts = [20, 30, 50, domain.questionCount];

    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">
            Domain {domain.id}: {domain.name}
          </h1>
          <p className="mb-6 text-muted-foreground">
            {domain.questionCount} questions available &middot;{" "}
            {Math.round(domain.weight * 100)}% of exam
          </p>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">How many questions?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {counts.map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    setCount(c === domain.questionCount ? undefined : c)
                  }
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    count === c ||
                    (count === undefined && c === domain.questionCount)
                      ? "border-primary bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {c === domain.questionCount ? `All (${c})` : c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={start}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <QuizEngine
        key={key}
        questions={questions}
        mode="domain"
        domain={domainId}
        onRetry={start}
      />
    </div>
  );
}
