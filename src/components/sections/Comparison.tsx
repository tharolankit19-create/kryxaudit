import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const ROWS: { label: string; manual: string; chatbot: string; ideagap: string }[] = [
  { label: "Time to an answer", manual: "A full weekend", chatbot: "Fast but made-up", ideagap: "~30 seconds" },
  { label: "Real live products", manual: "If you dig", chatbot: "No — hallucinated", ideagap: "Yes — PH + web + TrustMrr" },
  { label: "Dead-competitor check", manual: "Manual guessing", chatbot: "No", ideagap: "Scored automatically" },
  { label: "Tagline collision flag", manual: "You'd miss it", chatbot: "No", ideagap: "Yes" },
  { label: "The one gap to own", manual: "Rarely", chatbot: "Generic advice", ideagap: "One sharp sentence" },
  { label: "Cost", manual: "Your time", chatbot: "$20/mo", ideagap: "$4.99 once" },
];

function Cell({ children, good }: { children: React.ReactNode; good?: boolean }) {
  return (
    <td className={`px-4 py-3 text-sm ${good ? "font-semibold text-ink" : "text-ink/50"}`}>
      <span className="inline-flex items-center gap-1.5">
        <span className={good ? "text-flame" : "text-ink/30"}>{good ? "✓" : "•"}</span>
        {children}
      </span>
    </td>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="mx-auto w-full max-w-5xl px-4 py-20">
      <Reveal className="text-center">
        <SectionLabel>Why not just Google it</SectionLabel>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
          Manual tabs vs. a chatbot vs. <span className="underline-flame">IdeaGap.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <BracketCard className="overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-ink/10 text-left">
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-ink/40"> </th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-ink/40">Doing it manually</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-ink/40">Generic AI chatbot</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-flame">IdeaGap</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold text-ink/80">{r.label}</td>
                    <Cell>{r.manual}</Cell>
                    <Cell>{r.chatbot}</Cell>
                    <Cell good>{r.ideagap}</Cell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BracketCard>
      </Reveal>
    </section>
  );
}
