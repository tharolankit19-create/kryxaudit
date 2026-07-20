import type { RawResult } from "./types";

const FIRECRAWL_SEARCH = "https://api.firecrawl.dev/v1/search";

// Firecrawl web search -> public results for a query.
export async function searchFirecrawl(query: string): Promise<RawResult[]> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return [];

  try {
    const res = await fetch(FIRECRAWL_SEARCH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, limit: 5 }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const results = data?.data ?? data?.results ?? [];
    return (results as any[])
      .filter((r) => r && (r.title || r.url))
      .map((r) => ({
        name: r.title || r.url || "Untitled",
        tagline: r.description || r.snippet || "",
        url: r.url || null,
        source: "firecrawl",
        lastActivity: null,
        meta: {},
      })) as RawResult[];
  } catch {
    return [];
  }
}

// Best-effort reachability check for a landing page.
export async function isReachable(url: string | null): Promise<boolean> {
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(6000),
      redirect: "follow",
    });
    return res.ok;
  } catch {
    return false;
  }
}
