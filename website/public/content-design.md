# Content Design (content-design.md)

## Overview

Every word this project ships should be **consistent, human, clear, and neutral**.

- **Consistent**: the same voice, spelling, and register rules on every surface, so a reader moving from the homepage to a component page to the journal never feels the author change.
- **Human**: specific, committed, rhythmically uneven prose. Text that could only have been written by someone who knows this project.
- **Clear**: plain verbs, one idea per sentence. A reader who has never seen the repo can follow it.
- **Neutral**: matter-of-fact, never promotional. State what a thing is and does, and let the specifics carry the weight. Nothing here needs selling.

This document governs all shipped prose: website page copy and metadata, journal entries, component descriptions, README and Storybook copy, release notes, commit bodies, and UI microcopy. It sits beside its siblings with a clean split: `design.md` owns how things look, `CLAUDE.md` owns where facts live (one authoritative home per fact, point instead of enumerating, no counts outside registries), and this file owns how sentences read.

Deliberately out of scope: the agent-facing markdown references. `CLAUDE.md`, `design.md`, `porting-guide.md`, skill instruction bodies, and this file itself are written for AI agents to parse, and their format optimises for that job: dense sections, bold markers, tables, and em dashes as structural separators. Those are formatting tools there, not voice, and this guide does not restyle them. They appear on /blueprints as artefacts, shown deliberately as they are. What IS in scope on those pages is the shell copy around them (titles, taglines, intros, metadata), which is shipped prose like any other.

One deliberate irony to note up front: the `##` headings in this file are Title Case because that is the file convention shared with `design.md`, while the rule for shipped copy is sentence case. The convention applies to the markdown spec files; the rule applies to what users read on the site.

A word on the origin of this document. The prose in this project is written by AI agents, and unedited AI prose has recognisable habits: hedged claims, uniform sentence lengths, promotional adjectives, and stock phrases that could sit in any project's docs without changing a word. This guide exists to strip those habits out. The test of success is not an AI detector score (see The Detector Question below); it is whether the copy reads like it was written by one careful person who knows this system inside out.

---

## Voice

**The system is the subject.** System documentation, the journal, and component pages use no first person. Write "The registry drives the sidebar", never "we built the registry to drive the sidebar". The exceptions are the case-study and about pages, where "I" and "we" are correct because a person is telling their own story, and genuine instructions, where "you" is correct because the reader is doing something ("Install the package, then import the stylesheet once").

**British spelling in prose, American in code.** Colour, behaviour, organising, centred. Code identifiers and tokens keep their American spellings (`--color-action-primary-bg`, the `color` CSS property), and prose never respells them. When a sentence names a token, the token wins.

**Sentence case everywhere.** Headings, buttons, nav labels, card titles: "Work experience", not "Work Experience". Title Case is reserved for proper nouns (Storybook, Material Symbols Rounded, Nunito Sans).

**No em dashes.** The character ( — ) is banned in shipped copy (the agent-facing markdown references are exempt; see Overview). The turns it used to carry survive by other means: a colon for "and here is the point", a comma or parentheses for an aside, or a full stop and a second sentence. Two short sentences are almost always stronger than one spliced long one.

**Concrete numbers over adjectives.** "Both themes resolve from one token layer" beats "a powerful theming system". If a claim deserves emphasis, give it a number, a name, or a mechanism. If it has none of those, it is probably decoration; cut it.

**No emoji in shipped copy.** Icons are Material Symbols Rounded, chosen deliberately; emoji are neither.

Four sentence-level moves recur in the strongest existing copy. They are encouraged, in moderation:

1. **Concession, then correction.** "Telling people a design system is themeable is easy. Showing them is harder."
2. **Mechanism, then consequence.** "Semantic tokens reference primitives, so overriding one primitive re-themes every component at once."
3. **Stakes as what breaks.** "The validator fails the build, so a stale count never reaches the site."
4. **Negative definition.** "Motion here is functional, not decorative."

Each earns its keep by carrying information. Used more than about once per page, any of them becomes a tic.

---

## Register by Surface

Each surface has its own shape. The full standard for a surface lives in one place; this table characterises each register in a line and points home.

