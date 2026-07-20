import { supabaseAdmin } from "./supabase";
import type { ScanReport } from "./types";

export async function getReport(id: string): Promise<ScanReport | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("scans")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;

  return {
    id: data.id,
    idea: data.idea,
    queries: data.queries ?? [],
    competitorCount: data.competitor_count ?? 0,
    deadCount: data.dead_count ?? 0,
    fundedSignals: data.funded_signals ?? [],
    taglineCollision: data.tagline_collision ?? null,
    gap: data.gap ?? "",
    competitors: data.competitors ?? [],
    paid: Boolean(data.paid),
    createdAt: data.created_at,
  };
}

export async function markPaid(id: string): Promise<void> {
  const supabase = supabaseAdmin();
  await supabase.from("scans").update({ paid: true }).eq("id", id);
}

export async function getStats(): Promise<{
  productsIndexed: number;
  recentScans: { id: string; idea: string; competitorCount: number; deadCount: number; createdAt: string }[];
}> {
  const supabase = supabaseAdmin();

  const [{ count }, { data: recent }] = await Promise.all([
    supabase.from("indexed_products").select("*", { count: "exact", head: true }),
    supabase
      .from("scans")
      .select("id, idea, competitor_count, dead_count, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    productsIndexed: count ?? 0,
    recentScans: (recent ?? []).map((r: any) => ({
      id: r.id,
      idea: r.idea,
      competitorCount: r.competitor_count ?? 0,
      deadCount: r.dead_count ?? 0,
      createdAt: r.created_at,
    })),
  };
}
