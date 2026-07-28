-- 002_rls_policies.sql
-- Aktiverer RLS og sætter korrekte policies på alle tabeller.
-- Idempotent — tryg at køre selv om 001_initial.sql allerede er kørt.

-- ============================================================
-- leads
-- ============================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access" ON leads;
DROP POLICY IF EXISTS "Anon insert"               ON leads;
DROP POLICY IF EXISTS "anon_insert"               ON leads;
DROP POLICY IF EXISTS "service_role_all"          ON leads;

-- Kun service_role har adgang. API-ruten (/api/leads) kører server-side
-- med SUPABASE_SERVICE_ROLE_KEY — browseren når aldrig Supabase direkte.
CREATE POLICY "service_role_all"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- fagfolk
-- ============================================================
ALTER TABLE fagfolk ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access" ON fagfolk;
DROP POLICY IF EXISTS "service_role_all"         ON fagfolk;

CREATE POLICY "service_role_all"
  ON fagfolk
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- lead_salg
-- ============================================================
ALTER TABLE lead_salg ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access" ON lead_salg;
DROP POLICY IF EXISTS "service_role_all"         ON lead_salg;

CREATE POLICY "service_role_all"
  ON lead_salg
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Verifikation — kør dette efterfølgende for at bekræfte:
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';
--
-- SELECT tablename, policyname, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
-- ============================================================
