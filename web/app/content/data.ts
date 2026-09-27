// Typed gateway over the JSON content in /content (single source of truth).
// Curated answers only: every explanation maps to a real provision ID.

import provisionsData from "../../content/provisions.json";
import explanationsData from "../../content/explanations.json";
import metaData from "../../content/meta.json";

export type Provision = {
  id: string;
  section: string;
  title: string;
  text: string;
  version: string;
  status: "current" | "proposed" | "historical";
  effectiveDate: string;
};

export type Explanation = {
  slug: string;
  question: string;
  keywords: string[];
  shortAnswer: string;
  constitutionSays: string;
  readMore: string;
  qualifications: string[];
  provisionId: string;
  relatedSlugs: string[];
  reviewedAt: string;
};

export type Situation = { slug: string; title: string };
export type PopularQuestion = { q: string; slug: string };
export type Lesson = { slug: string; path: string; title: string; order: number };

export const provisions = provisionsData as Provision[];
export const explanations = explanationsData as Explanation[];
export const situations = (metaData as { situations: Situation[] }).situations;
export const popularQuestions = (
  metaData as { popularQuestions: PopularQuestion[] }
).popularQuestions;
export const lessons = (metaData as { lessons: Lesson[] }).lessons;

export function getExplanation(slug: string) {
  return explanations.find((e) => e.slug === slug);
}

export function getProvision(id: string) {
  return provisions.find((p) => p.id === id);
}

export function searchExplanations(query: string): Explanation[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  return explanations.filter((e) => {
    const hay = `${e.question} ${e.shortAnswer} ${e.keywords.join(" ")}`.toLowerCase();
    return tokens.some((t) => hay.includes(t));
  });
}
