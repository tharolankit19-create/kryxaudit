import Nav from "@/components/Nav";
import ScanForm from "@/components/ScanForm";
import ScanningAnimation from "@/components/ScanningAnimation";
import SocialProof from "@/components/SocialProof";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import DemoPreview from "@/components/sections/DemoPreview";
import Outcomes from "@/components/sections/Outcomes";
import Comparison from "@/components/sections/Comparison";
import Pricing from "@/components/sections/Pricing";
import Roadmap from "@/components/sections/Roadmap";
import Founder from "@/components/sections/Founder";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

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
          dead competitors, and names the one gap none of them solve — in 30 seconds.
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

      <Problem />
      <HowItWorks />
      <DemoPreview />
      <Outcomes />
      <Comparison />
      <Pricing />
      <Roadmap />
      <Founder />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
