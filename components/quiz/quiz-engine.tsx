"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Question, QuizMode, QuizAttempt } from "@/lib/types";
import { useQuiz } from "@/hooks/use-quiz";
import { useTimer } from "@/hooks/use-timer";
import { calculateScore, calculateDomainBreakdown, isPassing } from "@/lib/scoring";
import { saveAttempt, generateId } from "@/lib/storage";
import { QuestionCard } from "./question-card";
import { QuizTimer } from "./quiz-timer";
import { QuizProgress } from "./quiz-progress";
import { QuizNavigation } from "./quiz-navigation";
import { QuizResults } from "./quiz-results";

interface QuizEngineProps {
  questions: Question[];
  mode: QuizMode;
  domain?: number;
  timeLimit?: number;
  onRetry?: () => void;
}

export function QuizEngine({ questions, mode, domain, timeLimit, onRetry }: QuizEngineProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const quiz = useQuiz(questions);

  const handleExpire = useCallback(() => {
    if (!quiz.isComplete) {
      handleSubmit();
    }
  }, [quiz.isComplete]);

  const timer = useTimer(timeLimit ?? 0, handleExpire);

  useEffect(() => {
    if (timeLimit && timeLimit > 0) {
      timer.start();
    }
  }, []);

  function handleSubmit() {
    if (!confirmSubmit && !timer.timeRemaining) {
      // Timer expired, force submit
    } else if (!confirmSubmit) {
      setConfirmSubmit(true);
      return;
    }

    timer.pause();
    quiz.submit();

    const results = quiz.getResults();
    const score = calculateScore(results);
    const breakdown = calculateDomainBreakdown(results, questions);

    const newAttempt: QuizAttempt = {
      id: generateId(),
      mode,
      domain,
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      correctCount: results.filter((r) => r.isCorrect).length,
      score,
      passed: isPassing(score),
      timeSpent: timer.elapsed,
      answers: results,
      questionIds: questions.map((q) => q.id),
      domainBreakdown: breakdown,
    };

    saveAttempt(newAttempt);
    setAttempt(newAttempt);
  }

  if (attempt) {
    return <QuizResults attempt={attempt} onRetry={onRetry} />;
  }

  if (confirmSubmit) {
    const unanswered = quiz.totalQuestions - quiz.answeredCount;
    return (
      <div className="mx-auto max-w-lg rounded-xl border bg-card p-8 text-center">
        <h2 className="mb-2 text-xl font-bold">Submit Exam?</h2>
        <p className="mb-1 text-muted-foreground">
          You have answered {quiz.answeredCount} of {quiz.totalQuestions} questions.
        </p>
        {unanswered > 0 && (
          <p className="mb-4 text-sm text-amber-500">
            {unanswered} question{unanswered !== 1 ? "s" : ""} unanswered
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setConfirmSubmit(false)}
            className="flex-1 rounded-lg border px-4 py-2.5 font-medium transition-colors hover:bg-muted"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <QuizProgress
          current={quiz.currentIndex}
          total={quiz.totalQuestions}
          answered={quiz.answeredCount}
        />
        {timeLimit && timeLimit > 0 && (
          <QuizTimer formatted={timer.formatted} timeRemaining={timer.timeRemaining} />
        )}
      </div>

      <div className="rounded-xl border bg-card p-6">
        {quiz.currentQuestion && (
          <QuestionCard
            question={quiz.currentQuestion}
            selectedAnswers={quiz.currentAnswer}
            onSelect={(selected) =>
              quiz.selectAnswer(quiz.currentQuestion!.id, selected)
            }
          />
        )}
      </div>

      <QuizNavigation
        currentIndex={quiz.currentIndex}
        totalQuestions={quiz.totalQuestions}
        isFlagged={quiz.isFlagged}
        answers={quiz.answers}
        flagged={quiz.flagged}
        questionIds={questions.map((q) => q.id)}
        onPrev={quiz.prev}
        onNext={quiz.next}
        onGoTo={quiz.goTo}
        onToggleFlag={() => quiz.currentQuestion && quiz.toggleFlag(quiz.currentQuestion.id)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
