import { NextResponse } from "next/server";
import { runScan } from "@/lib/scan";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const idea = String(body?.idea ?? "").trim();

    if (idea.length < 8) {
      return NextResponse.json(
        { error: "Describe your idea in a bit more detail (at least a sentence)." },
        { status: 400 }
      );
    }
    if (idea.length > 1200) {
      return NextResponse.json({ error: "That's a bit long — keep it under 1200 characters." }, { status: 400 });
    }

    const report = await runScan(idea);

    // Only return the free fields + the report id from the scan endpoint.
    // The Gap and full competitor list are gated on the report page.
    return NextResponse.json({ id: report.id });
  } catch (err: any) {
    console.error("[/api/scan]", err);
    return NextResponse.json(
      { error: err?.message || "Scan failed. Please try again." },
      { status: 500 }
    );
  }
}
