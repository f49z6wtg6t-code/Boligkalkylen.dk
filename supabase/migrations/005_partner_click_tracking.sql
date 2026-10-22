-- Migration 005: Udvid calculator_events.event_type med partner_product_click
-- Nødvendig for at /api/track/partner-click kan gemme klik-events i databasen.

ALTER TABLE calculator_events
  DROP CONSTRAINT IF EXISTS calculator_events_event_type_check;

ALTER TABLE calculator_events
  ADD CONSTRAINT calculator_events_event_type_check
    CHECK (event_type IN ('started', 'completed', 'abandoned', 'partner_product_click'));
