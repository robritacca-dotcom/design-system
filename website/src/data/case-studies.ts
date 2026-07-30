/* ============================================
   CASE STUDY REGISTRY ACCESSOR
   Single source of truth for the case-study
   list: /work maps over all of it, the home
   page features [0] and lists the next few.
   Ordered by curation (newest / most important
   first) — add new studies at the top and every
   surface reorders itself.
   Validated by scripts/validate-case-studies.mjs.
   ============================================ */

import data from "./case-studies.json";

export interface CaseStudy {
  /** Route of the case study page, e.g. "/work/embedded-ai-turbotax". */
  href: string;
  /** Display title. */
  title: string;
  /** One-line summary shown on the work index cards. */
  dek: string;
  /** Company the work was for. */
  companyName: string;
  /** Path to the company logo under website/public. */
  companyLogo: string;
  /** Path to the cover image under website/public. */
  coverSrc: string;
}

export const caseStudies: CaseStudy[] = data.caseStudies;
