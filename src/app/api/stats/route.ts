import { NextResponse } from "next/server";
import { getStats } from "@/lib/report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (err: any) {
    console.error("[/api/stats]", err);
    return NextResponse.json({ productsIndexed: 0, recentScans: [] });
  }
}
