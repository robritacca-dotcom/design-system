# Porting Guide (porting-guide.md)

## Overview

This document describes a working chat implementation abstractly enough to rebuild it inside a different design system, natively. It is written for a coding agent and the person operating it. The agent reads this guide, the reference implementation, and a target codebase; the output is first a viability report, then — if the report supports it — a rebuild that is 100% idiomatic to the target system.

**Reference implementation**: https://github.com/robritacca-dotcom/design-system (the chat is live on https://www.robertritacca.com). To re-point this guide at a different reference, change this one line.

**Target system**: the codebase the agent is run inside. This guide never assumes its framework, component model, token architecture, or conventions — discovering those is Phase 1's job.

The premise: the transferable value of a chat implementation is not its code. It is the decomposition (which pieces exist and where the seams are), the behavioural invariants (what the experience guarantees, verifiable without reading the reference), and the recorded traps (the non-obvious decisions that were each made for a reason). Code is disposable; those three survive any change of stack. This guide carries them, and the reference repo exists to be read for detail, not copied.

Two rules govern everything downstream:

1. **Report before code.** Phase 1 produces a viability report and nothing else. Building starts only after a human reads it.
2. **Native-first.** Wherever the target system's idiom conflicts with the reference, the target wins. The finished port must be indistinguishable from something the target team wrote themselves: its naming, file layout, comments, tests, and API shapes owe nothing visible to the reference or to this guide.

---

## The System in Four Layers

The chat is four layers with clean seams. A port can stop after any layer and still have something shippable; the layers are listed in the order they should be built.

| Layer | What it is | Portability |
|---|---|---|
| 1. UI primitives | The visual pieces: message, thread, composer, status line, reasoning disclosure, tool and citation chips, an AI entry button | The decomposition and accessibility contracts port; every visual decision resolves from the target's tokens |
| 2. State machine + transport | A UI-agnostic conversation hook and a transport interface that streams typed events | The highest-value transfer; deliberately independent of both the UI and the backend |
| 3. Backend | A streaming route: model call, context assembly, layered guardrails | The protocol and boundary decisions port; infrastructure specifics do not |
| 4. Eval | A golden set of question-and-assertion cases run against the real route | The method ports wholesale; the cases are rewritten for the target's content |

### Layer 1: UI Primitives

The chat surface decomposes into roles, not components — the target may already own some of them under other names:

