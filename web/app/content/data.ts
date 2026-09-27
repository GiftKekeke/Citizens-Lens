// Seed content for Citizens Lens MVP (Phase 2).
// Curated answers only: every explanation maps to a real provision ID.

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

export type Topic = {
  slug: string;
  title: string;
  situation: string;
  provisionIds: string[];
  commonQuestions: { q: string; slug: string }[];
};

export const provisions: Provision[] = [
  {
    id: "s35",
    section: "Section 35",
    title: "Right to personal liberty",
    text: "\u201CEvery person shall be entitled to his personal liberty and no person shall be deprived of such liberty save in the following cases ...\u201D (excerpt, 1999 Constitution as amended).",
    version: "1999 Constitution as amended",
    status: "current",
    effectiveDate: "1999-05-29",
  },
  {
    id: "s36",
    section: "Section 36",
    title: "Right to fair hearing",
    text: "\u201CIn the determination of his civil rights and obligations ... a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal ...\u201D (excerpt, 1999 Constitution as amended).",
    version: "1999 Constitution as amended",
    status: "current",
    effectiveDate: "1999-05-29",
  },
  {
    id: "s40",
    section: "Section 40",
    title: "Right to peaceful assembly and association",
    text: "\u201CEvery person shall be entitled to assemble freely and associate with other persons ...\u201D (excerpt, 1999 Constitution as amended).",
    version: "1999 Constitution as amended",
    status: "current",
    effectiveDate: "1999-05-29",
  },
];

export const explanations: Explanation[] = [
  {
    slug: "arrest-reasons",
    question: "Can the police arrest me without telling me why?",
    keywords: ["arrest", "detain", "detention", "police", "reason", "liberty", "cell"],
    shortAnswer:
      "No. The police must tell you why you are being arrested. This is part of your right to personal liberty under the Constitution.",
    constitutionSays:
      "Section 35 protects your personal liberty: no one may take it away except for reasons the law allows.",
    readMore:
      "Personal liberty means you cannot be locked up without a lawful reason. If you are arrested, you must be told the reason promptly and brought before a court within a reasonable time. Some situations, such as an arrest under a court order, have extra rules set out in other laws.",
    qualifications: [
      "The Constitution allows exceptions (for example, arrests carrying out a court order).",
      "Other laws and court decisions also affect arrests — the Constitution is not the whole answer.",
    ],
    provisionId: "s35",
    relatedSlugs: ["fair-hearing-meaning", "peaceful-assembly"],
    reviewedAt: "2026-09-27",
  },
  {
    slug: "fair-hearing-meaning",
    question: "What does the right to fair hearing mean?",
    keywords: ["fair", "hearing", "court", "trial", "judge", "case"],
    shortAnswer:
      "It means any case about your rights must be decided fairly, within a reasonable time, by a court or tribunal.",
    constitutionSays:
      "Section 36 gives you the right to a fair hearing within a reasonable time.",
    readMore:
      "Seed explanation (Phase 2). A fuller plain-language version with qualifications will be authored in Phase 3.",
    qualifications: ["Applies to civil rights and criminal charges; details differ between the two."],
    provisionId: "s36",
    relatedSlugs: ["arrest-reasons"],
    reviewedAt: "2026-09-27",
  },
  {
    slug: "peaceful-assembly",
    question: "Can I peacefully protest?",
    keywords: ["protest", "assembly", "demonstration", "march", "gather", "associate"],
    shortAnswer:
      "The Constitution protects peaceful assembly, but the right has limits set by law — for example around public order and the rights of others.",
    constitutionSays:
      "Section 40 protects your right to assemble freely and associate with others.",
    readMore:
      "Seed explanation (Phase 2). A fuller plain-language version with qualifications will be authored in Phase 3.",
    qualifications: ["Not an absolute right; laws on public order and other people's rights can limit it."],
    provisionId: "s40",
    relatedSlugs: ["arrest-reasons"],
    reviewedAt: "2026-09-27",
  },
];

export const situations = [
  { slug: "arrest-detention", title: "Arrest & detention" },
  { slug: "personal-liberty", title: "Personal liberty" },
  { slug: "expression", title: "Freedom of expression" },
  { slug: "assembly", title: "Peaceful assembly" },
  { slug: "privacy", title: "Privacy" },
  { slug: "property", title: "Property" },
  { slug: "fair-hearing", title: "Fair hearing" },
  { slug: "citizenship", title: "Citizenship" },
  { slug: "elections", title: "Elections & political participation" },
  { slug: "government-powers", title: "Government powers" },
  { slug: "courts", title: "Courts & justice" },
  { slug: "duties", title: "Duties of citizens" },
];

export const popularQuestions = [
  { q: "What are my rights if I'm arrested?", slug: "arrest-reasons" },
  { q: "Can I peacefully protest?", slug: "peaceful-assembly" },
  { q: "What does fair hearing mean?", slug: "fair-hearing-meaning" },
];

export const lessons = [
  { slug: "what-is-a-constitution", path: "basics", title: "What is a constitution?", order: 1 },
  { slug: "arrested-what-rights", path: "scenarios", title: "You're arrested. What are your rights?", order: 1 },
];

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
