/* ============================================
   SUBSTACK FEED LAYER
   Fetches + parses the public RSS feed for the
   Substack publication and exposes typed articles.

   Auto-sync: fetches run with ISR (`revalidate`),
   so newly published posts appear on the site
   within the revalidate window — no rebuilds.
   ============================================ */

import sanitizeHtml from "sanitize-html";

/** How long (seconds) before the feed is re-fetched. 1 hour. */
export const FEED_REVALIDATE_SECONDS = 3600;

/** Public RSS feed for the publication. */
const FEED_URL = "https://robertritacca1.substack.com/feed";

export interface Article {
  /** URL-safe slug derived from the Substack post link (the `/p/<slug>` segment). */
  slug: string;
  /** Post title. */
  title: string;
  /** Subtitle / dek (from the feed <description>). May be empty. */
  subtitle: string;
  /** Canonical Substack URL for the post. */
  substackUrl: string;
  /** Publish date as an ISO string. */
  date: string;
  /** Cover image URL, or null when the post has no enclosure image. */
  coverImage: string | null;
  /** Full post body as HTML (from <content:encoded>). */
  contentHtml: string;
  /** Author name (from <dc:creator>). */
  author: string;
}

/* ── XML helpers ─────────────────────────────────────────────────────────── */

/** Strips a single CDATA wrapper if present, else returns the trimmed input. */
function unwrapCdata(value: string): string {
  const match = value.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return (match ? match[1] : value).trim();
}

/** Returns the inner text of the first `<tag>…</tag>` in `xml`, CDATA-unwrapped. */
function tag(xml: string, name: string): string {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return match ? unwrapCdata(match[1]) : "";
}

/** Decodes the handful of HTML entities that show up in titles/subtitles. */
function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/** Extracts the `/p/<slug>` segment from a Substack post URL. */
function slugFromLink(link: string): string {
  const match = link.match(/\/p\/([^/?#]+)/);
  return match ? match[1] : link.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

function parseItem(itemXml: string): Article {
  const link = tag(itemXml, "link");
  const enclosure = itemXml.match(/<enclosure[^>]*\burl="([^"]+)"/);
  const coverImage = enclosure ? enclosure[1] : null;

  return {
    slug: slugFromLink(link),
    title: decodeEntities(tag(itemXml, "title")),
    subtitle: decodeEntities(tag(itemXml, "description")),
    substackUrl: link,
    date: new Date(tag(itemXml, "pubDate")).toISOString(),
    coverImage,
    // Substack repeats the cover image as the first figure of the body; strip
    // it so it isn't shown twice (we render the cover separately above).
    // Sanitized because it's third-party HTML rendered via dangerouslySetInnerHTML.
    contentHtml: sanitizeContent(
      stripLeadingCover(tag(itemXml, "content:encoded"), coverImage)
    ),
    author: decodeEntities(tag(itemXml, "dc:creator")),
  };
}

/**
 * Sanitizes feed HTML before it reaches dangerouslySetInnerHTML: keeps the
 * markup Substack posts actually use, drops scripts, event handlers, inline
 * styles, and embeds. Classes are kept (inert without matching CSS) so the
 * article layout survives; disallowed wrappers keep their inner content.
 */
function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "img", "figure",
      "figcaption", "ul", "ol", "li", "blockquote", "pre", "code",
      "strong", "em", "b", "i", "s", "u", "sub", "sup", "hr", "br",
      "div", "span", "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "srcset", "sizes", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

/** Removes the body's leading <figure> when it duplicates the cover image. */
function stripLeadingCover(html: string, coverUrl: string | null): string {
  const key = coverKey(coverUrl);
  if (!key) return html;
  const figure = html.match(/<figure[\s\S]*?<\/figure>/i);
  if (figure && figure[0].includes(key)) {
    return html.replace(figure[0], "").trim();
  }
  return html;
}

/* ── Public API ──────────────────────────────────────────────────────────── */

/**
 * Fetches every post from the Substack feed, newest first.
 * Cached via ISR; returns [] if the feed can't be reached so the
 * page still renders rather than throwing.
 */
export async function getArticles(): Promise<Article[]> {
  let xml: string;
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "robertritacca.com feed reader" },
      next: { revalidate: FEED_REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    xml = await res.text();
  } catch {
    return [];
  }

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const articles = items
    .map(parseItem)
    .filter((a) => a.slug && a.title);

  // Substack reuses one generic cover (a headshot) across most posts. Detect
  // any image shared by 2+ posts and drop it, so it isn't repeated on the
  // cards or shown on the article pages. Posts keep genuinely unique covers.
  const keyCount = new Map<string, number>();
  for (const a of articles) {
    const key = coverKey(a.coverImage);
    if (key) keyCount.set(key, (keyCount.get(key) ?? 0) + 1);
  }
  for (const a of articles) {
    const key = coverKey(a.coverImage);
    if (key && (keyCount.get(key) ?? 0) > 1) a.coverImage = null;
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

/** Extracts the underlying Substack image id from a CDN cover URL, if any. */
function coverKey(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/images(?:%2F|\/)([0-9a-f-]{8,})/i);
  return match ? match[1] : url;
}

/** Fetches a single article by slug, or null if not found. */
export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}

/* ── Cover placeholders ──────────────────────────────────────────────────── */

// Darkest ramp step (-09) of each DS hue; teal is reserved for CTAs, so excluded.
const PLACEHOLDER_COLORS = [
  "#8E2641", // red-09
  "#8F4324", // orange-09
  "#03765A", // green-09
  "#0F265E", // blue-09
  "#52247D", // purple-09
  "#8A6B2A", // yellow-09
];

// Simple 24×24 outline glyphs (stroked white), drawn centered on the block.
const PLACEHOLDER_ICONS = [
  "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h5", // document
  "M13 2 4 14h7l-1 8 9-12h-7z", // bolt
  "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5", // layers
  "M12 3c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z", // sparkle
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z", // grid
  "M4 5h16v11H9l-5 4z", // chat
];

/** Stable 32-bit hash of a string, used to pick a color/icon per article. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Returns a data-URI SVG cover — a solid DS-color block with a centered icon,
 * chosen deterministically from `seed` so each article looks distinct but
 * stable across renders. Matches the card cover's 940×480 aspect ratio.
 */
export function coverPlaceholder(seed: string, index = 0): string {
  const h = hash(seed);
  // Colour cycles by position so no two cards in a list repeat a colour;
  // the icon is keyed off the slug so each article keeps its own mark.
  const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const icon = PLACEHOLDER_ICONS[h % PLACEHOLDER_ICONS.length];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480">` +
    `<rect width="940" height="480" fill="${color}"/>` +
    `<g transform="translate(395 165) scale(6.25)" fill="none" ` +
    `stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ` +
    `stroke-opacity="0.92"><path d="${icon}"/></g>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Formats an ISO date as e.g. "May 23, 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
