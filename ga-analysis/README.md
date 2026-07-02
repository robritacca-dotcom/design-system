# GA analysis

Pulls a snapshot of GA4 data for **www.robertritacca.com** (property `311163767`)
into CSV + JSON so Claude can analyze it.

## One-time setup (~10 min)

1. **Create a Google Cloud project** (or reuse one): https://console.cloud.google.com/projectcreate
2. **Enable the Analytics Data API**: https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com → *Enable*.
3. **Create a service account**: APIs & Services → Credentials → *Create credentials* → *Service account*. Name it e.g. `ga-reader`. Skip the optional role steps → *Done*.
4. **Make a key**: click the service account → *Keys* → *Add key* → *Create new key* → **JSON**. A file downloads. Save it as `ga-analysis/service-account.json`. **This is a secret — it is git-ignored, never commit it.**
5. **Grant it read access in GA**: analytics.google.com → *Admin* (gear) → under the `www.robertritacca.com` property → *Property access management* → **+** → paste the service account email (looks like `ga-reader@<project>.iam.gserviceaccount.com`) → role **Viewer** → *Add*.

## Run

```bash
cd ga-analysis
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python pull_ga.py --days 90       # or --start 2026-01-01 --end 2026-06-30
```

Outputs land in `ga-analysis/output/` (git-ignored): one CSV per report plus `all.json`.
