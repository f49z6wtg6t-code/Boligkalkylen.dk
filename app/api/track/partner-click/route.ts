import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// Tracker partner-produkt-klik i calculator_events med event_type = "partner_product_click".
// Kræver en migration der udvider calculator_events.event_type CHECK-constraint med denne værdi.
// Indtil da logger vi udelukkende — Supabase insert er fire-and-forget.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_slug, calculator_type, materialer, session_id } =
      body as Record<string, unknown>;

    const VALID_SLUGS = ["esther-med-sprosse", "margrethe", "esther-uden-greb"];
    if (
      !session_id ||
      typeof session_id !== "string" ||
      session_id.length > 64 ||
      (product_slug && !VALID_SLUGS.includes(product_slug as string))
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    await supabase.from("calculator_events").insert({
      calculator_type: calculator_type ?? "badevaerelse",
      event_type: "partner_product_click",
      session_id,
      input_data: { product_slug, materialer },
      result_value: null,
    });
  } catch {
    // Non-fatal — analytics fejler aldrig kritisk
  }

  return NextResponse.json({ ok: true });
}
