"use client";

import { useState } from "react";
import { selectExamQuestions } from "@/lib/questions";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import type { Question } from "@/lib/types";
import { ClipboardList, Timer, HelpCircle, Target } from "lucide-react";

export default function ExamPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [key, setKey] = useState(0);

  function startExam() {
    setQuestions(selectExamQuestions());
    setStarted(true);
    setKey((k) => k + 1);
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Full Mock Exam</h1>
          <p className="mb-6 text-muted-foreground">
            Simulate the real AWS CLF-C02 exam experience.
          </p>

          <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center gap-1">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">65</span>
              <span className="text-muted-foreground">Questions</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Timer className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">90 min</span>
              <span className="text-muted-foreground">Time Limit</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Target className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">70%</span>
              <span className="text-muted-foreground">To Pass</span>
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Exam
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
        mode="exam"
        timeLimit={5400}
        onRetry={startExam}
      />
    </div>
  );
}
