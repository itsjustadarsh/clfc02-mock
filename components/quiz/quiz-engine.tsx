"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Question, QuizMode, QuizAttempt } from "@/lib/types";
import { useQuiz } from "@/hooks/use-quiz";
import { useTimer } from "@/hooks/use-timer";
import { useAntiCheat } from "@/hooks/use-anti-cheat";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { calculateScore, calculateDomainBreakdown, isPassing } from "@/lib/scoring";
import { saveAttempt, generateId } from "@/lib/storage";
import { QuestionCard } from "./question-card";
import { QuizTimer } from "./quiz-timer";
import { QuizProgress } from "./quiz-progress";
import { QuizNavigation } from "./quiz-navigation";
import { QuizResults } from "./quiz-results";
import { Maximize2 } from "lucide-react";

interface QuizEngineProps {
  questions: Question[];
  mode: QuizMode;
  domain?: number;
  timeLimit?: number;
  antiCheat?: boolean;
  onRetry?: () => void;
}

export function QuizEngine({ questions, mode, domain, timeLimit, antiCheat, onRetry }: QuizEngineProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showAntiCheatBanner, setShowAntiCheatBanner] = useState(!!antiCheat);

  const quiz = useQuiz(questions);
  const { violations, requestFullscreen } = useAntiCheat(antiCheat ?? false);

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
      violations: violations > 0 ? violations : undefined,
      flaggedIds: quiz.flagged.size > 0 ? Array.from(quiz.flagged) : undefined,
    };

    saveAttempt(newAttempt);
    setAttempt(newAttempt);
  }

  // Keyboard shortcuts
  const optionKeys = quiz.currentQuestion
    ? Object.keys(quiz.currentQuestion.options).sort()
    : [];

  const shortcutHandlers = useMemo(() => {
    const h: Record<string, () => void> = {
      ArrowLeft: quiz.prev,
      ArrowRight: quiz.next,
      f: () => quiz.currentQuestion && quiz.toggleFlag(quiz.currentQuestion.id),
      "Ctrl+Enter": () => handleSubmit(),
    };
    optionKeys.forEach((key, i) => {
      h[String(i + 1)] = () => {
        if (!quiz.currentQuestion) return;
        if (quiz.currentQuestion.isMultiAnswer) {
          const current = quiz.currentAnswer;
          const newSelected = current.includes(key)
            ? current.filter((k) => k !== key)
            : [...current, key];
          quiz.selectAnswer(quiz.currentQuestion.id, newSelected);
        } else {
          quiz.selectAnswer(quiz.currentQuestion.id, [key]);
        }
      };
    });
    return h;
  }, [quiz.currentIndex, quiz.currentAnswer, optionKeys.join(",")]);

  useKeyboardShortcuts(shortcutHandlers, !attempt && !confirmSubmit);

  if (attempt) {
    return <QuizResults attempt={attempt} onRetry={onRetry} />;
  }

  if (confirmSubmit) {
    const unanswered = quiz.totalQuestions - quiz.answeredCount;
    const flaggedCount = quiz.flagged.size;
    return (
      <div className="mx-auto max-w-sm rounded-xl border bg-card p-6 text-center animate-fade-in">
        <h2 className="mb-2 text-lg font-bold">Submit Exam?</h2>
        <p className="mb-1 text-sm text-muted-foreground">
          {quiz.answeredCount}/{quiz.totalQuestions} answered
        </p>
        {unanswered > 0 && (
          <p className="text-xs text-amber-500">
            {unanswered} unanswered
          </p>
        )}
        {flaggedCount > 0 && (
          <p className="text-xs text-amber-500">
            {flaggedCount} flagged
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setConfirmSubmit(false)}
            className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Anti-cheat banner */}
      {showAntiCheatBanner && (
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
          <span className="text-muted-foreground">
            Exam mode — tab switches are tracked
            {violations > 0 && (
              <span className="ml-1 font-medium text-danger">({violations} detected)</span>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                requestFullscreen();
                setShowAntiCheatBanner(false);
              }}
              className="flex items-center gap-1 rounded border px-2 py-1 font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <Maximize2 className="h-3 w-3" />
              Fullscreen
            </button>
            <button
              onClick={() => setShowAntiCheatBanner(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <QuizProgress
          current={quiz.currentIndex}
          total={quiz.totalQuestions}
          answered={quiz.answeredCount}
        />
        {timeLimit && timeLimit > 0 && (
          <QuizTimer
            formatted={timer.formatted}
            timeRemaining={timer.timeRemaining}
            totalTime={timeLimit}
          />
        )}
      </div>

      <div className="animate-fade-in rounded-xl border bg-card p-5">
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
