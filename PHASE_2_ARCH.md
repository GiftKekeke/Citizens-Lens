# Phase 2 - Architecture Lock (Citizens Lens, Local-First, No Docker Yet)

## Locked decisions
- ADR-1 Local-first: run on your device only. `npm run dev` (coding),
  `npm run build && npm start` (local production on localhost:3000).
  Phone testing over same-WiFi LAN. No cloud, no bill.
- ADR-2 App: Next.js (App Router) + TypeScript + Tailwind. Reason: file-based
  routes map cleanly to answer/topic/lesson pages; static export friendly;
  beginner tutorials abundant. No backend, no native app.
- ADR-3 Content in repo as JSON + Markdown (`app/content/...` to start,
  migrating to `/content` at build slice). No CMS, no database.
- ADR-4 Search v1: Fuse.js client-side over curated index. No live LLM.
  Unknown query -> "no confident answer + related topics", logged locally.
- ADR-5 Saved/progress in localStorage. Share = copy local URL.
- ADR-6 Docker deferred: keep app Docker-ready (pinned Node version,
  no hardcoded hosts) but no Dockerfile until user requests it.
- ADR-7 Node LTS required on dev machine (installing this phase).

## App map (scaffold target)
- `app/` Home (search + situations + popular questions)
- `app/search/` results + no-result state
- `app/a/[slug]/` answer detail (PRD S6 order)
- `app/explore/` + `app/t/[slug]/` situations and topics
- `app/learn/` + `app/learn/[slug]/` lessons + progress
- `app/help-now/` info cards + disclaimer
- `app/library/` Parts -> Chapters -> Sections (secondary)
- `app/content/` seed JSON: 3 provisions, 3 explanations, 12 topics, 2 lessons

## Data contracts (v1, from plan)
Provision { id, chapter, section, title, text, version, status, effectiveDate }
Explanation { provisionId, shortAnswer, readMore, qualifications[], relatedIds[], reviewedAt }
Topic { slug, title, situation, provisionIds[], commonQuestions[] }

## Exit criteria
- [ ] Node LTS installed, `node --version` + `npm --version` work
- [ ] `npm run dev` serves Home on localhost:3000
- [ ] Same page opens on phone via LAN IP
- [ ] Seed content renders: 1 answer page in PRD S6 order
Reply "approved" to proceed to Phase 3 (content pipeline).
