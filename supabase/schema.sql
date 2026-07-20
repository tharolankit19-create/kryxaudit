-- IdeaGap schema
-- Run this in the Supabase SQL editor (or via CLI) once.

-- One row per idea scan / report.
create table if not exists public.scans (
  id uuid primary key default gen_random_uuid(),
  idea text not null,
  queries jsonb not null default '[]'::jsonb,
  competitor_count int not null default 0,
  dead_count int not null default 0,
  funded_signals jsonb not null default '[]'::jsonb,
  tagline_collision text,
  gap text,
  competitors jsonb not null default '[]'::jsonb,
  paid boolean not null default false,
  created_at timestamptz not null default now()
);

-- Every distinct competitor we discover gets indexed here. Powers the
-- "total products indexed" live counter (a real count, never faked).
create table if not exists public.indexed_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  source text,
  fingerprint text unique,
  created_at timestamptz not null default now()
);

create index if not exists scans_created_at_idx on public.scans (created_at desc);

-- Row Level Security: the app talks to Supabase only from the server using the
-- service key, which bypasses RLS. Enable RLS with no public policies so the
-- anon key cannot read/write directly.
alter table public.scans enable row level security;
alter table public.indexed_products enable row level security;
