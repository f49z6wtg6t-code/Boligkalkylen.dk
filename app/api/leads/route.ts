import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { sendLeadNotification, sendCustomerConfirmation, type LeadData } from "@/lib/email";

const leadSchema = z.object({
  navn: z.string().min(2, "Navn er påkrævet"),
  telefon: z
    .string()
    .min(8, "Telefonnummer er påkrævet")
    .regex(/^[0-9+\s\-()]+$/, "Ugyldigt telefonnummer"),
  email: z.string().email("Ugyldig e-mail"),
  postnr: z
    .string()
    .length(4, "Postnummer skal være 4 cifre")
    .regex(/^\d{4}$/, "Ugyldigt postnummer"),
  calculator_type: z.enum(["solceller", "badevaerelse", "maler", "gulv", "isolering", "klinker"]),
  beregnet_vaerdi: z.number().positive(),
  input_data: z.record(z.string(), z.unknown()),
  samtykke: z.literal(true, { error: "Du skal acceptere vilkårene" }),
  session_id: z.string().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: "Valideringsfejl", errors }, { status: 400 });
  }

  const { samtykke: _samtykke, session_id, ...leadData } = parsed.data;

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("leads")
    .insert({
      ...leadData,
      input_data: leadData.input_data,
      kilde: "boligkalkylen",
      session_id: session_id ?? null,
    })
    .select("id, created_at, source_ref")
    .single();

  if (error) {
    console.error("Supabase insert error:", {
      message: error.message,
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });
    return NextResponse.json({ error: "Databasefejl", details: error.message }, { status: 500 });
  }

  // Kobl lead til conversion funnel hvis vi har en session_id
  if (session_id && data?.id) {
    await supabase.from("lead_conversion_funnel").insert({
      session_id,
      funnel_stage: "lead_submitted",
      calculator_type: leadData.calculator_type,
      lead_id: data.id,
    });
  }

  const fullLead: LeadData = {
    ...leadData,
    id: data?.id,
    created_at: data?.created_at,
    source_ref: data?.source_ref,
  };

  const emailResults = await Promise.allSettled([
    sendLeadNotification(fullLead),
    sendCustomerConfirmation(fullLead),
  ]);

  emailResults.forEach((result, i) => {
    if (result.status === "rejected") {
      const label = i === 0 ? "Intern notifikation" : "Kundekvittering";
      console.error(`Email fejl (${label}, non-fatal):`, result.reason);
    }
  });

  return NextResponse.json({ success: true, id: data?.id });
}
