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
  chapter: string;
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

export type Situation = {
  slug: string;
  title: string;
  blurb: string;
  answerSlugs: string[];
};
export type PopularQuestion = { q: string; slug: string };
export type Lesson = {
  slug: string;
  path: string;
  title: string;
  order: number;
  answerSlugs: string[];
};

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

export function getSituation(slug: string) {
  return situations.find((s) => s.slug === slug);
}

export function answersForProvision(provisionId: string) {
  return explanations.filter((e) => e.provisionId === provisionId);
}

export function lessonsForAnswers(answerSlugs: string[]) {
  return lessons.filter(
    (l) => l.path === "basics" || l.answerSlugs.some((s) => answerSlugs.includes(s))
  );
}

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// True if edit distance <= 1 (single substitution, insertion, deletion,
// or adjacent transposition). Both words must be length 4+.
function withinOneTypo(a: string, b: string) {
  if (a === b) return true;
  const m = a.length;
  const n = b.length;
  if (m < 4 || n < 4 || Math.abs(m - n) > 1) return false;
  if (m === n) {
    const diffs: number[] = [];
    for (let i = 0; i < m; i++) if (a[i] !== b[i]) diffs.push(i);
    if (diffs.length === 1) return true;
    if (
      diffs.length === 2 &&
      diffs[1] === diffs[0] + 1 &&
      a[diffs[0]] === b[diffs[1]] &&
      a[diffs[1]] === b[diffs[0]]
    )
      return true;
    return false;
  }
  const longer = m > n ? a : b;
  const shorter = m > n ? b : a;
  let i = 0;
  let j = 0;
  let skipped = false;
  while (i < longer.length && j < shorter.length) {
    if (longer[i] === shorter[j]) {
      i++;
      j++;
      continue;
    }
    if (skipped) return false;
    skipped = true;
    i++; // skip the extra char in the longer word
  }
  return true;
}

export function searchExplanations(query: string): Explanation[] {
  const tokens = norm(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];
  const scored = explanations.map((e) => {
    const hayWords = norm(
      `${e.question} ${e.shortAnswer} ${e.keywords.join(" ")}`
    ).split(" ");
    let score = 0;
    for (const t of tokens) {
      if (t.length < 3) continue;
      for (const w of hayWords) {
        if (w.length < 3) continue;
        if (w === t) score += 3;
        else if (
          Math.min(w.length, t.length) >= 4 &&
          (w.startsWith(t) || t.startsWith(w))
        )
          score += 2;
        else if (withinOneTypo(t, w)) score += 1;
      }
    }
    return { e, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.e);
}
