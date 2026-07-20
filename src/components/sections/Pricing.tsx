import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const INCLUDED = [
  "The Gap — the one weakness none of them solve, in a sentence",
  "Full competitor list with live links",
  "Dead vs. alive flag on every competitor",
  "Funding & traction signals surfaced",
  "Tagline-collision breakdown",
  "Shareable result card for X",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-3xl px-4">
        <Reveal className="text-center">
          <SectionLabel>The audit</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
            $4.99, <span className="underline-flame">once.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
            Cheaper than the coffee you&apos;d drink deciding whether to build. No
            subscription. No signup. One idea, one clear answer.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <BracketCard flame className="rounded-2xl p-8">
            <div className="flex items-end justify-center gap-2">
              <span className="font-display text-6xl font-black tracking-tight">$4.99</span>
              <span className="pb-2 text-lg text-ink/50">/ scan</span>
            </div>
            <p className="mt-2 text-center text-sm text-ink/60">
              Top-tier audit. Pay only when you like what the free scan shows you.
            </p>

            <ul className="mx-auto mt-8 max-w-md space-y-3">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm text-ink/80">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#scan"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-flame px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-105 active:scale-[0.99]"
            >
              Run my free scan first →
            </a>
            <p className="mt-3 text-center text-xs text-ink/50">
              Free scan is genuinely free. You only pay to reveal The Gap.
            </p>
          </BracketCard>
        </Reveal>
      </div>
    </section>
  );
}
