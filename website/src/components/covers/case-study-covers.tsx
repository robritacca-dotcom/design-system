import type { CoverProps } from "./CoverFrame";
import { TurboTaxClaudeCover } from "./TurboTaxClaudeCover";
import { IntuitAgentChatCover } from "./IntuitAgentChatCover";
import { AugmentaSolutionCover } from "./AugmentaCover";
import { MetaOfferSummaryCover } from "./MetaOfferSummaryCover";
import { MetaOfferDraftCover } from "./MetaOfferDraftCover";
import { SitePlaygroundCover } from "./SiteCovers";

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
};

/**
 * The cover for a case study href, already rendered — or null when that study
 * has none, so a caller can fall back to its image in one line.
 */
export function caseStudyCover(
  href: string,
  props: CoverProps = {},
): React.JSX.Element | null {
  const Cover = CASE_STUDY_COVERS[href];
  return Cover ? <Cover {...props} /> : null;
}
