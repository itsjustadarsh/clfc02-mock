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
