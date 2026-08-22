#!/usr/bin/env node
/**
 * sync-essays.mjs
 *
 * Fetches the Substack feed and writes website/src/data/essays.json — the
 * committed essays registry the site-chat corpus reads. The corpus generator
 * must be deterministic (no network — the validator byte-compares), so the
 * essays reach it the same way the project journal does: a committed data
 * file, refreshed deliberately by running this script and committing the
 * result. Freshness is a curation job, not the build's: run this after
 * publishing an essay (the biweekly site-updates loop is a natural moment).
 *
 * NOT part of the validate-registry chain — it needs the network. The
 * structure-only check that IS in the chain lives in validate-essays.mjs.
 *
 * A newly synced essay also needs its illustrated cover pair: register the
 * slug in website/src/data/essay-covers.json and add the light/dark webp
 * files under website/public/covers/writing, or validate-essay-covers.mjs
 * fails the next build. Until then /writing falls back to the feed cover.
 *
 * Slugs match the site's own derivation (the /p/<slug> segment, the same rule
 * website/src/lib/substack.ts uses), so /writing/<slug> pointers line up.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
export const outputPath = join(repoRoot, 'website', 'src', 'data', 'essays.json');

const FEED_URL = 'https://robertritacca1.substack.com/feed';

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&apos;': "'", '&nbsp;': ' ', '&rsquo;': '’', '&lsquo;': '‘',
  '&ldquo;': '“', '&rdquo;': '”', '&mdash;': '—', '&ndash;': '–',
  '&hellip;': '…',
};

const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&[a-z]+;/gi, (entity) => ENTITIES[entity] ?? entity);

/** Substack post HTML to readable plain text, paragraph breaks preserved. */
function htmlToText(html) {
  return decode(
    html
      // Whole blocks that are never prose.
      .replace(/<(script|style|figure|iframe)[\s\S]*?<\/\1>/gi, ' ')
      // Block boundaries become paragraph breaks.
      .replace(/<\/(p|h[1-6]|li|blockquote|div)>/gi, '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<li[^>]*>/gi, '- ')
      // Everything else is inline markup.
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const tag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!match) return '';
  return match[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
};

const response = await fetch(FEED_URL);
if (!response.ok) {
  console.error(`✗ Feed fetch failed: ${response.status}`);
  process.exit(1);
}
const xml = await response.text();

const essays = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  .map(([, item]) => {
    const link = tag(item, 'link');
    const slug = link.match(/\/p\/([^/?#]+)/)?.[1] ?? '';
    return {
      slug,
      title: decode(tag(item, 'title')),
      subtitle: decode(tag(item, 'description')).split('\n')[0],
      date: tag(item, 'pubDate').replace(/\s*\d{2}:\d{2}:\d{2}.*$/, ''),
      text: htmlToText(tag(item, 'content:encoded')),
    };
  })
  .filter((essay) => essay.slug && essay.title && essay.text);

if (essays.length === 0) {
  console.error('✗ Feed parsed to zero essays — the feed shape may have changed.');
  process.exit(1);
}

writeFileSync(outputPath, `${JSON.stringify({ essays }, null, 2)}\n`);
const chars = essays.reduce((sum, essay) => sum + essay.text.length, 0);
console.log(
  `✓ Wrote ${essays.length} essays (${chars} chars of text) to ${outputPath.replace(repoRoot + '/', '')}`
);
