# Citizens Lens — See Your Rights Clearly

## 1. What This Product Is

**Citizens Lens** is a citizen-focused civic education platform for Nigeria that makes the Nigerian Constitution searchable, understandable, and usable in plain language.

It is not a PDF viewer for the Constitution. It is a **citizen interface to the Constitution**:
Everyday question → simple answer → understandable explanation → original source.

Primary users: everyday Nigerian citizens with little or no legal background.
Secondary users: students, teachers, journalists, researchers, civil society organisations, community leaders.

Current stage: Product Requirements Document (PRD) phase. No application code yet. Source of truth is `Document/Citizens ens PRD.md`.

## 2. What Problem It Solves

The Constitution is available but not accessible. Availability does not equal accessibility.

Citizens with a PDF still cannot answer: *“What does this mean for me?”*

Citizens Lens translates:

`Legal language → searching documents → interpreting provisions`

into:

`Everyday question → simple answer → explanation → original source`

It specifically guards against:
- Oversimplification that strips qualifications/exceptions
- Presenting interpretation as constitutional text
- Confusing proposed amendments with current law
- Confusing the Constitution with the entire Nigerian law (other statutes, regulations, court decisions also matter)
- Drifting from constitutional information into personalised legal advice

## 3. Main Features

Per PRD §5-§27, MVP scope:

1. **Search (primary entry):** Ask in ordinary language, e.g. “Can the police arrest me without telling me why?” No section number required.
2. **Direct answers:** Short plain-language answer first, then What the Constitution says, Read more, Original provision, Related topics.
3. **Progressive disclosure:** Short answer → Read more → Detailed explanation → Original provision → Related information.
4. **Explore by Situation:** Browse by Arrest & detention, Personal liberty, Freedom of expression, Peaceful assembly, Privacy, Property, Fair hearing, Citizenship, Elections, Government powers, Courts & justice, Duties of citizens.
5. **Learn (2 paths):** Understand the Constitution (structured beginner journey) + Learn Through Real-Life Situations (scenario-based).
6. **Constitution Library:** Browse Parts → Chapters → Sections → Topics (secondary experience).
7. **Topic Pages + Common Questions:** Bridge search and structured learning.
8. **I Need Help Now:** Secondary access for urgent situations (arrested, detained, rights violated). Provides constitutional information only, clearly distinguished from legal advice.
9. **Save & Return:** Save provisions, questions, topics, lessons.
10. **Share:** Share a specific answer/provision, not a full PDF.
11. **Learning Progress:** Lightweight, e.g. 4 of 10 lessons completed.
12. **Source/version transparency:** Every explanation links to section, document/version, date. Distinguishes current text vs. proposed amendment vs. historical text vs. explanation.

Deferred (post-MVP): Myth vs Constitution, Glossary, What Changed?, Court interpretation, Other relevant laws, audio/Nigerian-language explanations, classroom resources.

Navigation: Home (search + situations + popular questions) / Explore / Learn / Saved.

Trust principles: source first, plain language, no hidden interpretation, context matters, current information, citizen-first, neutrality.

## 4. How to Use or Run It

There is no runnable app in this version — only product definition.

To use the current project:

1. Read the PRD:
   - `Document/Citizens ens PRD.md` (full spec, §§1-30)
2. Start with:
   - §5 Core User Experience, §6 Search Experience, §27 MVP
3. For implementation, follow next:
   - Define content model (Question → Explanation → Provision → Source)
   - Build Search → Answer → Original provision loop
   - Add Explore, Learn, Saved

Prerequisites for future code: to be defined when implementation starts (proposed: web app with search index over constitution text + CMS for plain-language explanations).

Legal boundary: This product provides constitutional information and education only. It does not provide legal advice.

## Project Structure

```
Citizens Lens/
  README.md
  Document/
    Citizens ens PRD.md
```
