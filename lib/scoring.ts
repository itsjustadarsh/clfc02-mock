import type { Question, UserAnswer, DomainScore } from "./types";

export function checkAnswer(question: Question, selected: string[]): boolean {
  const correct = Array.isArray(question.answer) ? question.answer : [question.answer];
  if (selected.length !== correct.length) return false;
  return correct.every((a) => selected.includes(a));
}

export function calculateScore(answers: UserAnswer[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter((a) => a.isCorrect).length;
  return Math.round((correct / answers.length) * 100);
}

export function calculateDomainBreakdown(
  answers: UserAnswer[],
  questions: Question[]
): DomainScore[] {
  const map = new Map<number, { correct: number; total: number }>();

  for (const answer of answers) {
    const q = questions.find((q) => q.id === answer.questionId);
    if (!q) continue;
    const entry = map.get(q.domain) ?? { correct: 0, total: 0 };
    entry.total++;
    if (answer.isCorrect) entry.correct++;
    map.set(q.domain, entry);
  }

  return Array.from(map.entries())
    .map(([domain, { correct, total }]) => ({ domain, correct, total }))
    .sort((a, b) => a.domain - b.domain);
}

export function isPassing(score: number): boolean {
  return score >= 70;
}
