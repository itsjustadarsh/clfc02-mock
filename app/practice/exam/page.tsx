"use client";

import { useState } from "react";
import { selectExamQuestions } from "@/lib/questions";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { Button3D } from "@/components/ui/button-3d";
import type { Question } from "@/lib/types";
import { ClipboardList, ShieldAlert } from "lucide-react";

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
      <div className="mx-auto max-w-md px-4 py-10 animate-fade-in">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <ClipboardList className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-1 text-xl font-extrabold">Full Mock Exam</h1>

          <div className="my-4 flex items-center justify-center gap-6 text-sm">
            <div>
              <span className="text-lg font-extrabold">65</span>{" "}
              <span className="text-muted-foreground">Qs</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div>
              <span className="text-lg font-extrabold">90</span>{" "}
              <span className="text-muted-foreground">min</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div>
              <span className="text-lg font-extrabold">70%</span>{" "}
              <span className="text-muted-foreground">pass</span>
            </div>
          </div>

          <Button3D variant="primary" size="lg" onClick={startExam} className="mb-4 w-full">
            Start Exam
          </Button3D>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldAlert className="h-3 w-3" />
            Tab switching and copy/paste are monitored
          </div>
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
        antiCheat
        onRetry={startExam}
      />
    </div>
  );
}
