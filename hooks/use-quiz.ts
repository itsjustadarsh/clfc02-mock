"use client";

import { useReducer, useCallback } from "react";
import type { Question, UserAnswer } from "@/lib/types";
import { checkAnswer } from "@/lib/scoring";

interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Map<string, string[]>;
  flagged: Set<string>;
  isComplete: boolean;
}

type QuizAction =
  | { type: "SELECT_ANSWER"; questionId: string; selected: string[] }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GO_TO"; index: number }
  | { type: "TOGGLE_FLAG"; questionId: string }
  | { type: "SUBMIT" };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const answers = new Map(state.answers);
      answers.set(action.questionId, action.selected);
      return { ...state, answers };
    }
    case "NEXT":
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
      };
    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };
    case "GO_TO":
      return {
        ...state,
        currentIndex: Math.max(0, Math.min(action.index, state.questions.length - 1)),
      };
    case "TOGGLE_FLAG": {
      const flagged = new Set(state.flagged);
      if (flagged.has(action.questionId)) {
        flagged.delete(action.questionId);
      } else {
        flagged.add(action.questionId);
      }
      return { ...state, flagged };
    }
    case "SUBMIT":
      return { ...state, isComplete: true };
    default:
      return state;
  }
}

export function useQuiz(questions: Question[]) {
  const [state, dispatch] = useReducer(quizReducer, {
    questions,
    currentIndex: 0,
    answers: new Map<string, string[]>(),
    flagged: new Set<string>(),
    isComplete: false,
  });

  const currentQuestion = state.questions[state.currentIndex];
  const currentAnswer = currentQuestion ? state.answers.get(currentQuestion.id) ?? [] : [];
  const answeredCount = state.answers.size;
  const totalQuestions = state.questions.length;
  const isFlagged = currentQuestion ? state.flagged.has(currentQuestion.id) : false;

  const selectAnswer = useCallback((questionId: string, selected: string[]) => {
    dispatch({ type: "SELECT_ANSWER", questionId, selected });
  }, []);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const goTo = useCallback((index: number) => dispatch({ type: "GO_TO", index }), []);
  const toggleFlag = useCallback((questionId: string) => {
    dispatch({ type: "TOGGLE_FLAG", questionId });
  }, []);
  const submit = useCallback(() => dispatch({ type: "SUBMIT" }), []);

  const getResults = useCallback((): UserAnswer[] => {
    return state.questions.map((q) => {
      const selected = state.answers.get(q.id) ?? [];
      return {
        questionId: q.id,
        selected,
        isCorrect: checkAnswer(q, selected),
      };
    });
  }, [state.questions, state.answers]);

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    currentAnswer,
    answeredCount,
    totalQuestions,
    isFlagged,
    isComplete: state.isComplete,
    questions: state.questions,
    answers: state.answers,
    flagged: state.flagged,
    selectAnswer,
    next,
    prev,
    goTo,
    toggleFlag,
    submit,
    getResults,
  };
}