| Surface | Person | Shape | The rule that matters | Full standard |
|---|---|---|---|---|
| Journal entries (`website/src/data/site-updates.json`) | None | Story paragraphs: what, why, outcome | Thematic stories, never commit digests; readable by someone who has never seen the repo | `.claude/skills/site-updates/SKILL.md` |
| Website page copy + metadata | None | Short paragraphs under sentence-case headings | The system is the subject; specifics over adjectives | This file |
| Case studies and about pages | "I" / "we" | Narrative prose with real numbers | A person tells their own story; claims carry evidence | This file |
| Case-study registry entries (`website/src/data/case-studies.json`) | None | `title` a name, `dek` one summary line | Shipped copy on /work and the home page; the dek makes one concrete claim | This file + case-studies validator |
| Component descriptions (`src/components/registry.json`) | None | One verbless fragment, ≤160 chars, ends in a full stop | One authoritative home: sidebar, metadata, and README all derive from it | This file + registry validator |
| README + `src/stories/Configure.mdx` | "You" for instructions | Install and usage copy | Production copy: the README ships in the npm tarball | `CLAUDE.md` (Registries section) |
| npm package description (`PACKAGE_DESCRIPTION` in `scripts/package-manifest.mjs`, mirrored in root `package.json`) | None | One fragment | Renders on the npmjs.com package page: production copy, same bar as the README | This file |
| `design.md` spec sections | None | Bold BEM class opener, then prose and tables | Specs state rules, not sales points | `design.md` |
| Skill `displayDescription` frontmatter | None | 1–3 factual sentences | Renders on the public /skills page; describe what it does, not how clever it is | This file |
| Release notes | "You" allowed | What's new, what breaks, how to install | Written for a consumer, not a maintainer | `.claude/skills/release/SKILL.md` |
| Commit bodies | None | 1–3 sentences of why | The diff shows what; the body explains why | `.claude/skills/ship/SKILL.md` |
| Audit and loop reports | None | Findings in plain English | The reader is a designer, not an analyst | The invoking skill |
| UI microcopy (labels, empty states, errors) | Imperative | A few words | Describe the next action, not the current state | Microcopy section below |
| Site-chat answers (generated at runtime) | Third person about Rob | Short paragraphs; markdown headings only in walkthroughs | The assistant is not Rob; site facts and general design knowledge stay visibly separate | `website/src/app/api/chat/persona.ts` |
| Hand-written corpus prose (the connective paragraphs in `scripts/generate-site-corpus.mjs`) | None | Short orienting paragraphs between derived blocks | The chat model can repeat any of it verbatim to a visitor: production copy, same bar as page prose | This file + `CLAUDE.md` (corpus boundary rules) |
| `/llms.txt` section intros (`website/src/app/llms.txt/route.ts`) | None | One line per section | Served publicly to crawlers and agents; describe, never promote | This file |

---

## Writing Principles

Five principles. Strong copy visibly demonstrates at least three of them; no copy may violate any of them.

1. **Specific beats general.** The test for every paragraph: could this have been written by someone who knows nothing about this project? If yes, it says nothing. The fix is always the same: add something only this project knows. A token name, a real count from a registry, the actual failure a validator prevents, the date something shipped.

2. **Commit.** Say the thing. No both-sidesing, no hedging a claim until nothing is asserted. "The build fails when the registry drifts" is a sentence; "the build should generally fail in most cases where the registry may have drifted" is fog. If a claim is genuinely uncertain, state the uncertainty as a fact ("JS-driven timings are not yet tokenized") rather than diluting the verb.

3. **Stay neutral.** Never promotional. No hype adjectives, no superlative without a number behind it, no exclamation marks doing an adjective's job. This project describes itself the way a good spec describes a component: what it is, what it does, what breaks if you misuse it. Readers trust the register precisely because it is not asking for trust.

4. **Plain words, one idea per sentence.** Used, not utilized. Has, not boasts. Is, not serves as. Every sentence advances exactly one idea; every paragraph does one job. If a sentence needs two commas and a semicolon to hold together, it is two sentences.

5. **Vary the rhythm.** Human prose is uneven. Mix sentences under ten words with sentences over twenty. Never write three sentences of similar length in a row. Let a short sentence land. Uniform 15-to-20-word sentences in a steady drumbeat are the single most reliable machine tell, and no word list fixes them.

---

## Words to Avoid

Density is the tell, not any single word. One "robust" in a technical claim is fine; three per page reads as filler. Two lists follow: hard bans, which have no legitimate use in this project's copy, and rationed words, which have a narrow literal use and are otherwise replaced.

### Hard Bans

