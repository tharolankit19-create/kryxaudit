import { createClient } from "@supabase/supabase-js";

// Server-only admin client. Uses the service key, which bypasses RLS.
// Never import this into client components.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars missing (SUPABASE_URL / SUPABASE_SERVICE_KEY).");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
