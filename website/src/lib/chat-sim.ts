import type { ReactNode } from "react";
import type { ChatEvent, ChatTransport, ChatTransportMessage } from "@/hooks/useChat";

/* ============================================
   Simulated chat transport.

   Build 1 runs the widget entirely on this: scripted status steps at a
   steady beat, a handoff pause, then word-cadence deltas — the same event
   stream the real /api/chat transport will produce in Build 2, so the
   widget cannot tell the difference.

   On top of the rotation, a branching story: every chip the stage offers —
   the three starters and each answer's follow-ups — routes to a scripted
   node, and each path shows off different rich elements (cards, charts,
   tool calls, an approval). The nodes hold text only; the rich elements
   come in through the `content` map the playground passes at creation,
   keyed by `contentKey`, because JSX cannot live in this .ts module.
   Typed free text falls back to the scenario rotation below.

   Beats carried over from the original scratch-page sim.
   ============================================ */

const STATUS_MS = 1600;
const HANDOFF_MS = 350; /* beat for the components' live→done handoff */
const STREAM_MS = 30;

interface SimScenario {
  steps: { status: string; point: string }[];
  response: string;
  /** The follow-up chips offered under the finished answer. Scripted here
      because the sim has no backend to write them: on the site they come
      from a model reading the answer (see lib/chat-followups). Written copy,
      so the chip budget is held by scripts/validate-chat-starters.mjs — the
      route's runtime filter never sees these. */
  followups: string[];
}

/* Scenarios rotate per exchange so a test conversation stays varied:
   short plain answers through long sectioned ones, exercising the Prose
   typography kit (headings, paragraphs, bullets) and below-the-fold
   scrolling. The stage plays a small-business payroll and HR product, so
   typed free text lands on a business owner's questions. */
const SCENARIOS: SimScenario[] = [
  {
    steps: [
      { status: "Checking this month's payroll", point: "The next run is scheduled and funded." },
      { status: "Reviewing the filings", point: "Federal and state filings are current." },
      { status: "Drafting the answer", point: "Lead with the status, then flag the one open item." },
    ],
    response:
      "Payroll is in good shape. Friday's run is funded, direct deposits " +
      "land Monday, and your filings are current. The one item I would " +
      "watch is the **contractor invoice** from your designer, since it is " +
      "still waiting on your approval.",
    followups: [
      "How is headcount trending?",
      "File the state tax forms",
      "What do the plans include?",
    ],
  },
  {
    steps: [
      { status: "Pulling the payroll numbers", point: "Six months of payroll and headcount data." },
      { status: "Checking the compliance calendar", point: "One filing lands this month." },
      { status: "Reading the benefits usage", point: "Enrolment is steady; dental is underused." },
      { status: "Structuring the answer", point: "Three sections: costs, team, compliance." },
    ],
    response:
      "Here is the shape of the business right now.\n\n" +
      "### Payroll costs\n\n" +
      "Monthly payroll has held steady around your budget for the last " +
      "quarter. Overtime is the one line that moved, up a little in the " +
      "busy weeks, and it settled back down last month.\n\n" +
      "### The team\n\n" +
      "A few things worth knowing:\n\n" +
      "- Headcount has grown by two this quarter, both full time.\n" +
      "- Everyone is enrolled in medical; dental is sitting at half the " +
      "team.\n" +
      "- One offer letter is out and waiting on a signature.\n\n" +
      "### Compliance\n\n" +
      "Your quarterly state filing is due at the end of the month. " +
      "Everything it needs is already in the system, so it is a review and " +
      "a submit rather than a scramble.",
    followups: [
      "How is headcount trending?",
      "File the state tax forms",
      "Add my new hire to payroll",
    ],
  },
  {
    steps: [
      { status: "Reading the benefits setup", point: "Medical, dental, and retirement are live." },
      { status: "Drafting the answer", point: "Three bullets, then the next step." },
    ],
    response:
      "Your benefits today, at a glance:\n\n" +
      "- **Medical**: the whole team is enrolled, renewal lands in " +
      "November.\n" +
      "- **Dental and vision**: offered, about half the team opted in.\n" +
      "- **Retirement**: the 401k is live with a three percent match.\n\n" +
      "Open enrolment is the natural moment to revisit any of these, and I " +
      "can walk you through the options when it opens.",
    followups: [
      "What do the plans include?",
      "How is headcount trending?",
      "Raise default PTO to 15 days",
    ],
  },
  {
    steps: [
      { status: "Reviewing the quarter", point: "Two hires, one filing, one policy change." },
      { status: "Pulling the pay run history", point: "Six runs, all on time." },
      { status: "Structuring the answer", point: "What happened, then what is coming." },
    ],
    response:
      "A steady quarter. The highlights:\n\n" +
      "### What happened\n\n" +
      "- Six payroll runs went out, all on time, all funded from the " +
      "operating account.\n" +
      "- Two new hires onboarded with their paperwork done before day " +
      "one.\n" +
      "- The quarterly federal filing went in two weeks early.\n\n" +
      "### What is coming\n\n" +
      "The state filing is due at the end of the month, and open enrolment " +
      "for benefits opens the week after. Neither needs anything from you " +
      "yet; I will ask when they do.",
    followups: [
      "File the state tax forms",
      "Add my new hire to payroll",
      "How is headcount trending?",
    ],
  },
];

