#!/usr/bin/env python3
"""Pull a broad snapshot of GA4 data for www.robertritacca.com into CSV + JSON.

Auth: expects a service-account key. Point GOOGLE_APPLICATION_CREDENTIALS at it,
or drop the file next to this script as `service-account.json`.

Usage:
    python pull_ga.py                 # last 28 days
    python pull_ga.py --days 90       # last 90 days
    python pull_ga.py --start 2026-01-01 --end 2026-06-30
"""

import argparse
import json
import os
from datetime import date, timedelta
from pathlib import Path

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)

HERE = Path(__file__).resolve().parent
OUTPUT_DIR = HERE / "output"


def _property_id() -> str:
    # Kept out of the source: this repo is public. Env var wins; otherwise
    # read the git-ignored property-id.txt next to this script.
    pid = os.environ.get("GA_PROPERTY_ID", "").strip()
    if not pid:
        id_file = HERE / "property-id.txt"
        if id_file.exists():
            pid = id_file.read_text().strip()
    if not pid:
        raise SystemExit(
            "GA4 property id not found. Set GA_PROPERTY_ID or write the id to "
            "ga-analysis/property-id.txt (git-ignored). It's the numeric id under "
            "Admin → Property settings in analytics.google.com."
        )
    return pid


PROPERTY_ID = _property_id()

# Each report: (name, [dimensions], [metrics], optional order-by-metric)
REPORTS = [
    ("daily_trend", ["date"],
     ["activeUsers", "newUsers", "sessions", "screenPageViews", "averageSessionDuration"], "date"),
    ("channels", ["sessionDefaultChannelGroup"],
     ["sessions", "activeUsers", "newUsers", "engagementRate", "averageSessionDuration"], "sessions"),
    ("top_pages", ["pageTitle", "pagePath"],
     ["screenPageViews", "activeUsers", "averageSessionDuration"], "screenPageViews"),
    ("countries", ["country"],
     ["activeUsers", "sessions", "engagementRate"], "activeUsers"),
    ("devices", ["deviceCategory"],
     ["activeUsers", "sessions", "engagementRate"], "activeUsers"),
    ("sources", ["sessionSource", "sessionMedium"],
     ["sessions", "activeUsers", "newUsers"], "sessions"),
    ("landing_pages", ["landingPage"],
     ["sessions", "activeUsers", "bounceRate", "averageSessionDuration"], "sessions"),
    ("events", ["eventName"],
     ["eventCount", "activeUsers"], "eventCount"),
]


def resolve_credentials() -> None:
    if os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        return
    local = HERE / "service-account.json"
    if local.exists():
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(local)
        return
    raise SystemExit(
        "No credentials found. Set GOOGLE_APPLICATION_CREDENTIALS or place "
        "service-account.json in the ga-analysis/ folder."
    )


def run_report(client, name, dims, metrics, order_metric, start, end):
    req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in metrics],
        limit=250,
    )
    resp = client.run_report(req)
    header = dims + metrics
    rows = []
    for r in resp.rows:
        vals = [c.value for c in r.dimension_values] + [c.value for c in r.metric_values]
        rows.append(dict(zip(header, vals)))
    return header, rows


def write_csv(path, header, rows):
    import csv
    with open(path, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=header)
        w.writeheader()
        w.writerows(rows)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--start")
    ap.add_argument("--end")
    args = ap.parse_args()

    if args.start and args.end:
        start, end = args.start, args.end
    else:
        end = date.today().isoformat()
        start = (date.today() - timedelta(days=args.days)).isoformat()

    resolve_credentials()
    client = BetaAnalyticsDataClient()
    OUTPUT_DIR.mkdir(exist_ok=True)

    combined = {"range": {"start": start, "end": end}, "reports": {}}
    for name, dims, metrics, order_metric in REPORTS:
        try:
            header, rows = run_report(client, name, dims, metrics, order_metric, start, end)
            write_csv(OUTPUT_DIR / f"{name}.csv", header, rows)
            combined["reports"][name] = rows
            print(f"  {name:14s} {len(rows):4d} rows")
        except Exception as e:  # keep going if one report fails
            print(f"  {name:14s} FAILED: {e}")
            combined["reports"][name] = {"error": str(e)}

    with open(OUTPUT_DIR / "all.json", "w") as f:
        json.dump(combined, f, indent=2)
    print(f"\nWrote CSVs + all.json to {OUTPUT_DIR}  ({start} -> {end})")


if __name__ == "__main__":
    main()
