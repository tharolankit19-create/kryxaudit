import Reveal from "../Reveal";

export default function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-24 text-center">
      <Reveal>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
          Someone is validating your idea right now.
          <br />
          <span className="underline-flame">Be the one who did it first.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
          30 seconds. No signup. Free to see how crowded your space really is.
        </p>
        <a
          href="#scan"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-flame px-8 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-105 active:scale-[0.99]"
        >
          Validate My Idea →
        </a>
      </Reveal>
    </section>
  );
}
