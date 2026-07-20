import type { RawResult } from "./types";

// TrustMrr — directory of startups with verified revenue. Used as a "funded /
// traction signal" source over public search results. The public API surface is
// small and undocumented; this wrapper is defensive and degrades to [] on any
// failure or missing key so a scan never breaks because of it.
const TRUSTMRR_SEARCH =
  process.env.TRUSTMRR_SEARCH_URL || "https://api.trustmrr.com/v1/search";

export async function searchTrustMrr(query: string): Promise<RawResult[]> {
  const key = process.env.TRUSTMRR_API_KEY;
  if (!key) return [];

  try {
    const url = new URL(TRUSTMRR_SEARCH);
    url.searchParams.set("q", query);
    url.searchParams.set("limit", "5");
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const results = data?.results ?? data?.data ?? data ?? [];
    if (!Array.isArray(results)) return [];
    return results
      .filter((r: any) => r && (r.name || r.title))
      .map((r: any) => ({
        name: r.name || r.title,
        tagline: r.description || r.tagline || "",
        url: r.url || r.website || null,
        source: "trustmrr",
        lastActivity: r.updated_at || r.last_active || null,
        // TrustMrr entries are, by definition, revenue-verified — a funding/traction signal.
        meta: { revenueVerified: true, mrr: r.mrr ?? null },
      })) as RawResult[];
  } catch {
    return [];
  }
}
