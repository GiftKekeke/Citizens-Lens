# Phase 1 - UX/UI Design (Citizens Lens)

## 1. User flows
F1 Search: Home search -> results -> answer -> Read More -> source -> related -> save/share
F2 Explore: Explore grid -> topic page -> answer
F3 Learn: Learn paths -> lesson -> progress saved locally -> related answer
F4 Help Now: Home secondary card (or Explore) -> situation info cards -> disclaimer
F5 Library: Constitution Parts -> Chapters -> Sections (secondary nav only)

## 2. Screen specs (5 screens, see wireframes.html)
S1 Home: search bar, 12 situation chips, 6 popular questions, Help Now card (below fold)
S2 Search results: query echo, 3-5 answer cards (short answer + provision ref), no-result state
S3 Answer detail: short answer -> Read More (collapsed) -> original provision quote ->
  source/version meta -> related topics -> save/share (PRD S6 order, exact)
S4 Explore/Topic: situation grid + topic template (what it is, provisions, questions, lessons)
S5 Learn/Lesson: 2 paths, lesson body, progress bar (e.g. 4 of 10), next-lesson link

## 3. Design tokens (locked)
- Colors: primary #0E7A3D, dark #0A5C2E, bg #F4F6F3, ink #1A1A1A, muted #5C665E,
  line #DDE3DE, quote-bg #F0F7F1, warn-bg #FFF8E6 / warn-line #E0B400
- Type: system stack, body 17px/1.55, H1 28px, H2 20px, small/meta 13-14px
- Spacing: 8pt grid, card radius 10px, min tap target 44px, max width 480px column
- Content styles (never mix): .explain (green left border) vs .quote (tinted + italic
  blockquote) vs .meta (dashed grey) vs .disclaimer (yellow). See design-preview.html.

## 4. Accessibility checklist
- [ ] Keyboard: tab order search -> results -> read-more -> save/share
- [ ] Screen reader: quote vs explanation announced via headings/labels
- [ ] Contrast 4.5:1+ on body text, focus ring visible on all interactives
- [ ] No information by color alone (labels + borders, not just green)

## 5. Comprehension test script (5 non-lawyers)
Ask: "Can police arrest you without telling you why?" User must: (1) find short
answer in <60s, (2) restate it, (3) point to the original provision, (4) state
whether it is current law. Log failures as design bugs.

## Exit criteria
- [ ] All 5 screens viewable in wireframes.html on phone-width
- [ ] Answer screen follows PRD S6 order exactly
- [ ] Disclaimer on every answer + Help Now screen
Reply "approved" to proceed to Phase 2 (scaffold).
