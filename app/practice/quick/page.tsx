"use client";

import { useState } from "react";
import { selectQuickQuiz } from "@/lib/questions";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { Button3D } from "@/components/ui/button-3d";
import { playClick } from "@/lib/sounds";
import type { Question } from "@/lib/types";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-success/10">
            <Zap className="h-7 w-7 text-success" />
          </div>
          <h1 className="mb-1 text-lg font-semibold">Quick Quiz</h1>
          <p className="mb-4 text-sm text-muted-foreground">Random questions, no timer.</p>

          <div className="mb-5">
            <p className="mb-2 text-sm font-medium">Questions</p>
            <div className="flex justify-center gap-2">
              {[10, 15, 20, 30].map((c) => (
                <button
                  key={c}
                  onClick={() => { playClick(); setCount(c); }}
                  className={cn(
                    "btn rounded-lg px-4 py-2 text-sm",
                    count === c ? "btn-primary" : "btn-secondary"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Button3D variant="success" size="lg" onClick={start} className="w-full">
            Start Quiz
          </Button3D>
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
