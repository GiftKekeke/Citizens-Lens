# Phase 6 - Testing & Performance (Citizens Lens)

## Automated (all green, run locally)
- `npm test` — 8/8 pass (`tests/search.test.mjs`, node:test, no framework):
  exact match, transposition typo, insertion typo, double-typo ranking,
  synonym match, empty query, unrelated query (no-result path), keyword reachability.
- `npm run content:check` — 15 provisions, 13 explanations, 2 lessons,
  12 popular questions, all links resolve.
- `next build` — 37 pages, TypeScript clean.
- Production-mode check (`next start` on :3001, then stopped): answer pages
  serve with Save, feedback and full PRD S6 structure.

## Accessibility pass (code-reviewed)
- `lang="en"`, labelled search/suggestions/progressbar, aria-pressed on
  bookmarks, visible 3px focus ring on all interactives (globals.css).
- 17px body, 44px+ targets, single-column 480px layout, no color-only meaning.

## Manual device checklist (for you, on the dev server)
Dev server runs on :3000 — phone (same WiFi): `http://10.32.54.60:3000`.
- [ ] Open Home, Explore, an answer, a topic and a lesson on your phone.
- [ ] Type with typos (`arerst`) — arrest answer ranks first.
- [ ] Save an answer → check Saved page → remove it.
- [ ] Complete a lesson → progress bar moves on /learn.
- [ ] Submit a no-result search → confirm helpful empty state.
- [ ] Ask one non-lawyer to restate an answer and point at its source.

## Known limitations
- Search matcher is duplicated in `tests/` (TS app code can't run under
  `node --test` without a transpile step). Keep both in sync when changing scoring.
- Single-substitution collisions exist (e.g. "match"~"march"); ranking +
  stopwords contain them. Embeddings search is a Phase 8 item.
- No screen-reader device test yet — NVDA/VoiceOver run is outstanding.
