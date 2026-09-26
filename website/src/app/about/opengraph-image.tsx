import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

/* /about and /contact are the two pages most likely to be shared into a DM or
   a hiring thread, and both used to fall back to the generic site card. */

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "About Robert Ritacca, Principal Product Designer in Toronto";

export default function Image() {
  return buildOgImage(
    "Designing products that bring clarity to complex problems",
    "About"
  );
}
