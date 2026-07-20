export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-flame/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-flame">
      <span className="h-1.5 w-1.5 rounded-full bg-flame" />
      {children}
    </span>
  );
}
