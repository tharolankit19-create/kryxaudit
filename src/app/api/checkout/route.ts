import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/dodo";
import { getReport } from "@/lib/report";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const scanId = String(body?.scanId ?? "").trim();
    if (!scanId) {
      return NextResponse.json({ error: "Missing scanId." }, { status: 400 });
    }

    const report = await getReport(scanId);
    if (!report) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }
    if (report.paid) {
      // Already unlocked — send them straight back to the report.
      return NextResponse.json({ url: `/report/${scanId}?unlocked=1` });
    }

    const { url } = await createCheckout(scanId);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      { error: err?.message || "Could not start checkout." },
      { status: 500 }
    );
  }
}
