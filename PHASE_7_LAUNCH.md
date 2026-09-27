# Phase 7 - Local Launch & Measure (Citizens Lens)

No public deploy, no SEO — this phase ships a stable local build plus a
measurement routine, per the local-hosting constraint.

## Launch checklist (v0.1)
- [x] `npm test` green · `content:check` green · `next build` 37 pages green
- [x] All MVP routes serve on dev (`:3000`) and production (`next start`) modes
- [x] Trust gates: source blocks, qualifications, disclaimer, feedback widget
- [x] `/review` page: on-device metrics (unanswered, votes, reports, saves)
- [x] `demo-log.md`: v0.1 entry + weekly sprint template
- [ ] Phone pass over LAN (owner checklist in PHASE_6_TESTING.md)
- [ ] 5-user comprehension test (script in PHASE_1_DESIGN.md)

## Weekly routine (30 min)
1. Open `/review` on the demo device.
2. Copy top unanswered queries + negative feedback into `demo-log.md`.
3. Author/fix content (lawyer reviews per PHASE_5_TRUST.md).
4. Run `npm test`, `content:check`, `next build`; log results.
5. Push via GitHub Desktop.

## Content runway
v0.1: 13 answers + 2 lessons. Plan target: 40 + 10. Each sprint should add
the top missing queries first (demand-driven, not assumed).

## Exit criteria
- [ ] Phone pass done · comprehension test done · findings logged.
- [ ] First weekly sprint completed and logged.
Phase 8 (post-MVP) starts only after the core loop is validated with real users.
