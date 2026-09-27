# Citizens Lens — Implementation Plan

Source of truth: `Document/Citizens ens PRD.md` (§§1–30). Positioning: *“See your rights clearly — a citizen interface to the Constitution.”*
Core loop: Question → Simple answer → Understand → See source → Explore related → Learn → Return.

This plan moves from design → architecture → build → launch. MVP scope is PRD §27 only.

---

## Phase 0 — Grounding & Constraints (Week 1)

Goal: lock what we will and will not build.

1. Confirm MVP in scope (PRD §27):
   Search, direct answers, Read More, original provision, Explore by situation/topic, Learn (2 paths), I Need Help Now (secondary), Save, Share, source/version info.
2. Confirm explicitly out of MVP: Myth vs Constitution, glossary (seed only), What Changed?, court interpretation, other laws, audio, Nigerian-language, classroom tools.
3. Lock trust principles as acceptance criteria for every screen:
   source-first, plain language, no hidden interpretation, preserve qualifications, distinguish current vs proposed vs historical, neutrality, no legal advice.
4. Define success metrics instrumentation from day one (PRD §29): searches, no-result rate, read-more rate, provisions viewed, learn completion, saves, shares, repeat use.

Exit: one-page MVP scope + non-goals signed off.

## Phase 1 — UX/UI Design (Weeks 1–3)

Goal: mobile-first design for non-legal users on low bandwidth.

1. User flows:
   - Home (search + situations + popular questions) → Answer → Read More → Source → Related
   - Explore → Topic page → Answer
   - Learn path → Lesson → Save/progress
   - I Need Help Now → info cards (never dominates UI)
2. Wireframes (low-fi) for 5 screens: Home, Search results, Answer detail, Explore/Topic, Learn/Lesson. Follow PRD §6 answer structure exactly:
   Short answer → What the Constitution says → Read more → Original provision → Related topics.
3. Visual distinction system (critical): 3 styles that never mix —
   (a) Citizens Lens explanation, (b) Constitution quote, (c) metadata (section/version/date). Add persistent disclaimer component: “Constitutional information, not legal advice.”
4. Design system: Tailwind, large tap targets, 16px+ body, high contrast, 1 font, minimal JS, works on 3G / small Android.
5. Accessibility: keyboard nav, screen-reader labels for quote vs explanation, 200KB initial page budget.

Deliverables: Figma (or pen/paper photos) + clickable prototype. Test with 5 non-lawyers asking “arrest / protest / expression” questions.

## Phase 2 — Architecture Decisions

Goal: cheap, static-first, no hallucination risk.

Recommended stack (beginner-friendly, free hosting):
- **App: Next.js (App Router) + TypeScript + Tailwind, deployed as static/PWA on Vercel or Netlify.** Alternative if React is too much: Vite + React. Do not start with a backend or native app.
- **Content: JSON + Markdown in repo** (`/content/provisions`, `/content/explanations`, `/content/topics`, `/content/lessons`). No CMS for MVP; edit in Git.
- **Search (MVP): client-side Fuse.js over curated index** of questions/topics/synonyms → provision IDs. No live LLM answering. This enforces accuracy and works offline.
- **Saved/progress: localStorage for MVP.** Accounts/backend only post-MVP.
- **Share: static routes** `/s/35-personal-liberty` with Open Graph cards.
- **Analytics: privacy-light event log** (search text hashed, no-result flag, read-more clicks).

Key ADRs:
1. ADR-1 Static-first PWA: low cost, fast on 3G, installable, offline reading.
2. ADR-2 Curated answers only: every answer maps to provision ID(s); unknown queries show “no confident answer + related topics” rather than guessing.
3. ADR-3 Content/code split: constitution text immutable with `version`, `effectiveDate`, `status: current|proposed|historical`; explanations carry `provisionId`, `reviewedBy`, `reviewedAt`.
4. ADR-4 Search v1 keyword+synonym, v2 embeddings later. MVP must solve “arrest without telling me why” via synonym map (arrest/detain/police/warrant…).
5. ADR-5 No auth, no server DB in MVP.

Data model (minimal):
```ts
Provision { id, chapter, section, title, text, version, status, effectiveDate, sourceUrl }
Explanation { provisionId, shortAnswer, readMore, qualifications[], relatedIds[], reviewedAt }
Topic { slug, title, situation, provisionIds[], commonQuestions[] }
Lesson { slug, path: 'basics'|'scenarios', title, bodyMd, provisionIds[], order }
```

## Phase 3 — Content Pipeline (Weeks 2–4, parallel with design)

Goal: 30–50 high-quality answers beat 300 shallow ones.

1. Source constitution text (1999 Constitution as amended) into `provisions.json`. Prioritise Chapter IV Fundamental Rights §§33–46 + citizenship, elections, courts.
2. Author 12 Explore situations first (PRD §5): arrest & detention, personal liberty, expression, assembly, privacy, property, fair hearing, citizenship, elections, government powers, courts, duties.
3. For each: short answer (2–3 sentences) + read-more + qualifications + original quote + related links. Legal reviewer checks every file for oversimplification.
4. Build synonym map `everyday → legal` (e.g. “protest” → “peaceful assembly §40”).
5. Seed 20 common questions + 15 glossary terms (stub, full glossary post-MVP).

Exit: `npm run content:check` validates every explanation links to a real provision with version.

## Phase 4 — MVP Build (Weeks 4–8, slice by slice)

Slice 1 — Search + Answer (heart):
- Search bar with suggestions, typo tolerance, “no confident answer” state logging the query.
- Answer page implements progressive disclosure + source block + share buttons.

Slice 2 — Explore + Topic + Library:
- Situation grid, topic template, library browser Parts → Chapters → Sections (secondary nav).

Slice 3 — Learn + Progress:
- Two paths, lesson renderer (Markdown), lightweight progress bar via localStorage.

Slice 4 — Save / Share / Help Now:
- Bookmark provisions/questions/lessons; shareable URLs; Help Now cards with disclaimer.

Each slice: build → content-check → usability test on a real phone.

## Phase 5 — Trust, Legal Safety & Quality

- Automated: broken provision links fail build; explanations without `qualifications` or `reviewedAt` fail build; proposed/historical content gets banner.
- Manual: lawyer review queue, neutrality checklist (no advocacy language), “Constitution ≠ entire law” notice where police/court procedure involves other statutes.
- Add feedback widget: “Did this help? Yes/No” + “Report outdated info.”

## Phase 6 — Testing & Performance

- Devices: low-end Android + Chrome, 3G throttling, target LCP < 2.5s, offline PWA read.
- Tests: unit (search mapping), e2e (search → answer → source → save → share), content tests (every topic has ≥1 provision).
- Accessibility audit + 5-user comprehension test: can users restate the answer and find the source?

## Phase 7 — Launch & Measure

- Deploy preview → production, sitemap + SEO for common questions.
- Dashboard: top queries, no-result top 20 (drives next content sprint), read-more %, saves/shares, return rate.
- Launch with 40 answers + 10 lessons; weekly content sprint adds top missing queries.

## Phase 8 — Post-MVP (only after core loop validated)

In order: glossary → Myth vs Constitution → What Changed? → court interpretations → other laws → audio / Nigerian-language → teacher packs.

---

## Risks

1. Inaccurate simplification → mitigate with reviewer gate + qualifications field.
2. Treating bills as law → mitigate with `status` field + banner.
3. Search with no answer → log and author, never hallucinate.
4. Scope creep → any feature outside §27 goes to Phase 8 backlog.
