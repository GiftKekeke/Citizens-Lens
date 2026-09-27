# Citizens Lens - Implementation Plan (Local Hosting)

Source of truth: `Document/Citizens ens PRD.md` (Sections 1-30). Positioning: "See your rights clearly - a citizen interface to the Constitution."
Core loop: Question -> Simple answer -> Understand -> See source -> Explore related -> Learn -> Return.

Hosting constraint: NO cloud hosting (no Vercel/Netlify). Everything runs on your local device. MVP scope is PRD Section 27 only.

---

## Phase 0 - Grounding & Constraints (Week 1)

Goal: lock what we will and will not build.

1. Confirm MVP in scope (PRD S27): Search, direct answers, Read More, original provision, Explore by situation/topic, Learn (2 paths), I Need Help Now (secondary), Save, Share (local URLs), source/version info.
2. Confirm explicitly out of MVP: Myth vs Constitution, glossary (seed only), What Changed?, court interpretation, other laws, audio, Nigerian-language, classroom tools.
3. Lock trust principles as acceptance criteria for every screen: source-first, plain language, no hidden interpretation, preserve qualifications, distinguish current vs proposed vs historical, neutrality, no legal advice.
4. Define success metrics from day one (PRD S29): searches, no-result rate, read-more rate, provisions viewed, learn completion, saves, shares, repeat use. Logged to a local file, no cloud analytics.

Exit: one-page MVP scope + non-goals signed off.

## Phase 1 - UX/UI Design (Weeks 1-3)

Goal: mobile-first design for non-legal users, tested from your PC onto your phone over WiFi.

1. User flows:
   - Home (search + situations + popular questions) -> Answer -> Read More -> Source -> Related
   - Explore -> Topic page -> Answer
   - Learn path -> Lesson -> Save/progress
   - I Need Help Now -> info cards (never dominates UI)
2. Wireframes (low-fi) for 5 screens: Home, Search results, Answer detail, Explore/Topic, Learn/Lesson. Follow PRD S6 answer structure exactly: Short answer -> What the Constitution says -> Read more -> Original provision -> Related topics.
3. Visual distinction system (critical): 3 styles that never mix - (a) Citizens Lens explanation, (b) Constitution quote, (c) metadata (section/version/date). Persistent disclaimer: "Constitutional information, not legal advice."
4. Design system: Tailwind, large tap targets, 16px+ body, high contrast, 1 font, minimal JS.
5. Accessibility: keyboard nav, screen-reader labels for quote vs explanation.

Deliverables: Figma (or pen/paper photos) + clickable prototype. Test with 5 non-lawyers asking "arrest / protest / expression" questions.

## Phase 2 - Architecture Decisions (Local-First)

Goal: free, local-first, no hallucination risk. No cloud, no cost.

Recommended stack (beginner-friendly, $0, local only - no cloud):
- App: Next.js (App Router) + TypeScript + Tailwind. Run with `npm run dev` (coding) or `npm run build && npm start` (production mode on localhost:3000). Alternative if React is too much: Vite + React. No backend, no native app, no cloud host.
- Content: JSON + Markdown in repo (`/content/provisions`, `/content/explanations`, `/content/topics`, `/content/lessons`). No CMS; edit in Git.
- Search (MVP): client-side Fuse.js over curated index of questions/topics/synonyms -> provision IDs. No live LLM. Works offline once loaded.
- Saved/progress: browser localStorage. No accounts, no database.
- Share: local routes `/s/35-personal-liberty` as local URLs (localhost or your LAN IP, e.g. `http://192.168.1.5:3000/s/35-personal-liberty`). Public link previews and SEO deferred until public hosting exists.
- Analytics: local event log file, no third-party tracker (search text hashed, no-result flag, read-more clicks).

How to view on your phone (same WiFi):
1. On PC: `npm run dev -- --hostname 0.0.0.0 --port 3000`
2. Find PC IP (Windows: `ipconfig`, look for IPv4 e.g. 192.168.1.5)
3. On phone browser: `http://192.168.1.5:3000`
4. Allow Node.js through the Windows firewall prompt when asked.

