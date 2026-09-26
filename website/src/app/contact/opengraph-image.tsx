import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ways to get in touch with Robert Ritacca";

export default function Image() {
  return buildOgImage("Get in touch", "Contact");
}
