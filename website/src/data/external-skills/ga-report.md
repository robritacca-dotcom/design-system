---
name: ga-report
description: Pull Google Analytics (GA4) data for robertritacca.com and analyze it in plain English. Use when the user asks for a GA report, site traffic analysis, analytics summary, "how's the site doing", visitor/pageview breakdown, or to refresh GA numbers.
icon: query_stats
displayDescription: "Pulls GA4 data for this site and analyzes it in plain English — with the judgment calls baked in: which traffic is bots, why page titles fragment, and which numbers are normal for a portfolio rather than problems. Lives in my personal skills folder rather than the repo, because it encodes analytics context instead of codebase conventions."
invoke: ["GA report","how's the site doing","site traffic analysis"]
---

# GA report

Pulls GA4 data for **www.robertritacca.com** (property `•••••••••`) via the
`ga-analysis/pull_ga.py` script, then analyzes it in plain, non-jargon English.

## Where things live

- Script + venv: `ga-analysis/` at the repo root (`git rev-parse --show-toplevel`)
- Runner: `./.venv/bin/python pull_ga.py`
- Output: `ga-analysis/output/all.json` (+ one CSV per report). Git-ignored.
- Credentials: `ga-analysis/service-account.json` (git-ignored; already set up).

## Steps

1. **Pick a window.** If the user gave one (e.g. "last month", "this week", "90 days"),
   use it. Otherwise default to `--days 30`. The script accepts `--days N` or
   `--start YYYY-MM-DD --end YYYY-MM-DD`.

2. **Run the pull** from the ga-analysis folder:
   ```bash
   cd "$(git rev-parse --show-toplevel)/ga-analysis" && ./.venv/bin/python pull_ga.py --days 30
   ```
   If the venv is missing, create it first:
   ```bash
   python3 -m venv .venv && ./.venv/bin/pip install -q -r requirements.txt
   ```
   The Python-version FutureWarnings are harmless — ignore them.

3. **Read the data.** Load `ga-analysis/output/all.json`. It's large; if it exceeds
   the read cap, use a small Python snippet with the venv interpreter to compute
   aggregates instead of reading the whole file. Reports included: `daily_trend`,
   `channels`, `top_pages`, `countries`, `devices`, `sources`, `landing_pages`, `events`.

4. **Analyze in plain English.** Lead with what matters, not raw dumps. Cover:
   - Headline: total users, % new, sessions, pageviews, pages/session, engaged %.
   - Traffic sources (channels + the `sources` detail — call out LinkedIn / Medium /
     Reddit / Google / any AI-assistant referral by name).
   - Best content (top_pages) with dwell time — case studies are the important ones;
     component gallery pages naturally have short dwell, don't flag that as a problem.
   - Geography + device split.

## Judgment calls / gotchas (apply these every time)

- **Bot / junk traffic:** flag any country or source with high user count but very low
  engagement rate (historically **Singapore ~4%** engaged = bots). Spam referrers seen:
  `ddvvff.org`, `snucm.com`. Subtract these when stating the "real" audience size.
- **Page-title fragmentation:** the same URL (e.g. `/` or `/work`) appears under several
  different `pageTitle` values because of past SEO/metadata edits. Sum by `pagePath`,
  don't treat each title as a separate page.
- **Direct is usually high (~75%)** for this portfolio — that's dark social (LinkedIn app,
  DMs, résumé links), not an error.
- **Mobile engagement** tends to run lower than desktop here — worth mentioning if the gap
  is large.

## Output

A tight written summary (the user is a designer, not an analyst — no acronym soup).
Offer, but don't auto-run: charting it as a visual, or filtering bots in GA.
Never commit `output/` or `service-account.json`.
