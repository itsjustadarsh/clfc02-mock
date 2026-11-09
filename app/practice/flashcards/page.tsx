"use client";

import { useState } from "react";
import { selectFlashcards } from "@/lib/questions";
import { DOMAINS } from "@/lib/types";
import { FlashcardEngine } from "@/components/quiz/flashcard-engine";
import type { Question } from "@/lib/types";
import { Layers } from "lucide-react";

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
        <div className="rounded-xl border bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
            <Layers className="h-7 w-7 text-violet-500" />
          </div>
          <h1 className="mb-1 text-xl font-bold">Flashcards</h1>
          <p className="mb-5 text-sm text-muted-foreground">
            Flip through questions and sort by confidence.
          </p>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Domain</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button
                onClick={() => setDomain(undefined)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  domain === undefined
                    ? "border-primary bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                All
              </button>
              {DOMAINS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDomain(d.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    domain === d.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  D{d.id}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-sm font-medium">Cards</p>
            <div className="flex justify-center gap-1.5">
              {[10, 20, 30, 50].map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
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
            Start Flashcards
          </button>
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
