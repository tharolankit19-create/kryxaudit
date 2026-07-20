import type { RawResult, Competitor } from "./types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function apiKey() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY missing.");
  return key;
}

function model() {
  return process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
}

async function chat(messages: { role: string; content: string }[], jsonMode = true) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      "X-Title": "IdeaGap",
    },
    body: JSON.stringify({
      model: model(),
      messages,
      temperature: 0.4,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

function safeParse<T>(raw: string, fallback: T): T {
  try {
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}

/** Step (a): expand an idea into 6-8 semantic search queries. */
export async function expandQueries(idea: string): Promise<string[]> {
  const content = await chat([
    {
      role: "system",
      content:
        "You are a market-research assistant. Given a startup idea, produce 6 to 8 short, diverse search queries a founder would use to find existing competitors and similar products. Return strict JSON: {\"queries\": string[]}. Keep each query under 8 words.",
    },
    { role: "user", content: idea },
  ]);
  const parsed = safeParse<{ queries: string[] }>(content, { queries: [] });
  const queries = (parsed.queries || []).map((q) => String(q).trim()).filter(Boolean);
  return queries.slice(0, 8);
}

/** Step (c): cluster/dedupe, score deadness, flag tagline collision, write The Gap. */
export async function analyzeCompetitors(
  idea: string,
  raw: RawResult[]
): Promise<{
  competitors: Competitor[];
  taglineCollision: string | null;
  gap: string;
  fundedSignals: string[];
}> {
  if (raw.length === 0) {
    return {
      competitors: [],
      taglineCollision: null,
      gap: "No direct competitors surfaced — this space looks wide open, which usually means either untapped opportunity or unproven demand.",
      fundedSignals: [],
    };
  }

  const content = await chat([
    {
      role: "system",
      content: [
        "You analyze a startup idea against a list of raw competitor search results.",
        "Do ALL of the following and return strict JSON only:",
        "1. Cluster and dedupe near-identical products into single entries.",
        "2. For each competitor set `dead` true if it looks abandoned (old last activity, no reachable landing page, stale). Use `reachable` and `lastActivity` hints.",
        "3. Set `funded` true if the tagline/name hints at funding, traction, or a well-known backed product.",
        "4. Detect if two or more competitors share essentially the same tagline/positioning as the user's idea — describe it in `taglineCollision` (one short sentence) or null if none.",
        "5. Write `gap`: ONE punchy sentence naming a real weakness none of these competitors solve for the user's idea.",
        "Return JSON shape: {\"competitors\":[{\"name\":string,\"tagline\":string,\"url\":string|null,\"source\":string,\"lastActivity\":string|null,\"reachable\":boolean,\"dead\":boolean,\"funded\":boolean}],\"taglineCollision\":string|null,\"gap\":string}",
      ].join("\n"),
    },
    {
      role: "user",
      content: JSON.stringify({ idea, results: raw.slice(0, 40) }),
    },
  ]);

  const parsed = safeParse<{
    competitors: Competitor[];
    taglineCollision: string | null;
    gap: string;
  }>(content, { competitors: [], taglineCollision: null, gap: "" });

  const competitors: Competitor[] = (parsed.competitors || []).map((c) => ({
    name: String(c.name || "Unknown"),
    tagline: String(c.tagline || ""),
    url: c.url ?? null,
    source: String(c.source || "search"),
    lastActivity: c.lastActivity ?? null,
    reachable: Boolean(c.reachable),
    dead: Boolean(c.dead),
    funded: Boolean(c.funded),
  }));

  const fundedSignals = competitors.filter((c) => c.funded).map((c) => c.name);
  const gap =
    parsed.gap && parsed.gap.trim().length > 0
      ? parsed.gap.trim()
      : "None of these competitors combine the exact focus and simplicity your idea proposes.";

  return {
    competitors,
    taglineCollision: parsed.taglineCollision ?? null,
    gap,
    fundedSignals,
  };
}
