import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-ink/10 bg-white/60">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-14 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-flame text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3l7 6-2.5 9h-9L5 9l7-6z" fill="currentColor" opacity="0.9" />
              </svg>
            </span>
            <span className="font-display text-lg font-black tracking-tight">IdeaGap</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink/60">
            Scan your startup idea for competitors in seconds. Find the gap before you build.
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-ink/40">Contact us</p>
          <a
            href="mailto:ankittharol@getkryxai.com"
            className="mt-3 block text-sm font-semibold text-ink transition hover:text-flame"
          >
            ankittharol@getkryxai.com
          </a>
          <a
            href="https://x.com/ankittharol"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm font-semibold text-ink transition hover:text-flame"
          >
            @ankittharol on X
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 pb-8 text-xs text-ink/40 sm:flex-row">
        <span>© {new Date().getFullYear()} IdeaGap. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="#pricing" className="hover:text-ink">Pricing</Link>
          <Link href="#how" className="hover:text-ink">How it works</Link>
          <Link href="#scan" className="hover:text-ink">Validate</Link>
        </div>
      </div>
    </footer>
  );
}
