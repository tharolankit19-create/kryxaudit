"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "./CountUp";
import BracketCard from "./BracketCard";

type Stats = {
  productsIndexed: number;
  recentScans: {
    id: string;
    idea: string;
    competitorCount: number;
    deadCount: number;
    createdAt: string;
  }[];
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function SocialProof() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ productsIndexed: 0, recentScans: [] }));
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <BracketCard className="rounded-2xl p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-flame">
            Products indexed
          </p>
          <div className="mt-3 font-display text-6xl font-black tracking-tight">
            <CountUp to={stats?.productsIndexed ?? 0} />
          </div>
          <p className="mt-2 text-sm text-ink/60">
            Real competitors discovered and stored across every scan run so far.
          </p>
        </BracketCard>

        <BracketCard className="rounded-2xl p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-flame">
            Recent scans
          </p>
          <div className="mt-3 space-y-3">
            {stats && stats.recentScans.length > 0 ? (
              stats.recentScans.map((s) => (
                <Link
                  key={s.id}
                  href={`/report/${s.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-1 py-1 text-sm transition hover:bg-canvas"
                >
                  <span className="truncate text-ink/80">
                    {s.idea.length > 42 ? s.idea.slice(0, 42) + "…" : s.idea}
                  </span>
                  <span className="shrink-0 text-xs text-ink/50">
                    {s.competitorCount} found · {s.deadCount} dead · {timeAgo(s.createdAt)}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-ink/50">
                No scans yet — be the first to run one above.
              </p>
            )}
          </div>
        </BracketCard>
      </div>
    </section>
  );
}
