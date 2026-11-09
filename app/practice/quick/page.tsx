"use client";

import { useState } from "react";
import { selectQuickQuiz } from "@/lib/questions";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import type { Question } from "@/lib/types";
import { Zap } from "lucide-react";

export default function QuickQuizPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [count, setCount] = useState(15);
  const [key, setKey] = useState(0);

  function start() {
    setQuestions(selectQuickQuiz(count));
    setStarted(true);
    setKey((k) => k + 1);
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 animate-fade-in">
        <div className="rounded-xl border bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
            <Zap className="h-7 w-7 text-green-500" />
          </div>
          <h1 className="mb-1 text-xl font-bold">Quick Quiz</h1>
          <p className="mb-4 text-sm text-muted-foreground">Random questions, no timer.</p>

          <div className="mb-5">
            <p className="mb-2 text-sm font-medium">Questions</p>
            <div className="flex justify-center gap-1.5">
              {[10, 15, 20, 30].map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    count === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={start}
            className="w-full rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <QuizEngine key={key} questions={questions} mode="quick" onRetry={start} />
    </div>
  );
}
