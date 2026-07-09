import { NextResponse } from "next/server";

const GITHUB_USERNAME = "robritacca-dotcom";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

interface ContributionsResponse {
  total: { lastYear: number };
  contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
}

/**
 * Proxies the public GitHub contributions API so the data is cached
 * server-side and the third-party dependency stays out of the client.
 */
export async function GET() {
  try {
    const response = await fetch(CONTRIBUTIONS_API, {
      next: { revalidate: 21600 }, // refresh every 6 hours
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 }
      );
    }

    const data: ContributionsResponse = await response.json();

    return NextResponse.json({
      total: data.total.lastYear,
      days: data.contributions,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 502 }
    );
  }
}
