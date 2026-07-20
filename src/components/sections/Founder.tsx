import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import BracketCard from "../BracketCard";

export default function Founder() {
  return (
    <section id="founder" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-3xl px-4">
        <Reveal>
          <BracketCard className="rounded-2xl p-8 sm:p-10">
            <SectionLabel>From the founder</SectionLabel>
            <p className="mt-6 font-display text-2xl font-black leading-snug tracking-tight">
              &ldquo;I built IdeaGap because I&apos;ve shipped ideas that already
              existed — and found out too late.&rdquo;
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              Every founder I know has a graveyard folder: projects abandoned the day
              they finally Googled properly. I wanted a tool that does the boring
              competitor sweep in seconds, tells you the truth, and points at the one
              gap worth building into. That&apos;s the whole product. No fluff, no
              subscription — just a fast, honest gut-check before you commit months.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-flame font-display font-black text-white">
                A
              </div>
              <div>
                <div className="text-sm font-bold">Ankit Tharol</div>
                <a
                  href="https://x.com/ankittharol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-flame hover:underline"
                >
                  @ankittharol
                </a>
              </div>
            </div>
          </BracketCard>
        </Reveal>
      </div>
    </section>
  );
}
