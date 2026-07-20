# IdeaGap

Describe your startup idea → IdeaGap scans Product Hunt, Firecrawl, and TrustMrr
for competitors, flags the dead ones, detects tagline collisions, and names the
**one gap** none of them solve.

Free scan shows competitor count, dead count, and tagline collision. The Gap and
the full competitor list unlock for a one-time **$4.99** via Dodo Payments.

## Stack

- Next.js (App Router) + TypeScript + Tailwind + Framer Motion
- Supabase (Postgres) for storage + the live "products indexed" counter
- OpenRouter for the LLM (query expansion, clustering, deadness scoring, The Gap)
- Product Hunt API + Firecrawl + TrustMrr for competitor discovery
- Dodo Payments for one-time checkout
- Deploy target: Vercel

## Setup

1. **Install**

   ```bash
   npm install
   ```

2. **Database** — run `supabase/schema.sql` in your Supabase project's SQL editor.

3. **Env** — copy `.env.example` and fill it in (locally as `.env.local`, on
   Vercel as project env vars):

   | Var | Purpose |
   | --- | --- |
   | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` | Supabase (server uses the service key) |
   | `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` | LLM via OpenRouter |
   | `PRODUCTHUNT_TOKEN` | Product Hunt API |
   | `FIRECRAWL_API_KEY` | Firecrawl web search |
   | `TRUSTMRR_API_KEY` | TrustMrr search |
   | `DODO_API_KEY`, `DODO_WEBHOOK_SECRET`, `DODO_PRODUCT_ID` | Dodo Payments |
   | `NEXT_PUBLIC_BASE_URL` | Public site URL (checkout redirect + share links) |

4. **Run**

   ```bash
   npm run dev
   ```

### Graceful degradation

The app runs before every key is filled: if no LLM/source keys are present, a
mock competitor set is used so the full flow renders. **Supabase is required**
to persist and read scans (it also powers the real "products indexed" counter).

## Dodo webhook

Point a Dodo webhook at `POST /api/webhook/dodo`. On `payment.succeeded`, the
scan referenced by `metadata.scanId` is marked paid, unlocking The Gap and the
full competitor list. Signatures are verified with `DODO_WEBHOOK_SECRET`
(Standard Webhooks scheme).

## Flow

1. `/` — textarea → **Validate My Idea** → `POST /api/scan`
2. `/api/scan` — expand idea into queries → fetch competitors → LLM clusters,
   scores deadness, flags collisions, writes The Gap → store in Supabase
3. `/report/[id]` — free stats shown; The Gap + full list blurred behind checkout
4. Unlock via Dodo → webhook marks paid → content revealed
5. **Tweet this** shares the result
