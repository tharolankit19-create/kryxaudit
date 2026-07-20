import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

const PAINS = [
  {
    stat: "6 months",
    label: "wasted building",
    body: "You code nights and weekends — only to Google your idea at launch and find 12 startups already doing it.",
  },
  {
    stat: "4 funded",
    label: "already ahead of you",
    body: "Someone raised a seed round for your exact pitch last quarter. You just didn't know to look.",
  },
  {
    stat: "0 gaps",
    label: "you can name",
    body: "Even if you're different, you can't say how in one sentence. So investors and users don't either.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="mx-auto w-full max-w-5xl px-4 py-20">
      <Reveal className="text-center">
        <SectionLabel>The founder trap</SectionLabel>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
          The graveyard is full of ideas that had <span className="underline-flame">3 competitors</span> the founder never checked.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
          Nobody skips validation on purpose. They skip it because checking properly
          takes a full weekend of tabs, and the excitement to build wins. Then reality
          shows up — after the money and months are gone.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PAINS.map((p, i) => (
          <Reveal key={p.stat} delay={i * 0.08}>
            <BracketCard className="h-full rounded-2xl p-7">
              <div className="font-display text-4xl font-black text-flame">{p.stat}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink/50">
                {p.label}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{p.body}</p>
            </BracketCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 text-center">
        <p className="mx-auto max-w-2xl text-base font-semibold text-ink/80">
          Every day you don&apos;t check is a day a funded competitor gets further ahead.
          The gap you could own is closing while you read this.
        </p>
      </Reveal>
    </section>
  );
}
