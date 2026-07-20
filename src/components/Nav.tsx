import Link from "next/link";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#compare", label: "Compare" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <div className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-3 shadow-[0_1px_20px_rgba(10,10,10,0.06)] backdrop-blur">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-flame text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3l7 6-2.5 9h-9L5 9l7-6z" fill="currentColor" opacity="0.9" />
            </svg>
          </span>
          <span className="font-display text-lg font-black tracking-tight">IdeaGap</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#scan"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Validate My Idea →
        </a>
      </nav>
    </div>
  );
}
