"use client";

import { motion } from "framer-motion";

const PLATFORMS = [
  { key: "ph", label: "Product Hunt" },
  { key: "fc", label: "Firecrawl" },
  { key: "tm", label: "TrustMrr" },
  { key: "web", label: "Live web" },
];

export default function ScanningAnimation({ active = true }: { active?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="grid grid-cols-4 gap-3">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0.4, y: 6 }}
            animate={
              active
                ? { opacity: [0.4, 1, 0.4], y: [6, 0, 6] }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 1.6,
              repeat: active ? Infinity : 0,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-[0_1px_10px_rgba(10,10,10,0.08)]">
              <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-flame" />
            </div>
            <span className="text-[10px] font-medium text-ink/60">{p.label}</span>
          </motion.div>
        ))}
      </div>

      {active && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 overflow-hidden rounded-xl">
          <div className="absolute inset-y-0 w-1/3 animate-scan-sweep bg-gradient-to-r from-transparent via-flame/25 to-transparent" />
        </div>
      )}
    </div>
  );
}
