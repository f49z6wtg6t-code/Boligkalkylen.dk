-- 003_analytics.sql
-- Analytics tracking + cross-tracking til Motivo Gruppen
-- Idempotent — tryg at køre mod eksisterende database

-- ============================================================
-- LEADS: tilføj source_ref, session_id, fix calculator_type
-- ============================================================

-- source_ref: unik UUID pr. lead — bruges til cross-tracking med Motivo
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS source_ref uuid NOT NULL DEFAULT gen_random_uuid();

-- session_id: kobler lead til analytics-session
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS session_id text;

-- Fix calculator_type constraint til at inkludere alle 5 beregnere
DO $$ BEGIN
  ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_calculator_type_check;
EXCEPTION WHEN others THEN NULL;
END $$;

ALTER TABLE leads
  ADD CONSTRAINT leads_calculator_type_check
  CHECK (calculator_type IN ('solceller', 'badevaerelse', 'maler', 'gulv', 'isolering'));

CREATE INDEX IF NOT EXISTS leads_source_ref_idx ON leads (source_ref);
CREATE INDEX IF NOT EXISTS leads_session_id_idx  ON leads (session_id);

-- ============================================================
-- PAGEVIEWS: first-party sidevisninger
-- ============================================================
CREATE TABLE IF NOT EXISTS pageviews (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL    DEFAULT now(),
  path         text        NOT NULL,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  session_id   text        NOT NULL,
  user_agent   text
);

ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert"      ON pageviews;
DROP POLICY IF EXISTS "service_role_all" ON pageviews;

-- Anon må INSERT (first-party tracking fra browser)
CREATE POLICY "anon_insert"
  ON pageviews FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_all"
  ON pageviews FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS pageviews_session_id_idx  ON pageviews (session_id);
CREATE INDEX IF NOT EXISTS pageviews_path_idx        ON pageviews (path);
CREATE INDEX IF NOT EXISTS pageviews_created_at_idx  ON pageviews (created_at DESC);

-- ============================================================
-- CALCULATOR_EVENTS: hvornår brugere interagerer med beregnerne
-- ============================================================
CREATE TABLE IF NOT EXISTS calculator_events (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL    DEFAULT now(),
  calculator_type text        NOT NULL    CHECK (calculator_type IN ('solceller','badevaerelse','maler','gulv','isolering')),
  event_type      text        NOT NULL    CHECK (event_type IN ('started','completed','abandoned')),
  session_id      text        NOT NULL,
  input_data      jsonb       NOT NULL    DEFAULT '{}'::jsonb,
  result_value    numeric
);

ALTER TABLE calculator_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert"      ON calculator_events;
DROP POLICY IF EXISTS "service_role_all" ON calculator_events;

CREATE POLICY "anon_insert"
  ON calculator_events FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_all"
  ON calculator_events FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS calc_events_session_id_idx       ON calculator_events (session_id);
CREATE INDEX IF NOT EXISTS calc_events_calculator_type_idx  ON calculator_events (calculator_type);
CREATE INDEX IF NOT EXISTS calc_events_event_type_idx       ON calculator_events (event_type);
CREATE INDEX IF NOT EXISTS calc_events_created_at_idx       ON calculator_events (created_at DESC);

-- ============================================================
-- LEAD_CONVERSION_FUNNEL: brugerrejse fra kalkulator til lead
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_conversion_funnel (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL    DEFAULT now(),
  session_id      text        NOT NULL,
  funnel_stage    text        NOT NULL    CHECK (funnel_stage IN ('calculator_started','calculator_completed','lead_submitted')),
  calculator_type text                    CHECK (calculator_type IN ('solceller','badevaerelse','maler','gulv','isolering')),
  lead_id         uuid        REFERENCES leads (id) ON DELETE SET NULL
);

ALTER TABLE lead_conversion_funnel ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert"      ON lead_conversion_funnel;
DROP POLICY IF EXISTS "service_role_all" ON lead_conversion_funnel;

-- Anon INSERT: browser indsætter started/completed events
CREATE POLICY "anon_insert"
  ON lead_conversion_funnel FOR INSERT TO anon
  WITH CHECK (lead_id IS NULL);  -- anon må aldrig sætte lead_id

CREATE POLICY "service_role_all"
  ON lead_conversion_funnel FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS funnel_session_id_idx  ON lead_conversion_funnel (session_id);
CREATE INDEX IF NOT EXISTS funnel_lead_id_idx     ON lead_conversion_funnel (lead_id);

-- ============================================================
-- MOTIVO_LEAD_LINKS: cross-tracking BoligKalkylen → Motivo ordre
-- Manuel kobling når et lead reelt bliver til en betalt ordre
-- ============================================================
CREATE TABLE IF NOT EXISTS motivo_lead_links (
  id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at             timestamptz NOT NULL    DEFAULT now(),
  lead_id                uuid        NOT NULL    REFERENCES leads (id) ON DELETE CASCADE,
  source_ref             uuid        NOT NULL,   -- kopieret fra leads.source_ref for hurtig lookup
  motivo_order_ref       text,                   -- Motivo ordre-ID, fx "MI-105"
  motivo_customer_email  text,
  order_value_dkk        numeric,
  linked_at              timestamptz             DEFAULT now(),
  linked_by              text                    -- navn/email på den der laver koblingen
);

ALTER TABLE motivo_lead_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON motivo_lead_links;

-- Kun service_role — interne data, ikke browser-accessible
CREATE POLICY "service_role_all"
  ON motivo_lead_links FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS motivo_links_lead_id_idx    ON motivo_lead_links (lead_id);
CREATE INDEX IF NOT EXISTS motivo_links_source_ref_idx ON motivo_lead_links (source_ref);

-- ============================================================
-- VERIFIKATIONSQUERY — kør efterfølgende for at bekræfte:
--
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
-- SELECT tablename, policyname, roles, cmd FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads' ORDER BY ordinal_position;
-- ============================================================
