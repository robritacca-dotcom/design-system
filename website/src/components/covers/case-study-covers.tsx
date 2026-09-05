import type { CoverProps } from "./CoverFrame";
import { CoverImage } from "./CoverImage";
import type { CoverAspect } from "@/data/cover-renders";
import { TurboTaxClaudeCover } from "./TurboTaxClaudeCover";
import { IntuitAgentChatCover } from "./IntuitAgentChatCover";
import { AugmentaSolutionCover } from "./AugmentaCover";
import { MetaOfferSummaryCover } from "./MetaOfferSummaryCover";
import { MetaOfferDraftCover } from "./MetaOfferDraftCover";
import { SiteOverviewCover, SitePlaygroundCover } from "./SiteCovers";

/**
 * Which redrawn screen stands for each case study.
 *
 * One screen per study, chosen as the one a stranger would recognise the work
 * by: TurboTax by the Claude conversation, Intuit by the immersive assistant,
 * Augmenta by the 3D viewer, the two Meta studies by the two ends of the offer
 * flow, and this site by the playground's chat. The rest of the covers stay in
 * the set for use elsewhere.
 *
 * A study with no entry keeps its photographic cover — CIBC's is a photo of a
 * phone, which has no screen to redraw.
 *
 * One entry is not a case study: `/overview` is the featured page in the mega
 * panel's showcase card, and its cover rides the same draw-register-render
 * pipeline as the studies rather than growing a parallel one.
 *
 * This map is the *drawing*, and it is rendered in exactly two places: the
 * `/covers` staging grid, and the `/covers/render` surface the images are shot
 * from. Everywhere a cover is displayed to a visitor reads one of those images
 * instead — see `caseStudyCover` below.
 */
export const CASE_STUDY_COVERS: Record<
  string,
  ((props: CoverProps) => React.JSX.Element) | undefined
> = {
  "/work/embedded-ai-turbotax": TurboTaxClaudeCover,
  "/work/intuit-agent-chat": IntuitAgentChatCover,
  "/work/augmenta-ai": AugmentaSolutionCover,
  "/work/meta-career-profile": MetaOfferSummaryCover,
  "/work/meta-offers": MetaOfferDraftCover,
  "/work/robr0-ds": SitePlaygroundCover,
  "/overview": SiteOverviewCover,
};

/**
 * The cover for a case study href, ready to display — or null when that study
 * has none, so a caller can fall back to its photograph in one line.
 *
 * This hands back the shot, not the drawing. The vector renders correctly in a
 * desktop browser and wrongly on a phone: mobile WebKit lays the mock out at
 * its native width inside the `foreignObject` and sizes the text from that,
 * putting giant type across an otherwise intact screen. The image has no such
 * failure mode, and it is what every visitor sees.
 */
export function caseStudyCover(
  href: string,
  aspect: CoverAspect,
  options: { priority?: boolean; className?: string } = {},
): React.JSX.Element | null {
  if (!CASE_STUDY_COVERS[href]) return null;
  return <CoverImage href={href} aspect={aspect} {...options} />;
}