| Never write | Write instead |
|---|---|
| delve, dive into (metaphorical) | dig into, look at, read |
| tapestry, symphony, beacon | (name the actual things) |
| a testament to | (state the evidence directly) |
| realm, landscape, ecosystem (metaphorical) | (name the actual area: the token layer, the docs site) |
| journey (metaphorical) | process, path, or the named steps |
| seamless, seamlessly | (say what actually connects, or cut) |
| game-changer, cutting-edge, next-level | (the claim, with a number) |
| unlock, unleash, empower | let, allow, enable |
| elevate (marketing sense) | improve, or the specific change |
| boasts, features (as a verb for "has") | has |
| synergy, paradigm | (say the actual relationship) |
| ever-evolving, fast-paced | (cut; nothing here evolves by itself) |
| myriad, plethora | many, or the number |
| it's worth noting, it is important to note | (just say the thing) |
| in conclusion, in summary | (end when done) |
| whether you're a X or a Y | (name the actual reader, or address no one) |

### Rationed

| Word | Legitimate use | Otherwise |
|---|---|---|
| robust | a specific resilience claim ("survives a missing peer dependency") | say what it survives |
| leverage | never as a verb; the noun is rare but real | use |
| crucial, pivotal, vital | almost never; one per document at most | important, or cut |
| comprehensive | a checkable claim ("every component has a page") | list what is covered |
| key (adjective) | sparingly; "the key fact" once per page | main, central |
| foster | never in system prose | build, encourage |
| showcase | the literal noun ("the component showcase") | show |
| underscore, highlight (verb) | rarely | show, make clear |
| streamline | never | simplify |
| utilize, facilitate | never | use; say what it does |
| deliver | shipping software, literally | make, provide, publish |

---

## Patterns to Avoid

Sentence- and structure-level tells. Each entry pairs the pattern with its repair.

**Em dash splicing.** Banned outright; see Voice. Repair with a colon, a comma, parentheses, or two sentences.

**Copula avoidance.** "The registry serves as the single source of truth" → "The registry is the single source of truth". Stands as, functions as, acts as, represents: all of these are "is" wearing a costume.

**Negative parallelism as a hook.** "It's not just a component library, it's a design language" → say what it is: "A component library and the design language behind it." The not-X-but-Y frame implies someone claimed X; nobody did.

**Rule-of-three adjective stacks.** "Fast, flexible, and scalable" → pick the one that matters and prove it: "Themeable at runtime by overriding one primitive." Three near-synonyms carry one word's worth of information.

**Participial significance tails.** "The tokens are generated from CSS, ensuring consistency and highlighting the system's rigour" → full stop after "CSS". If the consequence matters, give it its own sentence with its own evidence.

**Bolded-label bullets.** "**Performance:** the site is fast" is a table row pretending to be prose. Use a real table for enumerable facts, or write sentences.

**Boldface as seasoning.** Bold marks the one load-bearing term in a section, not every noun that felt important while writing. More than two bolded phrases per paragraph means none of them stand out.

**Title Case Headings.** Shipped copy uses sentence case; see Voice.

**Summary closers.** A final paragraph that restates the page adds nothing; a reader who reached it just read the page. End on the last fact.

**Throat-clearing openers.** "Let's explore the token system" → "The token system has three tiers." Start with the fact the reader came for.

**Macro-openers.** "In today's component-driven development landscape..." could open any article ever written. Start with this project.

**Fake specificity.** Numbers with no source are worse than no numbers. Every count on the site derives from a registry; every statistic in a case study is real. A number that cannot be traced is deleted, not rounded.

**Listicle filler.** A bullet that restates its heading in new words is padding. Every bullet must add a fact absent from the heading.

**Elegant variation.** Calling the same thing "the library", "the toolkit", "the collection", and "the suite" across four sentences is not variety, it is confusion. One name per thing, everywhere. The component library is "the library" or "the design system"; pick per page and hold it.

**Hedge stacking.** "Can potentially help improve" → "improves", or delete the claim. One hedge is a judgment; two is an evasion.

---

## Human Signals

Avoiding tells is half the work. The other half is the habits of human writing that machine prose lacks, and most of them are permissions rather than rules:

- **Plain verbs are allowed to be plain.** Wrote, not authored. Used, not utilized. Died, not passed away. Formal synonyms are the machine register.
- **Definitive claims are allowed when true.** "The first release shipped on 2026-07-26" and "this is the only surface that loads fonts at runtime" are human sentences. Machine prose hedges reflexively; a writer who knows the facts commits to them.
- **Natural hedges are allowed when honest.** "Very", "fairly", "tends to", "probably" are how people actually qualify claims. The banned hedges are the ceremonial ones ("it is worth noting that it may potentially...").
- **A little slack is allowed.** "In order to", "the fact that", "as a result of" are wordier than strictly necessary, and human. Prose optimised to maximum tightness reads machine-made. Do not pad deliberately; do stop sanding once a sentence sounds like speech.
- **Unevenness is the signature.** Paragraph lengths should differ. Some ideas deserve four sentences, others deserve five words. Resist the pull toward three medium sentences per paragraph, every paragraph.