/* ============================================
   The story graph.

   Keyed by the chip text itself: a starter or follow-up chip sends its
   label as the message, so the label is the routing key. Every follow-up
   below names another node's prompt (or a starter), so no path dead-ends —
   each answer offers three roads, and the roads cross. The chip budget is
   held by scripts/validate-chat-starters.mjs, which reads the followups
   arrays in this file.
   ============================================ */

interface StoryNode {
  /** The chip text that routes here. */
  prompt: string;
  steps: { status: string; point: string }[];
  response: string;
  /** Names a rich element in the playground's content map. */
  contentKey?: string;
  followups: string[];
}

const STORY: StoryNode[] = [
  {
    prompt: "How do I run my first payroll?",
    steps: [
      { status: "Reading the account setup", point: "Company and tax details are already verified." },
      { status: "Drafting the answer", point: "Lead with the hours, then the review step." },
    ],
    response:
      "You are closer than you think. Enter everyone's hours, review the " +
      "totals, and submit; taxes are calculated and filed for you. If you " +
      "would rather not click through it, I can run the whole thing for " +
      "you.",
    followups: [
      "Run it all for me",
      "What do the plans include?",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "Run it all for me",
    steps: [
      { status: "Planning the payroll run", point: "Four steps, from tax details to submission." },
      { status: "Verifying the account", point: "Company details and bank link check out." },
    ],
    response:
      "On it. Your details and bank link are verified already, and the " +
      "team's hours are next.",
    contentKey: "setup-plan",
    followups: [
      "Find a time for orientation",
      "Add my new hire to payroll",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "What do the plans include?",
    steps: [
      { status: "Comparing the plans", point: "The plans differ on HR tools, not on payroll." },
      { status: "Drafting the answer", point: "Name what the Plus plan adds over the base." },
    ],
    response:
      "Every plan includes full-service payroll with taxes filed for you. " +
      "The Plus plan adds benefits administration, hiring and onboarding " +
      "tools, and time-off tracking.",
    followups: [
      "Which plan fits a team of five?",
      "Where is that written down?",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "Which plan fits a team of five?",
    steps: [
      { status: "Matching plans to the team", point: "Five people, benefits, and a hire in flight." },
      { status: "Drafting the answer", point: "The Plus plan covers both; lead with the card." },
    ],
    response:
      "The Plus plan fits what you described: payroll for the whole team, " +
      "benefits administration, and the onboarding tools for your next " +
      "hire.",
    contentKey: "team-plan-card",
    followups: [
      "Where is that written down?",
      "Add my new hire to payroll",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "Where is that written down?",
    steps: [
      { status: "Collecting the sources", point: "Three help pages back the answer." },
      { status: "Drafting the answer", point: "Cite them so the owner can check." },
    ],
    response:
      "Each chip opens the page the answer came from, so nothing here needs " +
      "taking on trust.",
    contentKey: "sources",
    followups: [
      "Which plan fits a team of five?",
      "How do I run my first payroll?",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "How is headcount trending?",
    steps: [
      { status: "Pulling the headcount numbers", point: "Six months of team data since January." },
      { status: "Charting the trend", point: "One series tells it; chart it in the card." },
    ],
    response:
      "The team has grown steadily for five of the last six months, and " +
      "you brought on two people this quarter alone.",
    contentKey: "trial-chart",
    followups: [
      "Which plan fits a team of five?",
      "Add my new hire to payroll",
      "Where is that written down?",
    ],
  },
  {
    prompt: "Add my new hire to payroll",
    steps: [
      { status: "Checking the offer letter", point: "Riley's signed offer arrived yesterday." },
      { status: "Drafting the answer", point: "Confirm before onboarding anyone." },
    ],
    response:
      "Happy to. Riley's signed offer is in, so give me the word and I " +
      "will start their onboarding: paperwork, direct deposit, and a " +
      "first-day checklist.",
    followups: [
      "Go ahead and onboard Riley",
      "Raise default PTO to 15 days",
      "Find a time for orientation",
    ],
  },
  {
    prompt: "Go ahead and onboard Riley",
    steps: [
      { status: "Starting the onboarding", point: "Riley starts on the first of the month." },
      { status: "Confirming the paperwork", point: "One call covers the forms and deposit setup." },
    ],
    response:
      "Riley is set up. The paperwork is out for signature, direct deposit " +
      "is connected, and they land on the next payroll run automatically.",
    contentKey: "invite-tool",
    followups: [
      "Find a time for orientation",
      "Raise default PTO to 15 days",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "Raise default PTO to 15 days",
    steps: [
      { status: "Locating the PTO policy", point: "The default lives in the benefits config." },
      { status: "Preparing the change", point: "One line changes; show the diff." },
    ],
    response:
      "Only the default moves, from ten days to fifteen. Everyone's " +
      "existing balances carry over untouched.",
    contentKey: "seat-diff",
    followups: [
      "Go ahead and onboard Riley",
      "What do the plans include?",
      "Find a time for orientation",
    ],
  },
  /* Two nodes the director's rail reaches by sending their prompt — the
     doc drop and the failing filing. Unreferenced by any chip is fine: the
     graph routes whatever text arrives. */
  {
    prompt: "Here is our latest payroll register.",
    steps: [
      { status: "Reading the register", point: "Twelve pages; read it before answering." },
      { status: "Charting the costs", point: "Cost by department is the story; chart it." },
    ],
    response:
      "Three departments, and most of the quarter's payroll sits in " +
      "operations. The totals match what ran through your account, so " +
      "nothing needs correcting.",
    contentKey: "launch-analysis",
    followups: [
      "Run it all for me",
      "Raise default PTO to 15 days",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "File the state tax forms",
    steps: [
      { status: "Starting the state filing", point: "The quarterly filing is ready to submit." },
    ],
    response:
      "The filing timed out on the state's side. Retry below and it should land.",
    contentKey: "flaky-tool",
    followups: [
      "Find a time for orientation",
      "Go ahead and onboard Riley",
      "How is headcount trending?",
    ],
  },
  {
    prompt: "Find a time for orientation",
    steps: [
      { status: "Checking what this needs", point: "Scheduling orientation needs calendar access." },
      { status: "Preparing the request", point: "Ask before connecting anything." },
    ],
    response:
      "I can find a slot that works for you and Riley, once you allow it " +
      "below.",
    contentKey: "calendar-approval",
    followups: [
      "Go ahead and onboard Riley",
      "How is headcount trending?",
      "How do I run my first payroll?",
    ],
  },
];

/** Chip labels route by text, so matching forgives case and punctuation. */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const STORY_BY_PROMPT = new Map(STORY.map((node) => [normalize(node.prompt), node]));

class SimAbortError extends Error {
  constructor() {
    super("Simulated response aborted");
    this.name = "AbortError";
  }
}

const delay = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new SimAbortError());
      return;
    }
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new SimAbortError());
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });

/**
 * A transport that scripts the full live-response choreography: one status
 * step (with its reasoning trace point) per beat, the handoff pause, then
 * the response revealed word by word.
 *
 * `content` is the playground's map of rich elements for the story nodes —
 * a node whose `contentKey` resolves in it commits its answer with that
 * element attached, which is how a chip path ends on a card, a chart, or
 * an approval. Without the map (or for a key it lacks) the node still
 * answers in text, so the transport never depends on the caller.
 */
export function createSimTransport(content?: Record<string, ReactNode>): ChatTransport {
  let exchangeCount = 0;

  return async function* simTransport(
    messages: ChatTransportMessage[],
    signal: AbortSignal
  ): AsyncGenerator<ChatEvent> {
    /* Route by the visitor's message: a chip sends its label, so an exact
       (normalized) match lands on its story node. Typed free text falls
       back to the scenario rotation. */
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const node = lastUser ? STORY_BY_PROMPT.get(normalize(lastUser.content)) : undefined;

    const scenario = node ?? SCENARIOS[exchangeCount % SCENARIOS.length];
    if (!node) exchangeCount += 1;

    for (const step of scenario.steps) {
      yield { type: "status", label: step.status, point: step.point };
      await delay(STATUS_MS, signal);
    }

    await delay(HANDOFF_MS, signal);

    const words = scenario.response.split(" ");
    for (let i = 0; i < words.length; i += 1) {
      yield { type: "delta", text: i === 0 ? words[i] : ` ${words[i]}` };
      await delay(STREAM_MS, signal);
    }

    const nodeContent = node?.contentKey ? content?.[node.contentKey] : undefined;
    if (nodeContent) {
      yield { type: "content", node: nodeContent };
    }

    /* Before `done`, like the event contract asks: the hook carries them
       into the turn when it commits, so the chips are there with the copy
       and thumbs row rather than a beat behind it. The site's own transport
       cannot do this — its suggestions are written from the finished answer,
       so they are fetched after the commit instead. */
    yield { type: "followups", items: scenario.followups };
    yield { type: "done" };
  };
}
