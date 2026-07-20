"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ScanningAnimation from "./ScanningAnimation";

const STEPS = [
  "Expanding your idea into search queries…",
  "Scanning Product Hunt, Firecrawl & TrustMrr…",
  "Clustering and de-duping competitors…",
  "Scoring which ones are dead…",
  "Finding the gap none of them solve…",
];

export default function ScanForm() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (idea.trim().length < 8) {
      setError("Give us at least a sentence to work with.");
      return;
    }
    setLoading(true);

    // Advance the status copy while the request runs.
    let s = 0;
    const timer = setInterval(() => {
      s = Math.min(s + 1, STEPS.length - 1);
      setStep(s);
    }, 1800);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Scan failed.");
      router.push(`/report/${data.id}`);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Try again.");
      setLoading(false);
      clearInterval(timer);
    }
  }

  return (
    <div id="scan" className="mx-auto w-full max-w-2xl scroll-mt-24">
      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bracket rounded-2xl p-5 sm:p-6"
          >
            <span className="bracket-b" aria-hidden />
            <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-ink/70">
              Describe your startup idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={4}
              maxLength={1200}
              placeholder="e.g. A tool that turns your voice notes into scheduled tweets, tuned to your writing style."
              className="w-full resize-none rounded-xl border border-ink/10 bg-canvas px-4 py-3 text-base outline-none transition focus:border-flame focus:ring-2 focus:ring-flame/20"
            />
            {error && <p className="mt-2 text-sm text-flame">{error}</p>}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-flame px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-105 active:scale-[0.99]"
            >
              Validate My Idea →
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              Free scan. No signup. See competitors &amp; dead count instantly.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bracket rounded-2xl p-8 text-center"
          >
            <span className="bracket-b" aria-hidden />
            <ScanningAnimation active />
            <div className="mt-6 h-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm font-medium text-ink/70"
                >
                  {STEPS[step]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
