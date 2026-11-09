export interface Question {
  id: string;
  question: string;
  options: Record<string, string>;
  answer: string | string[];
  explanation: string;
  isMultiAnswer: boolean;
  taskStatement?: string;
  services?: string[];
  domain: number;
}

export interface Domain {
  id: 1 | 2 | 3 | 4;
  name: string;
  shortName: string;
  weight: number;
  questionCount: number;
  description: string;
  color: string;
  examCount: number;
}

export const DOMAINS: Domain[] = [
  {
    id: 1,
    name: "Cloud Concepts",
    shortName: "Cloud",
    weight: 0.24,
    questionCount: 187,
    description: "Cloud value proposition, design principles, migration strategies, and economics",
    color: "blue",
    examCount: 16,
  },
  {
    id: 2,
    name: "Security and Compliance",
    shortName: "Security",
    weight: 0.30,
    questionCount: 247,
    description: "Shared responsibility model, security services, and compliance concepts",
    color: "red",
    examCount: 20,
  },
  {
    id: 3,
    name: "Cloud Technology and Services",
    shortName: "Technology",
    weight: 0.34,
    questionCount: 384,
    description: "AWS compute, storage, database, networking, and management services",
    color: "green",
    examCount: 22,
  },
  {
    id: 4,
    name: "Billing, Pricing, and Support",
    shortName: "Billing",
    weight: 0.12,
    questionCount: 232,
    description: "Pricing models, billing tools, and support plans",
    color: "orange",
    examCount: 7,
  },
];

export type QuizMode = "exam" | "domain" | "quick";

export interface QuizConfig {
  mode: QuizMode;
  domain?: 1 | 2 | 3 | 4;
  questionCount: number;
  timeLimit?: number;
}

export interface UserAnswer {
  questionId: string;
  selected: string[];
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  mode: QuizMode;
  domain?: number;
  date: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  passed: boolean;
  timeSpent: number;
  answers: UserAnswer[];
  questionIds: string[];
  domainBreakdown: DomainScore[];
}

export interface DomainScore {
  domain: number;
  correct: number;
  total: number;
}

export interface StudyTopic {
  title: string;
  slug: string;
  sections: StudySection[];
}

export interface StudySection {
  heading: string;
  points: string[];
  services?: ServiceInfo[];
  tip?: string;
  comparison?: ComparisonTable;
}

export interface ServiceInfo {
  name: string;
  description: string;
  keyFact: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
}
