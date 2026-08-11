import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// Modtager pageview-events fra AnalyticsProvider (browser) og gemmer i Supabase.
// Returnerer altid 200 — analytics-fejl må aldrig påvirke brugeroplevelsen.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, utm_source, utm_medium, utm_campaign, session_id, user_agent } =
      body as Record<string, string | null>;

    if (!path || !session_id) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    await supabase.from("pageviews").insert({
      path,
      referrer: referrer || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      session_id,
      user_agent: user_agent || null,
    });
  } catch {
    // Silently swallow — analytics er non-fatal
  }

  return NextResponse.json({ ok: true });
}
