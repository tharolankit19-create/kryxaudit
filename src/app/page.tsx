import Nav from "@/components/Nav";
import ScanForm from "@/components/ScanForm";
import ScanningAnimation from "@/components/ScanningAnimation";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-8 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-flame/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-flame">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          Competitor scan for founders
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
          Know your competitors <span className="underline-flame">before</span> you build.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
          Describe your startup idea. IdeaGap scans Product Hunt and the live web, flags the
          dead competitors, and names the one gap none of them solve.
        </p>

        <div className="mt-10">
          <ScanForm />
        </div>

        <div className="mt-14">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-ink/40">
            Scanning across
          </p>
          <ScanningAnimation active={false} />
        </div>
      </section>

      <SocialProof />

      <footer className="mx-auto w-full max-w-5xl px-4 pb-12 pt-4 text-center text-xs text-ink/40">
        IdeaGap · Free scan, then unlock the full gap for $4.99. No signup.
      </footer>
    </main>
  );
}
