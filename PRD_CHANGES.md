# PRD Changes & Decision Log (Citizens Lens)

The PRD (`Document/Citizens ens PRD.md`) is unchanged. This file records
decisions the owner made that differ from or narrow the PRD/plan, and why.

## 1. Hosting: cloud → local device (owner decision)
- **Was:** implementation plan proposed Vercel/Netlify free-tier hosting.
- **Changed to:** run everything on the owner's local device
  (`npm run dev` / `npm run build && npm start`, phone via same-WiFi LAN).
- **Why:** avoid any paid/hosted tool and keep full local control while learning.
- **Impact accepted:** no public URL, no SEO/sitemap, no public link previews;
  share = copy local URL. Public hosting moves to Phase 8.
- Recorded in: `IMPLEMENTATION_PLAN_LOCAL.md`, `PHASE_2_ARCH.md` (ADR-1).

## 2. Docker: deferred (owner decision)
- **Was:** option to containerise from day one.
- **Changed to:** no Docker for now; add it later on request.
- **Why:** beginner simplicity — one less system to learn during the MVP.
- **Safeguard:** app kept Docker-ready (pinned Node 24, no hardcoded hosts,
  content in files, no database). Recorded in: `PHASE_2_ARCH.md` (ADR-6).

## 3. Search engine: Fuse.js → custom matcher (implementation choice)
- **Was:** plan named Fuse.js for client-side search.
- **Changed to:** small dependency-free matcher (exact > prefix > 1-typo,
  stopword-filtered, ranked) in `web/app/content/data.ts`.
- **Why:** zero new dependencies, fully testable (`npm test` 8/8), sufficient
  for the current catalogue; verified live (`arerst pollice` → arrest answer).
- Fuse.js (or embeddings) remains a Phase 8 option if the catalogue outgrows it.

## 4. Launch content bar: 40+10 → v0.1 ships 13+2 (phased)
- **Was:** plan targets 40 answers + 10 lessons at launch.
- **Changed to:** v0.1 local build ships 13 answers + 2 lessons; weekly
  demand-driven sprints (via `/review` no-result log) close the gap.
- **Why:** working, verified core loop first; grow content from real queries.
- Recorded in: `web/demo-log.md`, `PHASE_7_LAUNCH.md`.
