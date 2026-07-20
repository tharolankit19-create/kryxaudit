import { notFound } from "next/navigation";
import Link from "next/link";
import { getReport } from "@/lib/report";
import ReportView from "@/components/ReportView";

export const dynamic = "force-dynamic";

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await getReport(params.id);
  if (!report) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const shareUrl = `${baseUrl}/report/${report.id}`;

  // Free fields always sent. Gated fields only sent once paid.
  const view = {
    id: report.id,
    idea: report.idea,
    competitorCount: report.competitorCount,
    deadCount: report.deadCount,
    fundedCount: report.fundedSignals.length,
    taglineCollision: report.taglineCollision,
    paid: report.paid,
    gap: report.paid ? report.gap : null,
    competitors: report.paid ? report.competitors : null,
    shareUrl,
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition hover:text-ink"
        >
          ← New scan
        </Link>
        <ReportView report={view} />
      </div>
    </main>
  );
}
