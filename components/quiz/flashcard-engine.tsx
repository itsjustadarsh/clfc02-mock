"use client";

import { useState, useCallback } from "react";
import type { Question } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { addXP, addDailyProgress } from "@/lib/gamification";
import { toast } from "sonner";
import { Check, RotateCcw, SkipForward, ArrowLeft, ArrowRight, Layers, Star } from "lucide-react";

interface FlashcardEngineProps {
  questions: Question[];
  onReset: () => void;
}

export function FlashcardEngine({ questions, onReset }: FlashcardEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const [reviewMode, setReviewMode] = useState(false);

  const cards = reviewMode
    ? questions.filter((q) => reviewIds.has(q.id))
    : questions;

  const card = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const goNext = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((i) => Math.min(i + 1, cards.length));
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const markKnown = useCallback(() => {
    if (!card) return;
    setKnownIds((s) => new Set(s).add(card.id));
    setReviewIds((s) => {
      const n = new Set(s);
      n.delete(card.id);
      return n;
    });
    // Award 3 XP for mastered card
    addXP(3);
    addDailyProgress(1);
    goNext();
  }, [card, goNext]);

  const markReview = useCallback(() => {
    if (!card) return;
    setReviewIds((s) => new Set(s).add(card.id));
    setKnownIds((s) => {
      const n = new Set(s);
      n.delete(card.id);
      return n;
    });
    goNext();
  }, [card, goNext]);

  useKeyboardShortcuts(
    {
      " ": flip,
      ArrowRight: goNext,
      ArrowLeft: goPrev,
      g: markKnown,
      r: markReview,
    },
    !isComplete
  );

  if (isComplete) {
    const reviewCount = reviewIds.size;
    const knownCount = knownIds.size;
    const skipped = questions.length - knownCount - reviewCount;

    return (
      <div className="mx-auto max-w-md animate-fade-in text-center">
        <div className="rounded-xl border bg-card p-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Layers className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-1 text-xl font-bold">Deck Complete</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            {reviewMode ? "Review round finished" : `${cards.length} cards studied`}
          </p>

          {knownCount > 0 && (
            <div className="mb-3 flex items-center justify-center gap-1.5 text-xp animate-xp-pop">
              <Star className="h-4 w-4" />
              <span className="text-sm font-bold">+{knownCount * 3} XP earned</span>
            </div>
          )}

          <div className="mb-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-success/10 p-3">
              <div className="text-2xl font-bold text-success">{knownCount}</div>
              <div className="text-xs text-muted-foreground">Mastered</div>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3">
              <div className="text-2xl font-bold text-amber-500">{reviewCount}</div>
              <div className="text-xs text-muted-foreground">Review</div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-2xl font-bold">{skipped}</div>
              <div className="text-xs text-muted-foreground">Skipped</div>
            </div>
          </div>

          <div className="flex gap-2">
            {reviewCount > 0 && (
              <button
                onClick={() => {
                  setReviewMode(true);
                  setCurrentIndex(0);
                  setFlipped(false);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Review Missed ({reviewCount})
              </button>
            )}
            <button
              onClick={onReset}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              New Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correctAnswers = Array.isArray(card.answer) ? card.answer : [card.answer];
  const optionKeys = Object.keys(card.options).sort();
  const domain = DOMAINS.find((d) => d.id === card.domain);

  return (
    <div className="mx-auto max-w-lg animate-fade-in">
      {/* Progress */}
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {currentIndex + 1}/{cards.length}
          {knownIds.size > 0 && (
            <span className="text-success"> · {knownIds.size} known</span>
          )}
          {reviewIds.size > 0 && (
            <span className="text-amber-500"> · {reviewIds.size} review</span>
          )}
        </span>
        {domain && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            D{domain.id}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        className="perspective cursor-pointer"
        onClick={flip}
      >
        <div
          className={cn(
            "preserve-3d relative transition-transform duration-500",
            flipped && "rotate-y-180"
          )}
          style={{ minHeight: "280px" }}
        >
          {/* Front */}
          <div className="backface-hidden absolute inset-0 rounded-xl border bg-card p-5">
            <div className="flex h-full flex-col">
              <p className="flex-1 text-base font-medium leading-relaxed">
                {card.question}
              </p>
              {card.isMultiAnswer && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Select {correctAnswers.length} answers
                </p>
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Tap to reveal answer · <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">Space</kbd>
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 overflow-auto rounded-xl border bg-card p-5">
            <div className="space-y-2">
              {optionKeys.map((key) => {
                const isCorrect = correctAnswers.includes(key);
                return (
                  <div
                    key={key}
                    className={cn(
                      "rounded-lg border p-2.5 text-sm",
                      isCorrect
                        ? "border-success bg-success/5"
                        : "border-border"
                    )}
                  >
                    <span className="font-medium text-muted-foreground">{key}.</span>{" "}
                    {card.options[key]}
                  </div>
                );
              })}
            </div>
            {card.explanation && (
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">{card.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          onClick={markReview}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 px-3 py-2 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-500/10"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Review
          <kbd className="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">R</kbd>
        </button>

        <button
          onClick={goNext}
          className="flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={markKnown}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-success/30 px-3 py-2 text-sm font-medium text-success transition-colors hover:bg-success/10"
        >
          <Check className="h-3.5 w-3.5" />
          Got it
          <kbd className="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">G</kbd>
        </button>

        <button
          onClick={goNext}
          disabled={currentIndex >= cards.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
