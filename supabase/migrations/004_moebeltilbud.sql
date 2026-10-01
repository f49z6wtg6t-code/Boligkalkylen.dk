-- Migration 004: Tilføj vil_have_moebeltilbud til leads-tabellen
-- Kør i Supabase SQL Editor — KØR IKKE UDEN GODKENDELSE

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS vil_have_moebeltilbud boolean DEFAULT false NOT NULL;

COMMENT ON COLUMN leads.vil_have_moebeltilbud IS
  'Bruger har markeret at de ønsker tilbud på bademøbel med montering (badeværelsesberegner)';
