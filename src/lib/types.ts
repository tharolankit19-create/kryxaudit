export type Competitor = {
  name: string;
  tagline: string;
  url: string | null;
  source: "producthunt" | "firecrawl" | "trustmrr" | string;
  lastActivity: string | null; // ISO date or human string, best-effort
  reachable: boolean; // landing page reachable?
  dead: boolean; // scored by the LLM
  funded: boolean; // funding signal detected
};

export type ScanReport = {
  id: string;
  idea: string;
  queries: string[];
  competitorCount: number;
  deadCount: number;
  fundedSignals: string[]; // names of competitors with funding signals
  taglineCollision: string | null; // description of a tagline collision, or null
  gap: string; // "The Gap" — one sentence
  competitors: Competitor[];
  paid: boolean;
  createdAt: string;
};

export type RawResult = {
  name: string;
  tagline: string;
  url: string | null;
  source: string;
  lastActivity: string | null;
  meta?: Record<string, unknown>;
};
