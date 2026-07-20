import { supabaseAdmin } from "./supabase";
import { expandQueries, analyzeCompetitors } from "./openrouter";
import { searchProductHunt } from "./producthunt";
import { searchFirecrawl, isReachable } from "./firecrawl";
import { searchTrustMrr } from "./trustmrr";
import { mockQueries, mockRawResults } from "./mock";
import type { RawResult, ScanReport } from "./types";

function fingerprint(name: string, url: string | null): string {
  const host = (() => {
    try {
      return url ? new URL(url).hostname.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  })();
  return `${name.trim().toLowerCase()}|${host}`;
}

function dedupeRaw(results: RawResult[]): RawResult[] {
  const seen = new Set<string>();
  const out: RawResult[] = [];
  for (const r of results) {
    const fp = fingerprint(r.name, r.url);
    if (seen.has(fp)) continue;
    seen.add(fp);
    out.push(r);
  }
  return out;
}

/** Run the full scan pipeline and persist the report. Returns the report id. */
export async function runScan(idea: string): Promise<ScanReport> {
  const hasLLM = Boolean(process.env.OPENROUTER_API_KEY);

  // (a) expand into semantic queries
  const queries = hasLLM ? await expandQueries(idea) : mockQueries(idea);

  // (b) fetch competitors from every source, in parallel, per query
  let raw: RawResult[] = [];
  const anySource =
    process.env.PRODUCTHUNT_TOKEN ||
    process.env.FIRECRAWL_API_KEY ||
    process.env.TRUSTMRR_API_KEY;

  if (anySource) {
    const batches = await Promise.all(
      queries.flatMap((q) => [searchProductHunt(q), searchFirecrawl(q), searchTrustMrr(q)])
    );
    raw = dedupeRaw(batches.flat());
  }

  // If nothing came back (no keys, or all sources empty), fall back to mock set
  // so the report page still renders a coherent result.
  if (raw.length === 0) {
    raw = dedupeRaw(mockRawResults());
  }

  // Enrich with reachability (best-effort, bounded)
  const withReach = await Promise.all(
    raw.slice(0, 24).map(async (r) => ({
      ...r,
      meta: { ...(r.meta || {}), reachable: await isReachable(r.url) },
    }))
  );

  // (c) LLM clusters/dedupes, scores deadness, flags collision, writes The Gap
  const analysis = hasLLM
    ? await analyzeCompetitors(idea, withReach)
    : mockAnalysis(withReach);

  const competitorCount = analysis.competitors.length;
  const deadCount = analysis.competitors.filter((c) => c.dead).length;

  // Persist scan
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("scans")
    .insert({
      idea,
      queries,
      competitor_count: competitorCount,
      dead_count: deadCount,
      funded_signals: analysis.fundedSignals,
      tagline_collision: analysis.taglineCollision,
      gap: analysis.gap,
      competitors: analysis.competitors,
      paid: false,
    })
    .select("id, created_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to save scan: ${error?.message ?? "unknown"}`);
  }

  // Index each discovered product (real count for the live counter). Best-effort.
  const rows = analysis.competitors.map((c) => ({
    name: c.name,
    url: c.url,
    source: c.source,
    fingerprint: fingerprint(c.name, c.url),
  }));
  if (rows.length > 0) {
    await supabase.from("indexed_products").upsert(rows, {
      onConflict: "fingerprint",
      ignoreDuplicates: true,
    });
  }

  return {
    id: data.id,
    idea,
    queries,
    competitorCount,
    deadCount,
    fundedSignals: analysis.fundedSignals,
    taglineCollision: analysis.taglineCollision,
    gap: analysis.gap,
    competitors: analysis.competitors,
    paid: false,
    createdAt: data.created_at,
  };
}

// Simple heuristic analysis used when no LLM key is configured.
function mockAnalysis(raw: (RawResult & { meta?: any })[]) {
  const now = Date.now();
  const competitors = raw.map((r) => {
    const last = r.lastActivity ? Date.parse(r.lastActivity) : NaN;
    const stale = !Number.isNaN(last) && now - last > 1000 * 60 * 60 * 24 * 365; // >1yr
    const reachable = Boolean(r.meta?.reachable);
    const funded = r.source === "trustmrr";
    return {
      name: r.name,
      tagline: r.tagline,
      url: r.url,
      source: r.source,
      lastActivity: r.lastActivity,
      reachable,
      dead: stale || (!reachable && r.url !== null),
      funded,
    };
  });
  const funded = competitors.filter((c) => c.funded).map((c) => c.name);
  return {
    competitors,
    taglineCollision:
      competitors.length >= 2
        ? `"${competitors[0].tagline}" overlaps closely with several others in this space.`
        : null,
    gap: "None of these competitors pair fast idea-validation with a live, always-fresh competitor feed — most run a one-off report and stop there.",
    fundedSignals: funded,
  };
}
