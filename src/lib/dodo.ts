import crypto from "crypto";

// Dodo Payments. Defaults to the live API; override with DODO_API_BASE
// (e.g. https://test.dodopayments.com) when using test-mode keys.
const DODO_API_BASE = process.env.DODO_API_BASE || "https://api.dodopayments.com";

export const PRICE_USD = 4.99;

function apiKey() {
  const key = process.env.DODO_API_KEY;
  if (!key) throw new Error("DODO_API_KEY missing.");
  return key;
}

function baseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

/**
 * Create a one-time payment link for a scan's "Gap" unlock.
 * The scan id is carried in metadata so the webhook can unlock the right report.
 */
export async function createCheckout(scanId: string): Promise<{ url: string }> {
  const productId = process.env.DODO_PRODUCT_ID;
  if (!productId) throw new Error("DODO_PRODUCT_ID missing.");

  const res = await fetch(`${DODO_API_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_link: true,
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${baseUrl()}/report/${scanId}?unlocked=1`,
      metadata: { scanId },
      // Minimal placeholder billing/customer — Dodo collects real details at checkout.
      billing: { city: "", country: "US", state: "", street: "", zipcode: "" },
      customer: { email: "", name: "IdeaGap customer" },
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Dodo checkout error ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const url = data.payment_link || data.url || data.checkout_url;
  if (!url) throw new Error("Dodo did not return a payment link.");
  return { url };
}

/**
 * Verify a Standard-Webhooks signature (the scheme Dodo uses).
 * Header names: webhook-id, webhook-timestamp, webhook-signature.
 */
export function verifyWebhook(
  rawBody: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null }
): boolean {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret || !headers.id || !headers.timestamp || !headers.signature) return false;

  const key = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const secretBytes = Buffer.from(key, "base64");
  const signedContent = `${headers.id}.${headers.timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  // The signature header may contain multiple space-delimited "v1,<sig>" pairs.
  const passed = headers.signature.split(" ").some((part) => {
    const sig = part.includes(",") ? part.split(",")[1] : part;
    try {
      return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    } catch {
      return false;
    }
  });
  return passed;
}