- **A message row.** Two visual registers: the visitor's turns as compact bubbles on one side, the assistant's as plain full-width text. Assistant text is not boxed; it is the page speaking. A pending variant shows a typing indicator inside a polite live region.
- **A scrollable thread.** Owns the send choreography (see the invariants), a jump-to-latest control, and an auto-hiding scrollbar. It is a labelled, keyboard-focusable scroll region.
- **A composer.** A multi-line input that grows to a cap. Enter sends, Shift+Enter breaks a line. While a response streams, the send control becomes a stop control and Enter goes inert.
- **A live status line.** A single polite live region announcing what the assistant is doing ("Thinking", "Reading the site"). One region, updated in place — never a new announcement element per step, which would spam a screen reader.
- **A reasoning disclosure.** Collapsible; open while the model is thinking, auto-collapses when the answer starts unless the reader has toggled it themselves (a reader's explicit choice always outranks the automation). Renders as a summary line only when there is no trace to expand.
- **Supporting chips**: tool-call records, numbered citations, document attachments. Each is a disclosure or pill, not a message.
- **A distinct entry point.** The button that opens the chat is visually reserved for AI surfaces, so the treatment keeps meaning. If the target system has a reserved accent for primary actions, do not spend it here; give AI its own treatment or use a neutral one.

What is deliberately reference-specific: every colour, radius, shadow, spacing, and font decision; the class-naming scheme; the exact set of chips. The port keeps the roles and resolves every value from the target's design language.

### Layer 2: State Machine + Transport

The seam that makes everything else replaceable. A transport is one function: it takes the conversation so far plus an abort signal, and returns an async stream of typed events. The reference's event union, which has proven sufficient:

- `status` — a live progress label, optionally carrying one reasoning trace point
- `model` — the model serving the exchange, as a display label, so the composer reports what actually ran
- `delta` — a chunk of answer text
- `exchange` — the server's log id for the exchange, so a feedback verdict can be joined back to the logged question and answer
- `notice` — a guardrail outcome, rendered as a normal assistant message
- `error` — a failure phrased for humans, replacing anything shown so far
- `done` — terminal, always sent

A conversation hook consumes the stream and owns all state: the committed turns, the in-flight response, and a two-phase machine (thinking until the first `delta`, streaming after). It knows nothing about rendering and nothing about where events come from.

The payoff for that discipline is a **simulated transport**: a second implementation of the same interface that scripts realistic scenarios with no network and no key. The reference develops every UI behaviour against the sim and swaps in the real backend without touching a component. Build the sim first in any port; it converts the hardest layer to verify into one that runs in any environment.

### Layer 3: Backend

One streaming route. The reference streams newline-delimited JSON, one event per line, so the client parser is a line splitter; any framing works if both ends agree and partial lines are buffered. The response is assembled from stable-to-volatile: a persona block, a fixed knowledge corpus, then per-request context last — so a prompt cache can hold the expensive prefix while the tail varies.

Two decisions here matter more than any code:

- **The corpus is public-only, and authored-only, by construction.** Everything the model can see is text already published by the owner. The consequence: a successful prompt injection can produce off-brand prose but can never leak, because there is nothing to leak; and no third party's words sit in the context to inject from. In a company setting this is the load-bearing question of the whole port: what data is the chat allowed to see, who authored it, and what enforces that boundary at build time rather than by review.
- **Guardrails are layered and fail open.** Per-visitor rate limits, a site-wide daily breaker on message count and estimated spend, and a provider-level spend cap behind them all. If the limiter's store is unreachable, requests pass and the failure is logged — the last layer is the one that cannot have a bug in this codebase. Every guardrail outcome is a polite, in-character reply, not an HTTP error.

### Layer 4: Eval

A set of question-and-assertion cases run against the real route (never the raw model API — the route's guardrails, context assembly, and streaming are part of what is being tested). Cases are grouped by audience seat, assert on substrings and cited paths, and carry the facts an answer must contain. A build-time validator checks every required fact literally appears in the corpus, so "the chat cannot know this" fails before "the chat answered wrong". The standing rule that keeps the set honest: every wild failure becomes a case before it is fixed. The reference deliberately defers LLM-judged scoring until the set outgrows string assertions.

---

## Reading Order

For the agent, in the reference repo. Read in this order; each file is listed with the one thing to take from it.

| File | What to learn |
|---|---|
| `src/components/registry.json` | The `ai` category: the official primitive inventory and one-line role of each |
| `website/src/hooks/useChat.ts` | The event contract, the transport interface with its obligations, and the whole conversation state machine |
| `website/src/lib/chat-sim.ts` | The simulated transport: what "realistic enough to develop against" means |
| `website/src/lib/chat-transport.ts` | The real transport: framing, partial-line buffering, the first-byte watchdog |
| `src/components/ChatThread/ChatThread.tsx` | The send choreography: anchoring, the self-sizing spacer, the clamp guard. The most subtle file in the system; its comments are the spec |
| `src/components/Composer/Composer.tsx`, `src/components/ChatMessage/ChatMessage.tsx`, `src/components/Reasoning/Reasoning.tsx`, `src/components/AgentStatus/AgentStatus.tsx` | The primitive contracts: props, states, live-region choices |
| `website/src/components/SiteChat/SiteChatMount.tsx` | The panel: docked versus modal, focus management, scroll locking, resize |
| `website/src/components/SiteChat/ChatContext.tsx` | Why chat state lives above route navigation |
| `website/src/app/api/chat/route.ts` | Context assembly, cache placement, the error-shape rules, stream termination |
| `website/src/app/api/chat/guardrails.ts` | The layered limits and the fail-open stance |
| `evals/chat/README.md` and `evals/chat/golden-set.json` | The eval method and what a case looks like |

---

## Behavioural Invariants

These are the acceptance criteria for a port. Each is stated so it can be verified against the rebuilt system without reading the reference. Numbers are for citation in the viability report.

### Thread and Scroll

1. On send, the new user message pins to the top of the thread viewport, the prior conversation pushes up, and the reply streams in below it. Content arriving below the fold never moves the scroll position.
2. The scroll range ends exactly at the pinned message. A trailing spacer holds precisely the shortfall between the anchor and what the content can reach, recomputed continuously — it shrinks to nothing as the answer grows, so there is never dead space under the last line and never a jump when it closes.
3. When content above the fold shrinks mid-exchange (a thinking indicator unmounting as the answer starts), the pinned message does not sag: the position is restored instantly. The restore fires only on the signature of a browser clamp; a reader who scrolled up deliberately is left where they are.
4. The first send into an empty thread has no scroll distance, so its entrance is a transform: the message starts at composer level and rises to the anchor.
5. Opening the surface on an existing conversation shows the latest message instantly, with no entrance animation, and re-establishes the anchor so a still-streaming reply keeps its guarantees.
6. Clearing the conversation collapses the spacer and returns the scroll to the top.
7. The jump-to-latest control targets the bottom of the content, not the bottom of the scroll range, and hides when only spacer lies beyond the fold.
8. New-message detection counts rendered DOM children, not framework-level children — conditional slots that render nothing must not shift the anchor index.

### Streaming and State

9. Text reveal is paced, not raw: arrivals buffer, and a frame-driven loop reveals at whichever is faster, a floor rate or whatever drains the backlog within a fixed window. Pacing also coalesces renders, so markdown re-parses at most once per frame.
10. Under reduced motion, pacing is skipped entirely and text appears as it arrives.
11. Notices and errors are never paced. They are not the model speaking, so they appear whole.
12. On normal completion, the turn commits only after the reveal drains — the pacing is never undone in the last instant. Stop and reset flush immediately instead.
13. The in-flight turn and its committed form share one identity, minted at send, so the framework reconciles the finished response in place rather than remounting it.
14. The thinking phase ends at the first text delta, and the displayed thinking duration freezes at that moment.
15. UI-only placeholder text (stopped-early, came-back-empty, error copy) never enters the transport history. Real partial text does — it is genuine assistant speech.
16. Resetting during a stream cannot leak the aborted turn into the fresh conversation, and the fresh conversation accepts sends immediately.
17. Sending returns whether the send was accepted, so the caller knows not to clear the input on a rejected send.
18. The transport honours three obligations: close underlying readers when the consumer stops iterating, check the abort signal between yields, and run its own first-byte watchdog — the consumer has no timeout of its own.

### Panel and Accessibility

19. The surface has two modes with different contracts. Docked beside the page content (wide viewports): non-modal, no scrim, no focus trap, the page remains fully usable, and the page content insets to make room. Overlaying the page or fullscreen: modal — scrim, focus trap, body scroll locked, Escape closes.
20. Escape is layered: from fullscreen it returns to the panel, from the panel it closes. Inner handlers stop the event so outer ones cannot double-fire.
21. The composer receives focus on open, on new-chat, and after every send. On close, focus returns to the element that opened the surface only if that element is still in the document.
22. Body scroll locking is owner-counted: two overlays open at once must not fight, and the last to close unlocks.
23. Chat state lives above route navigation. A reply keeps streaming while the visitor reads a different page, and a typed draft survives navigation. A hard reload starts clean, deliberately.
24. Live announcements are minimal: one status region updated in place, plus terse state changes. Streamed answer text is never itself a live region.

### Server

25. Guardrail outcomes are a success response carrying a `notice`, never an error status. A visitor at a rate limit reads a reply, not a broken widget. Error statuses are reserved for malformed requests.
26. An `error` event may only be sent before the first text delta, because the client renders it by replacing what is on screen. Once text is flowing, a failure ends the turn normally and the partial answer stands.
27. The stream always terminates with `done`, in a `finally`. An unterminated stream strands the client.
28. Per-request page context is untrusted input: reduced to an inert character set (lowercase slug segments, capped short), dropped rather than rejected on failure, and placed after the cached prefix so it can never invalidate it. Nothing volatile precedes the cache breakpoint.
29. The server trims history to a fixed turn window and drops leading assistant turns after trimming (the model API requires the first message to be the user's).
30. Usage is counted whether or not the stream completes, and a client disconnect aborts the upstream model call so an abandoned tab stops the spend.
31. The response explicitly disables proxy buffering; a buffering hop would hold the whole reply and silently delete the streaming experience.

---

## Design Decisions and Traps

The why behind the invariants that look arbitrary. Every one of these was a bug or a near-miss in the reference; a rebuild that skips them re-derives them the hard way.

- **Anchoring runs in a layout effect** (before paint), not an ordinary effect. One un-anchored painted frame reads as jitter on every send.
- **The spacer is never zeroed before re-anchoring.** Collapsing the still-grown spacer first clamps the scroll upward for the start of the glide — a flash of the earlier conversation.
- **The anchor scroll passes no smooth/instant option.** The element's CSS scroll-behaviour decides, so the reduced-motion media guard makes it instant with zero JS branches. The one explicit instant scroll is the clamp-undo, because that is undoing a jump, not performing one.
- **The turns and the in-flight turn render as one flat array.** Split expressions are separate child slots to the framework, and the commit would remount instead of reconcile — a visible flicker at the end of every reply.
- **Reduced motion lives in the components' CSS**, not in JS checks. The single JS reduced-motion read in the whole surface is the reveal pacing, which has no CSS to live in.
- **The scrollbar gutter is measured and published as a CSS variable** so the content column stays symmetric and the scrollbar rides the far edge; it is zero on overlay-scrollbar platforms.
- **The markdown renderer needs table support and a scroll wrapper.** Real model output contains tables; plain CommonMark renders them as literal pipes, and a typography-only prose kit cannot wrap an element it does not render — the renderer must inject the wrapper.
- **Model reasoning arrives as prose and becomes trace points by sentence-splitting**: buffer, split on sentence ends, hold the trailing fragment until more arrives, drop trivia, cap the count. Rendering raw thinking deltas produces an unreadable ticker.
- **Measure before wiring reasoning UI.** In the reference, a model given a full answers-everything corpus produced zero thinking blocks across every effort level — reading an answer out of supplied context needs no reasoning, so effort became a cost dial and the reasoning display fires only on the rare question that earns it. The lesson generalises: verify the backend actually produces a signal before building UI that depends on it.
- **Visitor identifiers are hashed before they become rate-limit keys**, so the limiter's store cannot become a visitor log. Spend is tracked in integer sub-cent units and rounded up, so the daily breaker can only trip early, never drift late.
- **The breaker's refusal is a signpost, not a wall.** It trips on the busiest day the site has; its copy routes people somewhere useful instead of announcing failure.
- **The route answers politely when unconfigured.** Deploys land before their environment variables on purpose; a missing key yields an in-character notice, not a 500.
- **Anything user-visible that depends on the clock or the visitor is applied after hydration**, with space reserved — prerendered pages otherwise bake the build machine's clock into the HTML.
- **If chats are retained, the UI says so.** The reference's disclaimer states the retention window as a privacy disclosure tied to the actual log expiry; a port that logs exchanges inherits the obligation, in whatever form the target's privacy standard requires.

---

## What Not to Port

- **Any visual value.** Colours, radii, shadows, spacing, type, motion curves all resolve from the target's tokens. If the target reserves an accent for primary actions, the reference's rule transfers as a principle: do not spend it on AI decoration.
- **The timing constants.** These are roles; the reference's values are starting points, not answers. The roles a port must fill: a reveal floor rate and drain window; a scrollbar settle delay; a jump-control visibility threshold; a first-byte watchdog; a docked-mode breakpoint and panel width range; caps on message length, history turns, and trace points; per-visitor and site-wide rate limits.
- **The words.** Persona, greeting, starter prompts, notices, error copy, the disclaimer — all rewritten in the target's voice. Only the obligations transfer (a retention disclosure, guardrails that answer in character).
- **The corpus and its pipeline.** The generation mechanics are specific to the reference site. What transfers is the boundary: an explicit, build-enforced answer to "what is this chat allowed to see, and who wrote it".
- **The model, provider, and limits.** Layer 2's seam exists precisely so the backend is swappable; the port uses whatever the target organisation sanctions.
- **Framework mechanics.** Layout-effect timing, ref merging, context placement are one framework's spellings of the invariants. Port the invariant, not the spelling.

---

## Phase 1: The Viability Report

The deliverable is a report. No code, no scaffolding, no branches. The agent reads this guide, then the reference in the order above, then surveys the target system, and answers:

1. **Primitive mapping.** For each Layer 1 role: does the target have it, partially have it, or lack it? Name the target component that covers it, or the nearest neighbour.
2. **Seam feasibility.** Can the target's stack express the transport interface (an abortable async event stream) and the conversation hook? What is the idiomatic equivalent — and does anything in the target (state library, data layer, streaming conventions) already play this role?
3. **Streaming path.** Can the target's serving infrastructure stream incrementally to the client (no mandatory buffering hop)? Invariant 31 is the test.
4. **Accessibility fit.** How does the target system express live regions, focus trapping, and modal/non-modal surfaces? Do invariants 19–24 conflict with any established pattern?
5. **Markdown rendering.** What renders rich text in the target, and can it satisfy the table-wrapping trap?
6. **The data boundary.** What would this chat be allowed to know? Who decides, and what would enforce it at build time? This question outranks every other in a company context.
7. **Design-language conflicts.** Reserved colours, radius roles, motion vocabulary: where do the reference's visual roles collide with the target's rules, and what is the native resolution?
8. **Eval harness.** What would run the golden-set method against the target's route, and where would its cases' facts come from?

Report format, in this order:

- **Verdict per item**: a table mapping every Layer 1 role and every numbered invariant group to one of `maps cleanly` / `needs a design decision` / `no equivalent`, each with one sentence of evidence naming real target files or components.
- **Risks**: anything that threatens an invariant outright, with the invariant number.
- **Effort by layer**: relative sizing for Layers 1–4 in the target, and what each layer ships on its own.
- **Recommendation**: build now, build after named decisions, or do not build — committed, not hedged.

A report concluding "do not build" or "60% maps, three pieces need decisions first" is a success. The report exists to be right, not to be encouraging.

## Phase 2: The Build

Entered only after a human accepts the report.

- **Order**: Layer 2 first with the simulated transport (the whole UI becomes developable and demoable with no backend), then Layer 1 against the sim, then the panel, then Layer 3, then Layer 4.
- **Acceptance**: the numbered invariants, verified against the rebuilt system. Where the report flagged `needs a design decision`, the resolved decision replaces the invariant and is recorded in the target's own documentation.
- **Idiom**: every conflict resolves toward the target. Component APIs follow the target's prop conventions, files sit where the target puts files, tests use the target's harness, and copy is written to the target's content standard.
- **Definition of done**: a reviewer who knows the target system well, and has never seen the reference, reviews the port and finds nothing foreign — no naming echo, no comment that explains a decision by pointing elsewhere, no stylistic seam. The invariants hold, and nothing about the code says where they came from.
