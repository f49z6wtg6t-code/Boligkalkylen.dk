-- BoligKalkylen.dk — initial schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- leads
-- ============================================================
create table if not exists leads (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz not null default now(),
  navn            text not null,
  telefon         text not null,
  email           text not null,
  postnr          text not null,
  calculator_type text not null check (calculator_type in ('solceller', 'badevaerelse')),
  beregnet_vaerdi numeric not null,
  input_data      jsonb not null default '{}'::jsonb,
  kilde           text not null default 'boligkalkylen',
  status          text not null default 'ny' check (status in ('ny', 'kontaktet', 'tilbud_sendt', 'vundet', 'tabt')),
  noter           text
);

-- Index for common queries
create index if not exists leads_calculator_type_idx on leads (calculator_type);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);

-- Row-level security: only service role can read/write
alter table leads enable row level security;

create policy "Service role full access"
  on leads
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================
-- fagfolk (craftsmen / contractors)
-- ============================================================
create table if not exists fagfolk (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  navn        text not null,
  virksomhed  text,
  telefon     text not null,
  email       text not null,
  postnr      text not null,
  kategorier  text[] not null default '{}',  -- e.g. ARRAY['solceller','badevaerelse']
  aktiv       boolean not null default true,
  noter       text
);

create index if not exists fagfolk_kategorier_idx on fagfolk using gin (kategorier);
create index if not exists fagfolk_postnr_idx on fagfolk (postnr);

alter table fagfolk enable row level security;

create policy "Service role full access"
  on fagfolk
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ============================================================
-- lead_salg (lead sales / distribution log)
-- ============================================================
create table if not exists lead_salg (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  lead_id     uuid not null references leads (id) on delete cascade,
  fagfolk_id  uuid not null references fagfolk (id) on delete cascade,
  pris        numeric,
  status      text not null default 'sendt' check (status in ('sendt', 'accepteret', 'afvist')),
  noter       text
);

create index if not exists lead_salg_lead_id_idx on lead_salg (lead_id);
create index if not exists lead_salg_fagfolk_id_idx on lead_salg (fagfolk_id);

alter table lead_salg enable row level security;

create policy "Service role full access"
  on lead_salg
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
