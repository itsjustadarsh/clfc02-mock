"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Question, AchievementDef, XPResult } from "@/lib/types";
import { getLesson, getQuestionsForLesson, isLessonUnlocked, completeLessonAttempt, scoreToStars } from "@/lib/lessons";
import type { Lesson } from "@/lib/lessons";
import { calculateDomainBreakdown, isPassing } from "@/lib/scoring";
import { saveAttempt, generateId, getProfile } from "@/lib/storage";
import {
  calculateXPForAttempt,
  addXP,
  addDailyProgress,
  updateQuestionStats,
  checkAchievements,
  getEncouragingMessage,
  getLevelProgress,
  getLevelUpMessage,
} from "@/lib/gamification";
import { playCorrect, playWrong, playComplete, playLevelUp, playAchievement, playSelect } from "@/lib/sounds";
import { fireCelebration, fireBurst, fireStars } from "@/lib/confetti";
import { Button3D } from "@/components/ui/button-3d";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Circle, Square, CheckSquare, X, Heart, Star, Trophy, Sparkles } from "lucide-react";

interface LessonClientProps {
  lessonId: string;
}

export function LessonClient({ lessonId }: LessonClientProps) {
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<{ questionId: string; selected: string[]; isCorrect: boolean }[]>([]);

  const [xpResult, setXpResult] = useState<XPResult | null>(null);
  const [newAchievements, setNewAchievements] = useState<AchievementDef[]>([]);
  const [lessonStars, setLessonStars] = useState(0);

  useEffect(() => {
    const l = getLesson(lessonId);
    if (!l || !isLessonUnlocked(lessonId)) {
      router.push("/learn");
      return;
    }
    setLesson(l);
    setQuestions(getQuestionsForLesson(lessonId));
  }, [lessonId]);

  const question = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;
  const correctAnswers = question ? (Array.isArray(question.answer) ? question.answer : [question.answer]) : [];
  const optionKeys = question ? Object.keys(question.options).sort() : [];

  function handleSelect(key: string) {
    if (checked) return;
    playSelect();
    if (question?.isMultiAnswer) {
      setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
    } else {
      setSelected([key]);
    }
  }

  function handleCheck() {
    if (selected.length === 0) return;
    const correct = correctAnswers.length === selected.length && correctAnswers.every((a) => selected.includes(a));
    setIsCorrect(correct);
    setChecked(true);
    setResults((prev) => [...prev, { questionId: question!.id, selected, isCorrect: correct }]);
    if (correct) playCorrect();
    else { playWrong(); setHearts((h) => h - 1); }
  }

  function handleContinue() {
    if (hearts <= 0 || currentIndex >= questions.length - 1) {
      finishLesson();
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected([]);
    setChecked(false);
    setIsCorrect(false);
  }

  function finishLesson() {
    if (!lesson) return;
    const finalCorrect = results.filter((r) => r.isCorrect).length;
    const finalScore = Math.round((finalCorrect / questions.length) * 100);
    const stars = scoreToStars(finalScore);
    setLessonStars(stars);
    completeLessonAttempt(lesson.id, finalScore);

    const userAnswers = results.map((r) => ({ questionId: r.questionId, selected: r.selected, isCorrect: r.isCorrect }));
    const attempt = {
      id: generateId(),
      mode: "domain" as const,
      domain: lesson.domain,
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      correctCount: finalCorrect,
      score: finalScore,
      passed: isPassing(finalScore),
      timeSpent: 0,
      answers: userAnswers,
      questionIds: questions.map((q) => q.id),
      domainBreakdown: calculateDomainBreakdown(userAnswers, questions),
    };

    saveAttempt(attempt);
    updateQuestionStats(userAnswers);
    addDailyProgress(questions.length);
    const xpEarned = calculateXPForAttempt(attempt);
    const xpRes = addXP(xpEarned);
    setXpResult(xpRes);
    const profile = getProfile();
    const achievements = checkAchievements(attempt, profile);
    setNewAchievements(achievements);

    playComplete();
    if (stars >= 2) fireCelebration();
    else fireBurst();
    if (xpRes.leveledUp) setTimeout(() => { playLevelUp(); fireStars(); }, 500);
    if (achievements.length > 0) setTimeout(() => playAchievement(), 800);
    setFinished(true);
  }

  function retry() {
    setCurrentIndex(0);
    setSelected([]);
    setChecked(false);
    setIsCorrect(false);
    setHearts(3);
    setFinished(false);
    setResults([]);
    setXpResult(null);
    setNewAchievements([]);
    setQuestions(getQuestionsForLesson(lessonId));
  }

  if (!lesson || questions.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // === FINISHED ===
  if (finished) {
    const finalCorrect = results.filter((r) => r.isCorrect).length;
    const finalScore = Math.round((finalCorrect / questions.length) * 100);
    const levelInfo = xpResult ? getLevelProgress(xpResult.totalXP) : null;

    return (
      <div className="mx-auto max-w-md px-4 py-10 animate-fade-in">
        <div className="rounded-xl border bg-card p-6 text-center">
          <div className="mb-4 flex justify-center gap-1 animate-celebrate">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-8 w-8 transition-all",
                  s <= lessonStars ? "text-xp fill-xp" : "text-muted-foreground/15"
                )}
              />
            ))}
          </div>

          <h2 className="text-xl font-semibold">
            {hearts > 0 ? "Lesson Complete!" : "Out of Hearts!"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {getEncouragingMessage(finalScore >= 60)}
          </p>

          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div>
              <div className="text-2xl font-bold text-primary">{finalScore}%</div>
              <div className="text-[10px] text-muted-foreground">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{finalCorrect}/{questions.length}</div>
              <div className="text-[10px] text-muted-foreground">Correct</div>
            </div>
          </div>

          {xpResult && (
            <div className="mt-4 animate-xp-pop">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-xp/10 px-4 py-1.5 text-base font-semibold text-xp">
                <Star className="h-4 w-4 fill-xp" />
                +{xpResult.newXP} XP
              </span>
            </div>
          )}

          {xpResult?.leveledUp && (
            <div className="mt-3 animate-level-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <Trophy className="h-3.5 w-3.5" />
                {getLevelUpMessage()}
              </span>
            </div>
          )}

          {levelInfo && (
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">Lv.{levelInfo.current.level}</span>
                {levelInfo.next && <span className="text-muted-foreground">{levelInfo.xpInLevel}/{levelInfo.xpForLevel}</span>}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="animate-shimmer h-full rounded-full" style={{ width: `${Math.max(levelInfo.progress * 100, 2)}%` }} />
              </div>
            </div>
          )}

          {newAchievements.length > 0 && (
            <div className="mt-4 space-y-2">
              {newAchievements.map((a) => (
                <div key={a.id} className="animate-slide-up flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-left">
                  <Trophy className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs font-medium">{a.title}</div>
                    <div className="text-[10px] text-muted-foreground">{a.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button3D variant="ghost" size="md" onClick={() => router.push("/learn")} className="flex-1">
              Back
            </Button3D>
            <Button3D variant="primary" size="md" onClick={retry} className="flex-1">
              Try Again
            </Button3D>
          </div>
        </div>
      </div>
    );
  }

  // === QUIZ ===
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 animate-fade-in">
      {/* Top bar */}
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.push("/learn")} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-1 text-danger">
          <Heart className="h-4 w-4 fill-danger" />
          <span className="text-sm font-semibold">{hearts}</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-5">
        <p className="text-base font-medium leading-relaxed sm:text-lg">{question.question}</p>
        {question.isMultiAnswer && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Select {correctAnswers.length} answers
          </p>
        )}
      </div>

      {/* Options */}
      <div className="mb-5 space-y-2">
        {optionKeys.map((key) => {
          const isSelected = selected.includes(key);
          const isCorrectOption = correctAnswers.includes(key);

          let state = "default";
          if (checked) {
            if (isCorrectOption) state = "correct";
            else if (isSelected && !isCorrectOption) state = "incorrect";
          } else if (isSelected) {
            state = "selected";
          }

          const Icon = question.isMultiAnswer
            ? isSelected ? CheckSquare : Square
            : isSelected ? CheckCircle2 : Circle;

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              disabled={checked}
              className={cn(
                "option-btn flex w-full items-start gap-3 p-3 text-left text-sm",
                state === "selected" && "selected",
                state === "correct" && "correct",
                state === "incorrect" && "incorrect",
                checked && "cursor-default",
              )}
            >
              <div className="mt-0.5 shrink-0">
                {checked && state === "correct" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : checked && state === "incorrect" ? (
                  <XCircle className="h-4 w-4 text-danger" />
                ) : (
                  <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                )}
              </div>
              <div className="flex-1">
                <span className="font-medium text-muted-foreground">{key}.</span>{" "}
                {question.options[key]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {checked && question.explanation && (
        <div className={cn(
          "mb-5 rounded-xl p-4 animate-slide-up",
          isCorrect ? "bg-success/5 border border-success/20" : "bg-danger/5 border border-danger/20"
        )}>
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? <Sparkles className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
            <span className={cn("text-sm font-medium", isCorrect ? "text-success" : "text-danger")}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{question.explanation}</p>
        </div>
      )}

      {/* Action */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 sm:static sm:border-0 sm:bg-transparent sm:p-0">
        {!checked ? (
          <Button3D variant="primary" size="lg" disabled={selected.length === 0} onClick={handleCheck} className="w-full">
            Check
          </Button3D>
        ) : (
          <Button3D
            variant={isCorrect ? "success" : "danger"}
            size="lg"
            onClick={handleContinue}
            className="w-full"
          >
            {hearts <= 0 || currentIndex >= questions.length - 1 ? "See Results" : "Continue"}
          </Button3D>
        )}
      </div>

      <div className="h-20 sm:hidden" />
    </div>
  );
}
