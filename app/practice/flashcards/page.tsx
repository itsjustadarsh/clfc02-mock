"use client";

import { useState } from "react";
import { selectFlashcards } from "@/lib/questions";
import { DOMAINS } from "@/lib/types";
import { FlashcardEngine } from "@/components/quiz/flashcard-engine";
import { Button3D } from "@/components/ui/button-3d";
import { playClick } from "@/lib/sounds";
import type { Question } from "@/lib/types";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FlashcardsPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [domain, setDomain] = useState<number | undefined>(undefined);
  const [count, setCount] = useState(20);
  const [key, setKey] = useState(0);

  function start() {
    setQuestions(selectFlashcards(domain, count));
    setStarted(true);
    setKey((k) => k + 1);
  }

  function reset() {
    setStarted(false);
    setKey((k) => k + 1);
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 animate-fade-in">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
            <Layers className="h-8 w-8 text-violet-500" />
          </div>
          <h1 className="mb-1 text-xl font-extrabold">Flashcards</h1>
          <p className="mb-5 text-sm text-muted-foreground">
            Flip through questions and sort by confidence.
          </p>

          <div className="mb-4">
            <p className="mb-2 text-sm font-bold">Domain</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => { playClick(); setDomain(undefined); }}
                className={cn(
                  "btn-3d rounded-xl px-3.5 py-2 text-sm font-bold transition-all",
                  domain === undefined
                    ? "bg-primary text-white btn-shadow-primary"
                    : "bg-muted btn-shadow-secondary"
                )}
              >
                All
              </button>
              {DOMAINS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { playClick(); setDomain(d.id); }}
                  className={cn(
                    "btn-3d rounded-xl px-3.5 py-2 text-sm font-bold transition-all",
                    domain === d.id
                      ? "bg-primary text-white btn-shadow-primary"
                      : "bg-muted btn-shadow-secondary"
                  )}
                >
                  D{d.id}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-sm font-bold">Cards</p>
            <div className="flex justify-center gap-2">
              {[10, 20, 30, 50].map((c) => (
                <button
                  key={c}
                  onClick={() => { playClick(); setCount(c); }}
                  className={cn(
                    "btn-3d rounded-xl px-3.5 py-2 text-sm font-bold transition-all",
                    count === c
                      ? "bg-primary text-white btn-shadow-primary"
                      : "bg-muted btn-shadow-secondary"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Button3D variant="primary" size="lg" onClick={start} className="w-full">
            Start Flashcards
          </Button3D>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <FlashcardEngine key={key} questions={questions} onReset={reset} />
    </div>
  );
}
