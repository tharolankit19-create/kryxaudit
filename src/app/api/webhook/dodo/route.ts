import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/dodo";
import { markPaid } from "@/lib/report";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const ok = verifyWebhook(rawBody, {
    id: req.headers.get("webhook-id"),
    timestamp: req.headers.get("webhook-timestamp"),
    signature: req.headers.get("webhook-signature"),
  });

  if (!ok) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad JSON." }, { status: 400 });
  }

  const type: string = event?.type || event?.event_type || "";
  const isPaid =
    type.includes("payment.succeeded") ||
    type.includes("payment_succeeded") ||
    event?.data?.status === "succeeded";

  const scanId: string | undefined =
    event?.data?.metadata?.scanId || event?.metadata?.scanId;

  if (isPaid && scanId) {
    try {
      await markPaid(scanId);
    } catch (err) {
      console.error("[/api/webhook/dodo] markPaid failed", err);
      return NextResponse.json({ error: "Update failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