Just as important is what not to treat as a tell. Perfect grammar is not a machine sign; careful people exist. Formal register is not a machine sign; specs are formal. Transition words are not a machine sign in themselves; only the ceremonial chains (furthermore, moreover, additionally, in conclusion) are. This guide targets specific measurable habits, not a vibe, and it should never be used to accuse prose of being machine-written on style alone.

---

## Microcopy

Rules for text inside the UI: labels, buttons, empty states, errors, tooltips. Component-specific applications live in that component's spec section in `design.md`; these are the general principles behind them.

- **Describe the next action, not the current state.** "Add your first component", not "No components yet". An empty state is an invitation, not a shrug.
- **Buttons are verbs.** "Save changes", "Copy token", "View source". A button labelled with a noun ("Settings") is navigation, not action; keep the distinction.
- **Taglines are not the section name.** The breadcrumb already says where the reader is. A component tagline says what the thing is for: "The main action element", not "Components".
- **Errors say what happened and what to do.** "The token name is already taken. Choose another." Never blame the user, never just state failure.
- **Sentence case, no terminal full stop on labels.** Fragments under about five words take no full stop; complete sentences (empty-state bodies, error explanations) do.
- **No exclamation marks.** The UI does not get excited.

---

## The Detector Question

This guide began with a goal: copy that would pass an AI detector. The honest version of that goal needs stating, because detectors themselves are unreliable and the wrong lesson is easy to learn.

Detectors estimate two proxies. Perplexity: how predictable each word is given the words before it. Burstiness: how much sentence length and structure vary. Machine prose scores low on both because models pick likely words at a steady rhythm. But the proxies misfire constantly. OpenAI withdrew its own detector after it caught only 26% of AI text while flagging 9% of human text as machine-written. A Stanford study found detectors flagged 61% of essays by non-native English speakers as AI, because plain vocabulary in even rhythm looks machine-like regardless of who wrote it.

The consequence for this project: passing a detector is a lagging indicator of following this guide, never a goal in itself. Prose that is specific, committed, and rhythmically uneven scores human as a side effect, because those are the properties the proxies approximate. Anything done purely to move a detector score (synonym-swapping, deliberate typos, tool-assisted "humanising") is a trick, and tricks produce prose that is worse for actual readers. Write for the reader who has never seen the repo; the detector follows.

---

## Self-Review Tests

Three tests before any prose ships. They take a minute and catch most failures.

1. **The stranger test.** Could this paragraph have been written by someone who knows nothing about this project? If yes, it fails. Fix: add a specific only this project knows.
2. **The pub test.** Read it aloud. Would you say this sentence to a colleague across a table? "This showcases our commitment to robust theming" fails the moment it leaves your mouth. Rewrite until it survives being spoken.
3. **The rhythm test.** Scan sentence lengths in the paragraph. Three similar lengths in a row fails. Fix: cut one sentence to under ten words, or merge two.

The on-demand audit for all of this is the `content-audit` skill (`.claude/skills/content-audit/SKILL.md`): it scans a page, a data file, or a whole surface against this document and reports violations with suggested rewrites.

---

## Iteration Guide

1. **A new tell appears in the wild**: add it to Words to Avoid or Patterns to Avoid with a replacement, in the same change that fixes the offending copy. A ban without a repair is not usable guidance.
2. **A rule fights good writing twice**: weaken it or delete it. This guide serves the copy, not the reverse. Record the change so the reasoning is not relitigated.
3. **A new prose surface appears** (a new page type, a new generated artefact): add a row to Register by Surface in the same change, with its authoritative home. A surface with no register drifts immediately.
4. **A rule here starts duplicating a skill's standard**: cut the duplication and point at the skill. One authoritative home per rule, same as facts (`CLAUDE.md` owns that principle).
5. **Before shipping prose**: run the three Self-Review Tests, and run the `content-audit` skill over anything longer than a paragraph. Before shipping code that carries prose, `npm run verify` still applies.

---

## Known Gaps

- **Alt text and accessibility copy**: image alt text, `aria-label` wording, and screen-reader-only text have no rules here yet. The a11y test suite enforces presence, not quality.
- **The word lists are seeded, not exhaustive**: they cover the tells observed in AI prose as of mid-2026. Model habits shift; the Iteration Guide covers additions.
- **No localisation stance**: the project ships in English only; nothing here addresses translation.
- **Enforcement is by audit, not build**: the `content-audit` skill is on-demand. No validator fails the build on a banned word, deliberately: most style calls need a reader, and a regex that mangles good writing to appease itself would be worse than drift.
