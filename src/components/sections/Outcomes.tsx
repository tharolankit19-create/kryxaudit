import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const ROWS = [
  {
    pain: "Building blind for months",
    result: "Know your competition in 30 seconds — before you write a line of code.",
  },
  {
    pain: "Can't tell if the space is dead or hot",
    result: "See exactly how many rivals are abandoned vs. actively funded.",
  },
  {
    pain: "No sharp answer to “why you?”",
    result: "One-sentence gap you can drop into a pitch, a landing page, or a tweet.",
  },
  {
    pain: "Wasted spend on a crowded idea",
    result: "Kill weak ideas for $4.99 instead of $50k and a year of your life.",
  },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-4xl px-4">
        <Reveal className="text-center">
          <SectionLabel>Pain → Outcome</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            Trade a weekend of doubt for <span className="underline-flame">one clear decision.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {ROWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <BracketCard className="rounded-2xl p-5">
                <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-ink/40 line-through">{r.pain}</span>
                  </div>
                  <div className="hidden text-flame sm:block">→</div>
                  <div className="text-sm font-semibold text-ink">{r.result}</div>
                </div>
              </BracketCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
