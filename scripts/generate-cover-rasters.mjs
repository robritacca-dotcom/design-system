/**
 * generate-cover-rasters.mjs
 *
 * Shoots each vector cover into a flat image, one per study, aspect and theme.
 *
 * Why this exists: a cover is an HTML mock inside an SVG `foreignObject`,
 * shrunk to fit by a scale transform. Mobile WebKit does not render that
 * construction reliably — it lays the mock out at its native width and sizes
 * the text from that, so a phone shows intact geometry with the type blown up
 * several times over. The drawing stays the source; the places a cover is
 * *displayed* read the image instead.
 *
 * Deliberate, never part of the build — it needs a running dev server and a
 * browser, the same shape as `sync-essays.mjs` and `eval:chat`. Run it after
 * changing a cover:
 *
 *     cd website && npm run dev          # in one shell
 *     npm run covers:render              # in another
 *
 * Then commit the images. `scripts/validate-cover-rasters.mjs` fails the build
 * if a registered render has no file, or a file has no registry entry — it
 * cannot tell whether an image is *stale*, so regenerating after a cover
 * change is on the person changing it.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(repoRoot, 'website', 'src', 'data', 'cover-renders.json');
const outDir = join(repoRoot, 'website', 'public', 'covers', 'rendered');

const BASE = process.env.COVERS_BASE_URL ?? 'http://localhost:3000';
/** Quality 88 holds the fine UI detail; above it the files grow for no visible gain. */
const WEBP_QUALITY = 88;
const THEMES = ['light', 'dark'];

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

/** Every (study, aspect, theme) the registry asks for. Mirrors cover-renders.ts. */
function targets() {
  const out = [];
  for (const [href, entry] of Object.entries(registry.studies)) {
    const slug = href.replace(/^\/work\//, '');
    for (const aspect of entry.aspects) {
      const spec = registry.aspects[aspect];
      if (!spec) throw new Error(`${href} asks for unknown aspect "${aspect}"`);
      const [rw, rh] = spec.ratio;
      for (const theme of THEMES) {
        out.push({
          slug,
          aspect,
          theme,
          width: spec.width,
          height: Math.round((spec.width * rh) / rw),
          file: `${slug}-${aspect}-${theme}.webp`,
        });
      }
    }
  }
  return out;
}

/** Fail loudly rather than shooting a page that quietly rendered an error. */
async function assertRendered(page) {
  const shot = await page.locator('#shot').count();
  if (shot !== 1) {
    const body = (await page.locator('body').innerText()).slice(0, 200);
    throw new Error(`no #shot element on the page — got: ${body}`);
  }
}

async function main() {
  const list = targets();
  mkdirSync(outDir, { recursive: true });

  let browser;
  try {
    browser = await chromium.launch({
      executablePath: process.env.COVERS_CHROMIUM || undefined,
    });
  } catch (error) {
    console.error(
      'Could not launch Chromium. Set COVERS_CHROMIUM to a browser binary if\n' +
        "Playwright's own download is not present.\n",
    );
    throw error;
  }

  const widest = Math.max(...list.map((t) => t.width));
  const tallest = Math.max(...list.map((t) => t.height));
  const context = await browser.newContext({
    viewport: { width: widest + 80, height: tallest + 80 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  let bytes = 0;
  for (const target of list) {
    const url =
      `${BASE}/covers/render?cover=${encodeURIComponent(target.slug)}` +
      `&aspect=${encodeURIComponent(target.aspect)}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await assertRendered(page);

    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, target.theme);

    /* Freeze everything that moves, so two runs of this script produce the
       same bytes: the theme cross-fade, and any motion inside a mock. */
    await page.addStyleTag({
      content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.filter((i) => !i.complete).map(
          (i) => new Promise((done) => {
            i.addEventListener('load', done, { once: true });
            i.addEventListener('error', done, { once: true });
          }),
        ),
      );
    });

    const png = await page.locator('#shot').screenshot({ type: 'png' });
    const webp = await sharp(png).webp({ quality: WEBP_QUALITY }).toBuffer();
    writeFileSync(join(outDir, target.file), webp);
    bytes += webp.length;

    const kb = String(Math.round(webp.length / 1024)).padStart(5);
    console.log(`  ${kb} KB  ${target.file}  (${target.width}x${target.height})`);
  }

  await browser.close();

  /* Prune renders the registry no longer asks for, so dropping an aspect does
     not leave an orphan behind for the validator to trip over. */
  const wanted = new Set(list.map((t) => t.file));
  for (const file of readdirSync(outDir)) {
    if (!wanted.has(file)) {
      rmSync(join(outDir, file));
      console.log(`  removed stale ${file}`);
    }
  }

  console.log(
    `\n${list.length} renders, ${(bytes / 1024 / 1024).toFixed(1)} MB total.`,
  );
}

main().catch((error) => {
  console.error(`\ngenerate-cover-rasters failed: ${error.message}`);
  console.error(`Is the dev server running at ${BASE}?`);
  process.exit(1);
});
