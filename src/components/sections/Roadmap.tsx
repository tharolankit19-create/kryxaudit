import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const ITEMS = [
  { tag: "Live now", title: "Idea → competitor scan + The Gap", done: true },
  { tag: "Live now", title: "Dead-competitor scoring & tagline collision", done: true },
  { tag: "Next", title: "Weekly re-scan alerts when a new rival launches", done: false },
  { tag: "Next", title: "Positioning generator built from your gap", done: false },
  { tag: "Later", title: "Export the audit as a shareable one-pager", done: false },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto w-full max-w-4xl px-4 py-20">
      <Reveal className="text-center">
        <SectionLabel>Where this is going</SectionLabel>
        <h2 className="mt-6 font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
          Roadmap
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          Built in the open. Early users shape what ships next.
        </p>
      </Reveal>

      <div className="mt-12 space-y-3">
        {ITEMS.map((it, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <BracketCard className="rounded-xl p-5">
              <div className="flex items-center gap-4">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    it.done ? "bg-flame text-white" : "bg-ink/10 text-ink/50"
                  }`}
                >
                  {it.done ? "✓" : "•"}
                </span>
                <span className="flex-1 text-sm font-semibold text-ink/80">{it.title}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    it.done ? "bg-flame/10 text-flame" : "bg-ink/5 text-ink/50"
                  }`}
                >
                  {it.tag}
                </span>
              </div>
            </BracketCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