Key ADRs:
1. ADR-1 Local-first: runs on your device only - no deploy step, no hosting bill. Trade-off accepted: no public URL, no SEO; phone testing over same-WiFi LAN.
2. ADR-2 Curated answers only: every answer maps to provision ID(s); unknown queries show "no confident answer + related topics" rather than guessing.
3. ADR-3 Content/code split: constitution text immutable with `version`, `effectiveDate`, `status: current|proposed|historical`; explanations carry `provisionId`, `reviewedBy`, `reviewedAt`.
4. ADR-4 Search v1 keyword+synonym, v2 embeddings later. MVP must solve "arrest without telling me why" via synonym map (arrest/detain/police/warrant...).
5. ADR-5 No auth, no server DB in MVP.

Data model (minimal):
```ts
Provision { id, chapter, section, title, text, version, status, effectiveDate, sourceUrl }
Explanation { provisionId, shortAnswer, readMore, qualifications[], relatedIds[], reviewedAt }
Topic { slug, title, situation, provisionIds[], commonQuestions[] }
Lesson { slug, path: 'basics'|'scenarios', title, bodyMd, provisionIds[], order }
```

## Phase 3 - Content Pipeline (Weeks 2-4, parallel with design)

Goal: 30-50 high-quality answers beat 300 shallow ones.

1. Source constitution text (1999 Constitution as amended) into `provisions.json`. Prioritise Chapter IV Fundamental Rights Sections 33-46 + citizenship, elections, courts.
2. Author 12 Explore situations first (PRD S5): arrest & detention, personal liberty, expression, assembly, privacy, property, fair hearing, citizenship, elections, government powers, courts, duties.
3. For each: short answer (2-3 sentences) + read-more + qualifications + original quote + related links. Legal reviewer checks every file.
4. Build synonym map `everyday -> legal` (e.g. "protest" -> "peaceful assembly S40").
5. Seed 20 common questions + 15 glossary terms (stub only).

Exit: `npm run content:check` validates every explanation links to a real provision with version.

## Phase 4 - MVP Build (Weeks 4-8, slice by slice, all local)

Slice 1 - Search + Answer (heart):
- Search bar with suggestions, typo tolerance, "no confident answer" state logging the query locally.
- Answer page with progressive disclosure + source block + copy-link button (local URL).

Slice 2 - Explore + Topic + Library:
- Situation grid, topic template, library browser Parts -> Chapters -> Sections.

Slice 3 - Learn + Progress:
- Two paths, Markdown lesson renderer, progress bar via localStorage.

Slice 4 - Save / Share / Help Now:
- Bookmarks; share = copy local URL; Help Now cards with disclaimer.

Each slice: build -> content-check -> test on your phone via LAN URL.

## Phase 5 - Trust, Legal Safety & Quality

- Automated: broken provision links fail build; explanations without `qualifications` or `reviewedAt` fail build; proposed/historical content gets banner.
- Manual: lawyer review queue, neutrality checklist, "Constitution is not the entire law" notice where police/court procedure involves other statutes.
- Feedback widget stored locally: "Did this help? Yes/No" + "Report outdated info."

## Phase 6 - Testing & Performance (Local)

- Serve production build locally: `npm run build && npm start`, open `http://localhost:3000`, then the same via LAN on a real Android phone.
- Target: fast on localhost/LAN, PWA readable offline after first visit (localhost is a secure context for service workers).
- Tests: unit (search mapping), e2e (search -> answer -> source -> save -> share), content tests (every topic has 1+ provision).
- Accessibility audit + 5-user comprehension test: can users restate the answer and find the source?

## Phase 7 - Local Launch & Measure (No Public Deploy)

- No preview/production deploy, no sitemap/SEO (deferred until public hosting is approved).
- "Launch" = stable local build + demo over LAN. Keep a `demo-log.md` with top queries, top 20 no-results (drives next content sprint), read-more %, saves/shares.
- Start with 40 answers + 10 lessons; weekly content sprint adds top missing queries.

## Phase 8 - Post-MVP (only after core loop validated, needs hosting decision)

In order: public hosting decision -> glossary -> Myth vs Constitution -> What Changed? -> court interpretations -> other laws -> audio / Nigerian-language -> teacher packs.

---

## Risks

1. Inaccurate simplification -> reviewer gate + qualifications field.
2. Treating bills as law -> `status` field + banner.
3. Search with no answer -> log locally and author, never hallucinate.
4. Scope creep -> any feature outside S27 goes to Phase 8 backlog.
5. Local-only limits -> no public access or share previews; accepted for now, revisited in Phase 8.
