import type { QuizAttempt } from "./types";

const STORAGE_KEY = "clf-c02-attempts";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function saveAttempt(attempt: QuizAttempt): void {
  if (!isBrowser()) return;
  const attempts = getAttempts();
  attempts.unshift(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function getAttempts(): QuizAttempt[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getAttempt(id: string): QuizAttempt | undefined {
  return getAttempts().find((a) => a.id === id);
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function getStreak(): number {
  const attempts = getAttempts();
  if (attempts.length === 0) return 0;

  const days = new Set(
    attempts.map((a) => new Date(a.date).toDateString())
  );

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.has(d.toDateString())) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export function getTotalQuestionsAnswered(): number {
  return getAttempts().reduce((sum, a) => sum + a.totalQuestions, 0);
}
