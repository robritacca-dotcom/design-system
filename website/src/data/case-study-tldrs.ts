import type { CaseStudyTldrPoint } from "@/components/CaseStudyTldr/CaseStudyTldr";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";

/**
 * The TLDR points rendered at the top of each case study, keyed by the
 * study's /work slug. Hand-written, in the case-study register ("I", British
 * spelling, metrics only where the article states them).
 *
 * DELIBERATELY OUTSIDE THE ROUTE FOLDERS. The corpus generator reads a
 * route's whole folder, and every TLDR restates facts the full article
 * already puts in the corpus, so co-locating them charged the token budget
 * twice for the same knowledge (and pushed it over). Living here, the prose
 * ships on the page but stays out of the corpus; the chat answers from the
 * articles. The em-dash gate still applies: validate-shipped-prose.mjs scans
 * this module by name in its module list.
 *
 * A slug typo fails the website build: the pages index this object with a
 * literal key, and `satisfies` keeps the keys checked.
 */
export const caseStudyTldrs = {
  "embedded-ai-turbotax": [
    {
      claim: "TurboTax shipped natively inside ChatGPT and Claude",
      detail:
        "I led design across three releases in one tax season: an MVP in December, V2 in January, and the Claude Connector expansion in April. The work won a Webby Award.",
    },
    {
      claim: "The platform owns the orchestrator",
      detail:
        "OpenAI and Anthropic control discovery, invocation, memory and rendering. The work stops being screen design and becomes designing around orchestration you do not fully control.",
    },
    {
      claim: "Conversation did not replace interfaces",
      detail:
        "Users loved conversational intake, then wanted structured verification the moment money, identity or irreversible outcomes entered the workflow.",
    },
    {
      claim: "Continuity is the new expectation",
      detail:
        "Users expected the AI side and TurboTax to behave as one product: a document uploaded in ChatGPT or Claude should already be waiting in TurboTax when they arrive. Every boundary where that sync dropped felt broken.",
    },
    {
      claim: "Good AI UX reduces prompting",
      detail:
        "Blank prompt boxes assume vocabulary and confidence most users do not have. Structured guidance and generated next steps consistently performed better.",
    },
  ],
  "intuit-agent-chat": [
    {
      claim: "One chat platform for all of Intuit",
      detail:
        "I was the lead designer for Intuit Agent Chat, the shared conversational surface behind every AI experience across QuickBooks, TurboTax, Credit Karma and Mailchimp. Designed from zero across two fiscal years, and still shipping.",
    },
    {
      claim: "Every team was building their own",
      detail:
        "With no shared surface, domain teams were rebuilding the same conversation stack in parallel. Workshops with over 40 participants pointed at one answer: a single platform, not another point solution.",
    },
    {
      claim: "Built once, deployed everywhere",
      detail:
        "One widget any Intuit product can theme and extend: brand tokens, persistent threads, backend-driven cards, confirmation before an agent acts, and mobile parity from day one.",
    },
    {
      claim: "The harder problem was governance",
      detail:
        "Domain teams circumvent shared patterns that fall short, and platform teams resist losing control. Much of the work was trust, ownership and an extension model, not pixels.",
    },
    {
      claim: "70+ agents and roughly 50M sessions",
      detail:
        "An MVP shipped in 4 months and product-market fit followed in about 10. The widget now powers 70+ production agents, has served roughly 50M sessions, and is built on by a community of 600+ designers and 10,000+ engineers.",
    },
  ],
  "augmenta-ai": [
    {
      claim: "AI-generated electrical designs for real buildings",
      detail:
        "Augmenta generates the conduit and cable tray designs that construction teams model by hand in Revit. I was the sole product designer on a small, engineering-led, pre-revenue team.",
    },
    {
      claim: "The product was built around one customer",
      detail:
        "Every pilot firm had its own workflow, but the product mirrored the first design partner's. Workshops with each firm showed the one step they all shared was routing, so we cut the rest and did that one thing well.",
    },
    {
      claim: "A ground-up redesign made it usable",
      detail:
        "I rebuilt every screen on an Ant Design foundation: clearer structure, several times more studies visible at once, calmer error language, and a dark mode the pilot firms loved.",
    },
    {
      claim: "Showing errors beat hiding them",
      detail:
        "Failed generations used to stop silently with nothing to show. Letting them finish and drawing each problem as a red box in 3D sent successful generations up about 900%.",
    },
    {
      claim: "42% faster to a useful result",
      detail:
        "Across the engagement: 42% faster time-to-value, about 42% fewer generation cycles, and 36% fewer engineering blockers per cycle. Schematics now reach fabrication in days instead of weeks.",
    },
  ],
  "meta-offers": [
    {
      claim: "A free-text box was slowing thousands of offers",
      detail:
        "Above-band offers at Meta needed compensation approval, and approval ran on a notes box recruiters filled from memory and analysts parsed by hand. Offers bounced between them for days while candidates waited.",
    },
    {
      claim: "Three users, one flow, opposing pulls",
      detail:
        "Candidates withhold information because it is leverage, recruiters are measured on speed, and analysts cannot approve what they cannot verify. A signed offer lives only at the intersection, and the flow had to serve all three.",
    },
    {
      claim: "Structure at the capture, not after",
      detail:
        "I replaced the box with a dynamic, validated flow: ask only what is relevant, define every term in the UI, and make an empty field mean something. This was 2021, before pointing an LLM at the free text was an option.",
    },
    {
      claim: "First approvals went from days to same day",
      detail:
        "Launched to the whole recruiting org in July 2022, after dogfooding on real offers with more than 30 recruiters.",
    },
    {
      claim: "23.7% faster approvals, 51% more validated data",
      detail:
        "Plus 12.2% fewer approval requests and 9% faster extension from hire decision to offer out. The one number that did not move, multi-approval negotiations, became the next phase of work.",
    },
  ],
  "meta-immersive-offers": [
    {
      claim: "A job offer candidates could step inside",
      detail:
        "I led design on Meta's Immersive Offers: the offer call rebuilt as a private Horizon Worlds experience where a candidate explores compensation, benefits and growth with their recruiter. Nobody on the team, me included, had ever built in VR.",
    },
    {
      claim: "Offers are the most expensive moment to lose",
      detail:
        "Meta extended tens of thousands of offers a year and roughly a quarter were declined, often for lack of information at exactly the stage we could make rich.",
    },
    {
      claim: "The first concrete artefact unblocked everyone",
      detail:
        "The team thrashed until I built the mood board and the world's floor plan, which grew into the creative brief the whole build anchored to. In a medium with no mocks, frameworks were the design system.",
    },
    {
      claim: "The journey was bigger than the world",
      detail:
        "The VR world was maybe a third of the problem. Service blueprints covered the rest: opt-in, shipping a loaner Quest 2, unboxing, setup and return, all running beside the real offer process without touching it.",
    },
    {
      claim: "The pilot delivered evidence, not just a demo",
      detail:
        "84% of participants had no logistics issues and average time in-world passed ten minutes, while first-time VR setup ran 30 to 60 minutes: the medium was not ready to be everywhere, and proving that was the point. The work led to patent filings, including one for the offer letter itself.",
    },
  ],
  "meta-career-profile": [
    {
      claim: "Reimagining the platform every Meta candidate passes through",
      detail:
        "Career Profile carries the whole hiring funnel: millions of visitors a year across every role, level and region. Three designers and a manager converged the vision for leadership in Q4 2022. My part: the typology framework, the concept convergence, the timeline and card system, and the offer experience.",
    },
    {
      claim: "The timeline became the anchor",
      detail:
        "We laid out five degrees of change, from no change to overhaul, and scored them. The winner organises the page around the one thing every candidate has and comes to check: their interview timeline. Select a stage and the page re-composes around it.",
    },
    {
      claim: "Three page types instead of one-off pages",
      detail:
        "Every page is Browse, Study or Work, sorted by the mental model the candidate brings to it. Three typologies meant three templates, and a partner team building a new feature had somewhere to put it.",
    },
    {
      claim: "Personalisation through curation, not a second product",
      detail:
        "An IC5 and a leadership candidate see the same framework with different curation: fuller guidance for one, essentials for the other. One system renders both.",
    },
    {
      claim: "The offer numbers made the case",
      detail:
        "Recruiters used the Offer Summary on 72% of offers; when they did, acceptance ran 4% higher and offers went out 1.85 days faster. That argued for a complete self-serve offer experience, carried through to the candidate's first day.",
    },
  ],
  "cibc-firstcaribbean": [
    {
      claim: "A new mobile bank for the Caribbean, built from zero",
      detail:
        "At Devbridge I led design for CIBC FirstCaribbean's first mobile banking platform on iOS and Android, from early strategy through launch. The work led to my promotion to Product Design Manager.",
    },
    {
      claim: "One user, several countries and currencies",
      detail:
        "Customers held accounts across multiple Caribbean nations and financial systems at once. A Canadian single-country banking model simply did not fit.",
    },
    {
      claim: "We surfaced the complexity instead of hiding it",
      detail:
        "Country flags, currency codes and localised account labels became core product language, so users always knew which country and currency they were acting in.",
    },
    {
      claim: "Products cannot inherit your home market's assumptions",
      detail:
        "The lasting lesson: good design is often not simplifying complexity away, it is helping users move through it with confidence.",
    },
  ],
  "robr0-ds": [
    {
      claim: "A design system where the rules cannot soften",
      detail: `Every system I shipped inside large companies drifted once it crossed the design-engineering boundary. robr0 DS started in February 2026 to fix that from the inside: now ${COMPONENT_COUNT} components, a published npm package, and the site you are reading.`,
    },
    {
      claim: "Every fact has exactly one home",
      detail:
        "Registries hold the authoritative lists, and validators check every other surface against them on each build. Forget to register a component and the build fails and names the folder. There is nowhere to type a component count by hand, including in this TLDR.",
    },
    {
      claim: "Cutting a corner leaves a signed note",
      detail:
        "A validator reads every line of component CSS for raw values. The only ways past it: use the right token, or write a comment above the line stating the category and the reason. No override flag.",
    },
    {
      claim: "Publishing found what dogfooding could not",
      detail:
        "Going on npm exposed contract problems self-use never hits: 18 components rebuilt, 49 accessibility violations fixed. Your own system catches taste problems; only a second consumer catches contracts.",
    },
    {
      claim: "The site answers for itself",
      detail:
        "A built-in chat reads a corpus generated from the published pages, scoring 77 of 78 on its answer-quality eval, and an MCP endpoint serves exact prop contracts to any coding agent. Traffic grew about fifteenfold from the April floor to July.",
    },
  ],
} satisfies Record<string, CaseStudyTldrPoint[]>;
