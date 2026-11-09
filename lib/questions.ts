import type { Question } from "./types";
import domain1 from "@/data/questions/domain1.json";
import domain2 from "@/data/questions/domain2.json";
import domain3 from "@/data/questions/domain3.json";
import domain4 from "@/data/questions/domain4.json";

const domainData: Record<number, Question[]> = {
  1: (domain1 as Omit<Question, "domain">[]).map((q) => ({ ...q, domain: 1 })),
  2: (domain2 as Omit<Question, "domain">[]).map((q) => ({ ...q, domain: 2 })),
  3: (domain3 as Omit<Question, "domain">[]).map((q) => ({ ...q, domain: 3 })),
  4: (domain4 as Omit<Question, "domain">[]).map((q) => ({ ...q, domain: 4 })),
};

export function getAllQuestions(): Question[] {
  return [...domainData[1], ...domainData[2], ...domainData[3], ...domainData[4]];
}

export function getQuestionsByDomain(domain: number): Question[] {
  return domainData[domain] ?? [];
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

export function getDomainForQuestion(questionId: string): number {
  for (const [domain, questions] of Object.entries(domainData)) {
    if (questions.some((q) => q.id === questionId)) return Number(domain);
  }
  return 0;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectExamQuestions(): Question[] {
  const counts: Record<number, number> = { 1: 16, 2: 20, 3: 22, 4: 7 };
  const selected: Question[] = [];

  for (const [domain, count] of Object.entries(counts)) {
    const domainQuestions = shuffleArray(domainData[Number(domain)]);
    selected.push(...domainQuestions.slice(0, count));
  }

  return shuffleArray(selected);
}

export function selectDomainQuestions(domain: number, count?: number): Question[] {
  const questions = shuffleArray(domainData[domain] ?? []);
  return count ? questions.slice(0, count) : questions;
}

export function selectQuickQuiz(count: number = 15): Question[] {
  return shuffleArray(getAllQuestions()).slice(0, count);
}
