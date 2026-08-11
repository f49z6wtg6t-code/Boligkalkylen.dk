import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

const VALID_TYPES = ["solceller", "badevaerelse", "maler", "gulv", "isolering"] as const;
const VALID_EVENTS = ["started", "completed", "abandoned"] as const;

// Modtager calculator-events (started/completed/abandoned) og skriver til:
// 1. calculator_events — detaljeret event log med input_data
// 2. lead_conversion_funnel — forenklet funnel-view til konverteringsanalyse
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calculator_type, event_type, session_id, input_data, result_value } =
      body as Record<string, unknown>;

    if (
      !VALID_TYPES.includes(calculator_type as (typeof VALID_TYPES)[number]) ||
      !VALID_EVENTS.includes(event_type as (typeof VALID_EVENTS)[number]) ||
      !session_id
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Indsæt i calculator_events
    await supabase.from("calculator_events").insert({
      calculator_type,
      event_type,
      session_id,
      input_data: (input_data as object) || {},
      result_value: result_value ?? null,
    });

    // Indsæt i lead_conversion_funnel (kun started + completed — abandoned er analytisk)
    if (event_type === "started" || event_type === "completed") {
      const stage =
        event_type === "started" ? "calculator_started" : "calculator_completed";
      await supabase.from("lead_conversion_funnel").insert({
        session_id,
        funnel_stage: stage,
        calculator_type,
        lead_id: null,
      });
    }
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ ok: true });
}
