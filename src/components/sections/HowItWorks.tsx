import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const STEPS = [
  {
    n: "01",
    title: "Describe your idea",
    body: "One sentence is enough. No signup, no forms, no credit card. Paste what you'd tell a friend at a bar.",
  },
  {
    n: "02",
    title: "We scan the real market",
    body: "IdeaGap expands your idea into 6–8 search angles, then sweeps Product Hunt, the live web (Firecrawl), and revenue-verified startups (TrustMrr) in parallel.",
  },
  {
    n: "03",
    title: "AI clusters + scores",
    body: "It de-dupes the noise, checks which competitors are actually dead (stale, offline landing pages), and catches when someone's tagline collides with yours.",
  },
  {
    n: "04",
    title: "You get The Gap",
    body: "One sentence naming the weakness none of them solve — the exact wedge your idea can own. Plus the full competitor list with links.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-5xl px-4">
        <Reveal className="text-center">
          <SectionLabel>What IdeaGap does</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            A weekend of research, <span className="underline-flame">done in 30 seconds.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
            Not another AI chatbot guessing. IdeaGap pulls real, live products from the
            places founders actually launch — then an LLM turns the pile into a decision.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <BracketCard className="h-full rounded-2xl p-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl font-black text-flame">{s.n}</span>
                  <h3 className="font-display text-xl font-black tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.body}</p>
              </BracketCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
