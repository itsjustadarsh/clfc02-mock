"use client";

import { useState, useCallback } from "react";
import type { Question } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { addXP, addDailyProgress } from "@/lib/gamification";
import { playCorrect, playClick, playComplete } from "@/lib/sounds";
import { fireBurst } from "@/lib/confetti";
import { Button3D } from "@/components/ui/button-3d";
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

  const cards = reviewMode ? questions.filter((q) => reviewIds.has(q.id)) : questions;
  const card = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const flip = useCallback(() => { playClick(); setFlipped((f) => !f); }, []);

  const goNext = useCallback(() => {
    playClick();
    setFlipped(false);
    setCurrentIndex((i) => Math.min(i + 1, cards.length));
  }, [cards.length]);

  const goPrev = useCallback(() => {
    playClick();
    setFlipped(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const markKnown = useCallback(() => {
    if (!card) return;
    playCorrect();
    setKnownIds((s) => new Set(s).add(card.id));
    setReviewIds((s) => { const n = new Set(s); n.delete(card.id); return n; });
    addXP(3);
    addDailyProgress(1);
    goNext();
  }, [card, goNext]);

  const markReview = useCallback(() => {
    if (!card) return;
    playClick();
    setReviewIds((s) => new Set(s).add(card.id));
    setKnownIds((s) => { const n = new Set(s); n.delete(card.id); return n; });
    goNext();
  }, [card, goNext]);

  useKeyboardShortcuts({ " ": flip, ArrowRight: goNext, ArrowLeft: goPrev, g: markKnown, r: markReview }, !isComplete);

  if (isComplete) {
    const reviewCount = reviewIds.size;
    const knownCount = knownIds.size;
    const skipped = questions.length - knownCount - reviewCount;

    if (knownCount > 0) { playComplete(); fireBurst(); }

    return (
      <div className="mx-auto max-w-md animate-fade-in text-center">
        <div className="rounded-xl border bg-card p-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 animate-celebrate">
            <Layers className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-1 text-lg font-semibold">Deck Complete</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            {reviewMode ? "Review round finished" : `${cards.length} cards studied`}
          </p>

          {knownCount > 0 && (
            <div className="mb-4 flex items-center justify-center gap-1.5 text-xp animate-xp-pop">
              <Star className="h-4 w-4 fill-xp" />
              <span className="text-base font-semibold">+{knownCount * 3} XP</span>
            </div>
          )}

          <div className="mb-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-success/10 p-3">
              <div className="text-xl font-semibold text-success">{knownCount}</div>
              <div className="text-[10px] text-muted-foreground">Mastered</div>
            </div>
            <div className="rounded-lg bg-xp/10 p-3">
              <div className="text-xl font-semibold text-xp">{reviewCount}</div>
              <div className="text-[10px] text-muted-foreground">Review</div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-xl font-semibold">{skipped}</div>
              <div className="text-[10px] text-muted-foreground">Skipped</div>
            </div>
          </div>

          <div className="flex gap-3">
            {reviewCount > 0 && (
              <Button3D
                variant="ghost"
                size="md"
                onClick={() => { setReviewMode(true); setCurrentIndex(0); setFlipped(false); }}
                className="flex-1 gap-1.5"
              >
                <RotateCcw className="h-4 w-4" />
                Review ({reviewCount})
              </Button3D>
            )}
            <Button3D variant="primary" size="md" onClick={onReset} className="flex-1">
              New Deck
            </Button3D>
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
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          <span className="font-medium text-foreground">{currentIndex + 1}</span>/{cards.length}
          {knownIds.size > 0 && <span className="text-success"> · {knownIds.size} known</span>}
          {reviewIds.size > 0 && <span className="text-xp"> · {reviewIds.size} review</span>}
        </span>
        {domain && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">D{domain.id}</span>
        )}
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      <div className="perspective cursor-pointer" onClick={flip}>
        <div
          className={cn("preserve-3d relative transition-transform duration-500", flipped && "rotate-y-180")}
          style={{ minHeight: "280px" }}
        >
          <div className="backface-hidden absolute inset-0 rounded-xl border bg-card p-5">
            <div className="flex h-full flex-col">
              <p className="flex-1 text-sm font-medium leading-relaxed">{card.question}</p>
              {card.isMultiAnswer && (
                <p className="mt-2 text-xs text-muted-foreground">Select {correctAnswers.length} answers</p>
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Tap to flip · <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">Space</kbd>
              </p>
            </div>
          </div>

          <div className="backface-hidden rotate-y-180 absolute inset-0 overflow-auto rounded-xl border bg-card p-5">
            <div className="space-y-2">
              {optionKeys.map((key) => {
                const isCorrect = correctAnswers.includes(key);
                return (
                  <div
                    key={key}
                    className={cn(
                      "rounded-lg border p-3 text-sm",
                      isCorrect ? "border-success bg-success/5" : "border-border"
                    )}
                  >
                    <span className="font-medium text-muted-foreground">{key}.</span> {card.options[key]}
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

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="btn btn-secondary flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <Button3D variant="danger" size="md" onClick={markReview} className="flex-1 gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Review
        </Button3D>

        <button onClick={goNext} className="btn btn-secondary flex h-10 w-10 items-center justify-center rounded-lg">
          <SkipForward className="h-4 w-4" />
        </button>

        <Button3D variant="success" size="md" onClick={markKnown} className="flex-1 gap-1.5">
          <Check className="h-4 w-4" />
          Got it
        </Button3D>

        <button
          onClick={goNext}
          disabled={currentIndex >= cards.length - 1}
          className="btn btn-secondary flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-40"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
