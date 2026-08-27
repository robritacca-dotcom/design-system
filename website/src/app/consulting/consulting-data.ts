/* ============================================
   CONSULTING SECTION DATA
   The offers both audience pages render, and the
   booking targets they share. The Stripe checkout
   is the same one the contact page links —
   consulting is its first-class home.
   ============================================ */

export const BOOKING_URL = "https://buy.stripe.com/28o7vb5NBaSJ3NC5kn";
export const EMAIL_URL = "mailto:rob.ritacca@gmail.com";
export const EMAIL_ADDRESS = "rob.ritacca@gmail.com";

export interface ConsultingMode {
  kind: string;
  starter?: boolean;
  title: string;
  body: string;
  terms: string;
  /**
   * The essay whose illustrated cover stands in as this offer's row graphic.
   * Placeholder art: the /writing covers are the style the section will use,
   * so they test the layout until dedicated illustrations are commissioned.
   */
  coverSlug: string;
  action: { label: string; href: string; external?: boolean; primary?: boolean };
}

export const teamModes: ConsultingMode[] = [
  {
    kind: "Fixed scope",
    starter: true,
    coverSlug: "design-still-derisks-dev",
    title: "Health check",
    body: "Two weeks on one surface: your AI experience, a product flow, or your design system. You get a written report with prioritized findings and a roadmap your team can run without me.",
    terms: "Fixed price, booked directly.",
    action: { label: "Book a health check", href: BOOKING_URL, external: true, primary: true },
  },
  {
    kind: "Flagship",
    coverSlug: "youre-not-building-what-you-think",
    title: "Zero-to-one build",
    body: "A team of one for your whole product: product design, the design system, and the shipped code, end to end. The same stack this site runs on, built for your business.",
    terms: "Priced by the build, never by the hour.",
    action: { label: "Email me about a build", href: EMAIL_URL },
  },
  {
    kind: "Ongoing",
    coverSlug: "figma-ai-and-the-workflow-that-still",
    title: "Advisory",
    body: "A monthly cycle of working sessions, plus async review of what your team ships in between. A second set of eyes rather than extra hands.",
    terms: "Monthly cycles.",
    action: { label: "Ask about advisory", href: EMAIL_URL },
  },
];

export const designerModes: ConsultingMode[] = [
  {
    kind: "One session",
    starter: true,
    coverSlug: "how-to-add-a-chat-to-your-own-site",
    title: "1:1 session",
    body: "An hour on whatever is in front of you: your portfolio, a design problem you're stuck on, a system question, or where to take your career next.",
    terms: "Fixed price, booked directly.",
    action: { label: "Book a session", href: BOOKING_URL, external: true, primary: true },
  },
  {
    kind: "Career",
    coverSlug: "agency-the-invisible-trait-that-separates",
    title: "Hiring and career advice",
    body: "Portfolio deep dives, interview prep, and how to weigh an offer. Practical advice from someone who has shipped inside the companies you're applying to.",
    terms: "Scoped to what you need.",
    action: { label: "Email me", href: EMAIL_URL },
  },
  {
    kind: "Ongoing",
    coverSlug: "designing-embedded-ai-experiences",
    title: "Mentorship",
    body: "A recurring session plus async notes on what you make in between. For designers who want a steady outside voice while they grow.",
    terms: "Monthly cadence.",
    action: { label: "Ask about mentorship", href: EMAIL_URL },
  },
];

export const teamSteps = [
  {
    title: "Diagnose",
    body: "An existing product starts with the health check; a zero-to-one build starts with a scoping call. Either way, the plan comes from your business, not a template.",
  },
  {
    title: "Report",
    body: "You get the findings in writing: what is costing you, in priority order, with a roadmap sized to your team.",
  },
  {
    title: "Build, or hand over",
    body: "Run the roadmap yourselves, or keep me for the build. Either way the work stays yours.",
  },
];
