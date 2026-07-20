"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";
import BracketCard from "./BracketCard";
import type { Competitor } from "@/lib/types";

type View = {
  id: string;
  idea: string;
  competitorCount: number;
  deadCount: number;
  fundedCount: number;
  taglineCollision: string | null;
  paid: boolean;
  gap: string | null;
  competitors: Competitor[] | null;
  shareUrl: string;
};

export default function ReportView({ report }: { report: View }) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tweetText = `Ran my idea through IdeaGap. Found ${report.competitorCount} competitors. ${report.deadCount} are dead. Still building 😅 ${report.shareUrl}`;
  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  async function unlock() {
    setError(null);
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanId: report.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err?.message || "Checkout failed.");
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-flame">
        Your scan
      </p>
      <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
        &ldquo;{report.idea}&rdquo;
      </h1>

      {/* Free stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <BracketCard className="rounded-xl p-5">
          <div className="font-display text-4xl font-black">
            <CountUp to={report.competitorCount} />
          </div>
          <p className="mt-1 text-sm text-ink/60">competitors found</p>
        </BracketCard>
        <BracketCard className="rounded-xl p-5" flame>
          <div className="font-display text-4xl font-black text-flame">
            <CountUp to={report.deadCount} />
          </div>
          <p className="mt-1 text-sm text-ink/60">look dead</p>
        </BracketCard>
        <BracketCard className="col-span-2 rounded-xl p-5 sm:col-span-1">
          <div className="font-display text-4xl font-black">
            <CountUp to={report.fundedCount} />
          </div>
          <p className="mt-1 text-sm text-ink/60">funding signals</p>
        </BracketCard>
      </div>

      {/* Tagline collision — free */}
      <div className="mt-4">
        <BracketCard className="rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            Tagline collision
          </p>
          <p className="mt-1 text-sm text-ink/80">
            {report.taglineCollision ?? "No obvious tagline collision detected. Your positioning looks distinct."}
          </p>
        </BracketCard>
      </div>

      {/* Tweet this */}
      <a
        href={tweetHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold transition hover:border-ink/30"
      >
        Tweet this →
      </a>

      {/* The Gap + full list — gated */}
      <div className="mt-8">
        {report.paid ? (
          <PaidContent gap={report.gap!} competitors={report.competitors ?? []} />
        ) : (
          <LockedContent
            competitorCount={report.competitorCount}
            onUnlock={unlock}
            loading={checkoutLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

function PaidContent({
  gap,
  competitors,
}: {
  gap: string;
  competitors: Competitor[];
}) {
  return (
    <div>
      <BracketCard className="rounded-2xl p-6" flame>
        <p className="text-xs font-semibold uppercase tracking-wider text-flame">
          The Gap
        </p>
        <p className="mt-2 font-display text-2xl font-black leading-snug tracking-tight">
          {gap}
        </p>
      </BracketCard>

      <h2 className="mb-3 mt-8 font-display text-xl font-black tracking-tight">
        All {competitors.length} competitors
      </h2>
      <div className="space-y-3">
        {competitors.map((c, i) => (
          <BracketCard key={i} className="rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{c.name}</span>
                  {c.dead && (
                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-bold uppercase text-ink/60">
                      Dead
                    </span>
                  )}
                  {c.funded && (
                    <span className="rounded-full bg-flame/10 px-2 py-0.5 text-[10px] font-bold uppercase text-flame">
                      Funded
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm text-ink/60">{c.tagline}</p>
                <p className="mt-0.5 text-xs text-ink/40">
                  {c.source}
                  {c.lastActivity ? ` · last activity ${c.lastActivity}` : ""}
                </p>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm font-semibold text-flame hover:underline"
                >
                  Visit →
                </a>
              )}
            </div>
          </BracketCard>
        ))}
      </div>
    </div>
  );
}

function LockedContent({
  competitorCount,
  onUnlock,
  loading,
  error,
}: {
  competitorCount: number;
  onUnlock: () => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <BracketCard className="relative overflow-hidden rounded-2xl p-6" flame>
      <p className="text-xs font-semibold uppercase tracking-wider text-flame">
        The Gap
      </p>

      {/* Blurred teaser (real content never sent to the client) */}
      <div className="relative mt-2">
        <p
          aria-hidden
          className="select-none font-display text-2xl font-black leading-snug tracking-tight blur-sm"
        >
          The one weakness every competitor in this space leaves wide open is
          hiding right here — and it is exactly where your idea can win.
        </p>
        <div className="mt-4 space-y-2" aria-hidden>
          {Array.from({ length: Math.min(4, Math.max(2, competitorCount)) }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-ink/5 blur-[2px]" />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative mt-6 text-center">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto max-w-sm"
        >
          <p className="font-display text-lg font-black">
            Unlock The Gap + all {competitorCount} competitors
          </p>
          <p className="mt-1 text-sm text-ink/60">
            One sentence that tells you where to win — plus the full list with
            links, dead flags, and funding signals.
          </p>
          <button
            onClick={onUnlock}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-flame px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? "Starting checkout…" : "Unlock for $4.99 →"}
          </button>
          {error && <p className="mt-2 text-sm text-flame">{error}</p>}
          <p className="mt-2 text-xs text-ink/40">One-time payment. No subscription.</p>
        </motion.div>
      </div>
    </BracketCard>
  );
}
