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
        <div className="rounded-xl border bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-xp/10">
            <Layers className="h-7 w-7 text-xp" />
          </div>
          <h1 className="mb-1 text-lg font-semibold">Flashcards</h1>
          <p className="mb-5 text-sm text-muted-foreground">Flip through questions and sort by confidence.</p>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Domain</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => { playClick(); setDomain(undefined); }}
                className={cn("btn rounded-lg px-3 py-2 text-sm", domain === undefined ? "btn-primary" : "btn-secondary")}
              >
                All
              </button>
              {DOMAINS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { playClick(); setDomain(d.id); }}
                  className={cn("btn rounded-lg px-3 py-2 text-sm", domain === d.id ? "btn-primary" : "btn-secondary")}
                >
                  D{d.id}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-sm font-medium">Cards</p>
            <div className="flex justify-center gap-2">
              {[10, 20, 30, 50].map((c) => (
                <button
                  key={c}
                  onClick={() => { playClick(); setCount(c); }}
                  className={cn("btn rounded-lg px-3 py-2 text-sm", count === c ? "btn-primary" : "btn-secondary")}
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
