import type { ChatEvent, ChatTransport, ChatTransportMessage } from "@/hooks/useChat";

/* ============================================
   Simulated chat transport.

   Build 1 runs the widget entirely on this: scripted status steps at a
   steady beat, a handoff pause, then word-cadence deltas — the same event
   stream the real /api/chat transport will produce in Build 2, so the
   widget cannot tell the difference.

   Beats carried over from the original scratch-page sim.
   ============================================ */

const STATUS_MS = 1600;
const HANDOFF_MS = 350; /* beat for the components' live→done handoff */
const STREAM_MS = 30;

interface SimScenario {
  steps: { status: string; point: string }[];
  response: string;
}

/* Scenarios rotate per exchange so a test conversation stays varied:
   short plain answers through long sectioned ones, exercising the Prose
   typography kit (headings, paragraphs, bullets) and below-the-fold
   scrolling. */
const SCENARIOS: SimScenario[] = [
  {
    steps: [
      { status: "Reading the readiness tracks", point: "Pull the four readiness tracks and their owners." },
      { status: "Reviewing the legal blocker", point: "Pricing copy is still sitting in legal review." },
      { status: "Drafting the answer", point: "Lead with the overall status, then flag the one real risk." },
    ],
    response:
      "The launch is on track overall. Three of the four readiness tracks are " +
      "green, and the one item I would watch is the **legal review**, since it " +
      "gates the pricing rollout.",
  },
  {
    steps: [
      { status: "Reading the design principles", point: "The principles are stated at the level of token roles." },
      { status: "Tracing them through the tokens", point: "Each principle maps to a small set of semantic tokens." },
      { status: "Collecting examples", point: "The action teal and the status set are the clearest cases." },
      { status: "Structuring the answer", point: "Three sections: tokens, colour, motion." },
    ],
    response:
      "Rob's philosophy comes down to a few firm rules, applied everywhere.\n\n" +
      "### Tokens before components\n\n" +
      "Every visual decision starts as a token. Primitives hold the raw values, " +
      "semantic tokens give them roles, and components only ever reference the " +
      "semantic layer. That one rule is what lets the whole system re-theme " +
      "from a single file.\n\n" +
      "### Colour carries meaning\n\n" +
      "Colour is never decoration. A few examples of how strictly that holds:\n\n" +
      "- The action teal appears only on primary actions and focus rings, so it " +
      "always means click here.\n" +
      "- Five status roles cover info, positive, warning, error, and neutral, " +
      "shared by every status bearing component.\n" +
      "- Chat bubbles draw from their own four tokens, so a theme can retune " +
      "them without touching a component.\n\n" +
      "### Motion is a system\n\n" +
      "Durations and easings are tokens too, with a reduced motion guard that " +
      "zeroes them globally. If an animation cannot say what it is for, it " +
      "does not ship.",
  },
  {
    steps: [
      { status: "Scanning the project journal", point: "The journal groups work into thematic stories." },
      { status: "Picking the highlights", point: "The ai category and the npm release stand out." },
      { status: "Drafting the answer", point: "Three bullets, then a pointer to the journal." },
    ],
    response:
      "Quite a lot this summer. The highlights:\n\n" +
      "- **The ai category**: a full set of conversation components, from " +
      "ChatMessage and Composer through Reasoning and AgentStatus.\n" +
      "- **npm publishing**: the system ships as a public package with " +
      "provenance, and the site itself consumes it like any other user.\n" +
      "- **This widget**: the chat surface you are using right now, composed " +
      "entirely from those primitives.\n\n" +
      "The project journal on the site tells the longer story, one theme at " +
      "a time.",
  },
  {
    steps: [
      { status: "Mapping the repo layout", point: "A component library and a docs site share one repo." },
      { status: "Following the token chain", point: "Primitives feed semantic tokens, which feed components." },
      { status: "Checking the guardrails", point: "Validators fail the build when surfaces drift." },
      { status: "Structuring the answer", point: "Anatomy first, then tokens, then the safety net." },
    ],
    response:
      "At a high level it is one system with three layers that keep each " +
      "other honest.\n\n" +
      "### The anatomy\n\n" +
      "A React component library and a Next.js documentation site live in one " +
      "repo. The site consumes the published package the same way any outside " +
      "user would, so the docs can never quietly drift from what ships.\n\n" +
      "Each component is self contained: implementation, scoped styles, and " +
      "its Storybook stories sit together in one folder, and every component " +
      "has a live showcase page on the site.\n\n" +
      "### The token chain\n\n" +
      "Colour, spacing, type, and motion all flow through the same three " +
      "tiers:\n\n" +
      "- Primitives hold raw values and are never referenced directly.\n" +
      "- Semantic tokens give each value a role, in light and dark.\n" +
      "- Components spend only semantic tokens, so themes swap cleanly.\n\n" +
      "### The safety net\n\n" +
      "Registries are the single source of truth for anything countable, and " +
      "build time validators check them against reality: every component " +
      "registered, every page present, every token resolving in both themes. " +
      "A render test and an accessibility pass run on every story, on every " +
      "change.\n\n" +
      "The practical result is that a change either fits the system or the " +
      "build says no.",
  },
];

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
 */
export function createSimTransport(): ChatTransport {
  let exchangeCount = 0;

  return async function* simTransport(
    _messages: ChatTransportMessage[],
    signal: AbortSignal
  ): AsyncGenerator<ChatEvent> {
    const scenario = SCENARIOS[exchangeCount % SCENARIOS.length];
    exchangeCount += 1;

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

    yield { type: "done" };
  };
}
