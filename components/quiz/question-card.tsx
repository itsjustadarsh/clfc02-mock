"use client";

import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Circle, Square, CheckSquare } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  selectedAnswers: string[];
  onSelect: (selected: string[]) => void;
  showResult?: boolean;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswers,
  onSelect,
  showResult = false,
  disabled = false,
}: QuestionCardProps) {
  const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
  const optionKeys = Object.keys(question.options).sort();

  function handleOptionClick(key: string) {
    if (disabled || showResult) return;

    if (question.isMultiAnswer) {
      const newSelected = selectedAnswers.includes(key)
        ? selectedAnswers.filter((k) => k !== key)
        : [...selectedAnswers, key];
      onSelect(newSelected);
    } else {
      onSelect([key]);
    }
  }

  function getOptionState(key: string) {
    if (!showResult) {
      return selectedAnswers.includes(key) ? "selected" : "default";
    }
    const isCorrect = correctAnswers.includes(key);
    const isSelected = selectedAnswers.includes(key);
    if (isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";
    return "default";
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-lg font-medium leading-relaxed">{question.question}</p>
        {question.isMultiAnswer && (
          <p className="mt-2 text-sm text-muted-foreground">
            Select {correctAnswers.length} answers
          </p>
        )}
      </div>

      <div className="space-y-3">
        {optionKeys.map((key) => {
          const state = getOptionState(key);
          const isSelected = selectedAnswers.includes(key);
          const Icon = question.isMultiAnswer
            ? isSelected ? CheckSquare : Square
            : isSelected ? CheckCircle2 : Circle;

          return (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              disabled={disabled || showResult}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all",
                state === "default" && "border-border hover:border-muted-foreground/30 hover:bg-muted/50",
                state === "selected" && "border-primary bg-primary/5",
                state === "correct" && "border-success bg-success/5",
                state === "incorrect" && "border-danger bg-danger/5",
                (disabled || showResult) && "cursor-default"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {showResult && state === "correct" ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : showResult && state === "incorrect" ? (
                  <XCircle className="h-5 w-5 text-danger" />
                ) : (
                  <Icon className={cn(
                    "h-5 w-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
              </div>
              <div>
                <span className="font-medium text-muted-foreground">{key}.</span>{" "}
                <span>{question.options[key]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium text-primary">Explanation</p>
          <p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
