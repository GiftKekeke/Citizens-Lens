# Phase 5 - Trust, Legal Safety & Quality (Citizens Lens)

## Automated gates (in repo, all passing)
- [x] `npm run content:check`: every explanation links to a real provision with
      version + status; carries qualifications + reviewedAt; all related/topic/
      lesson links resolve; every lesson has a body.
- [x] `next build`: TypeScript + all routes green.
- [x] Status banner: any provision with status `proposed` or `historical`
      renders a banner (see answer page) so drafts never look like current law.

## Manual review queue (do before any content release)
1. Lawyer reads every new/changed explanation for oversimplification.
2. Neutrality check: no advocacy language, no telling users to confront
   authorities, no win-predictions, no personalised advice.
3. "Constitution is not the entire law" check: answers touching police
   procedure, courts or land point out that other laws apply.
4. Source check: quote matches the cited section; version/date correct.
5. Record reviewer + date in `reviewedAt` (content-check enforces presence).

## Neutrality checklist (per explanation)
- [ ] No political party, candidate or office-holder praised or attacked.
- [ ] No instruction to break or confront the law.
- [ ] Qualifications and exceptions preserved, not buried.
- [ ] Interpretation presented as explanation, quote presented as quote.

## Feedback loop (in app, on-device)
- "Did this help? Yes/No" on every answer → `cl-feedback` in localStorage.
- "Report outdated info" on every answer → `cl-reports` in localStorage.
- Weekly: review no-result queries (`cl-no-results`), negative feedback and
  reports; author or fix content; re-run `content:check` + build.

## Exit criteria
- [ ] Feedback widget on all answer pages, verified live.
- [ ] Non-current banner renders (code-reviewed; activates when first
      proposed/historical provision is added).
- [ ] This checklist signed off.
