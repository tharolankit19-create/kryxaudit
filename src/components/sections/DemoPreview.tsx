import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

export default function DemoPreview() {
  return (
    <section id="demo" className="mx-auto w-full max-w-5xl px-4 py-20">
      <Reveal className="text-center">
        <SectionLabel>See it before you run it</SectionLabel>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
          This is the report you get.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
          Free the moment your scan finishes: competitor count, how many are dead, and
          the tagline collision. The Gap is the paid punchline.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <BracketCard className="mx-auto max-w-3xl rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-flame">
            Your scan
          </p>
          <p className="mt-2 font-display text-2xl font-black tracking-tight">
            &ldquo;Voice notes → scheduled tweets in my writing style&rdquo;
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { n: "11", l: "competitors found" },
              { n: "4", l: "look dead", flame: true },
              { n: "3", l: "funding signals" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-canvas p-4 text-center">
                <div className={`font-display text-3xl font-black ${s.flame ? "text-flame" : ""}`}>
                  {s.n}
                </div>
                <div className="mt-1 text-xs text-ink/60">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-canvas p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
              Tagline collision
            </p>
            <p className="mt-1 text-sm text-ink/80">
              Two products already pitch &ldquo;turn your voice into content&rdquo; almost word-for-word.
            </p>
          </div>

          {/* Locked gap teaser */}
          <div className="relative mt-4 overflow-hidden rounded-xl border border-flame/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-flame">The Gap</p>
            <p className="mt-1 select-none font-display text-lg font-black leading-snug blur-sm">
              None of them let you approve drafts by voice reply, which is exactly where
              busy founders drop off — your wedge is the last mile of trust.
            </p>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white" />
            <div className="relative mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
              🔒 Unlocks for $4.99
            </div>
          </div>
        </BracketCard>
      </Reveal>
    </section>
  );
}
