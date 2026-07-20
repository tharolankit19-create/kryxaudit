import type { RawResult } from "./types";

// Deterministic-ish mock competitor set, used when no external API keys are
// configured so the full flow works end-to-end before env vars are filled.
export function mockQueries(idea: string): string[] {
  const seed = idea.split(/\s+/).slice(0, 3).join(" ") || "your idea";
  return [
    `${seed} alternatives`,
    `${seed} competitors`,
    `best ${seed} tools`,
    `${seed} for startups`,
    `${seed} saas`,
    `open source ${seed}`,
    `${seed} pricing`,
  ];
}

export function mockRawResults(): RawResult[] {
  return [
    { name: "LaunchLoop", tagline: "Validate your startup idea in minutes", url: "https://example.com/launchloop", source: "producthunt", lastActivity: "2025-11-02" },
    { name: "IdeaCheck", tagline: "AI market research for founders", url: "https://example.com/ideacheck", source: "firecrawl", lastActivity: "2023-04-18" },
    { name: "RivalScope", tagline: "Find and track your competitors", url: "https://example.com/rivalscope", source: "trustmrr", lastActivity: "2026-06-30" },
    { name: "MarketMate", tagline: "Validate before you build", url: "https://example.com/marketmate", source: "producthunt", lastActivity: "2022-09-01" },
    { name: "NicheFinder", tagline: "Discover underserved markets", url: "https://example.com/nichefinder", source: "firecrawl", lastActivity: "2024-12-11" },
    { name: "CompeteAI", tagline: "Competitive intelligence, automated", url: "https://example.com/competeai", source: "trustmrr", lastActivity: "2026-05-20" },
  ];
}
