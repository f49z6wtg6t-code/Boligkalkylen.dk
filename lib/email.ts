import { Resend } from "resend";

export interface LeadData {
  id?: string;
  navn: string;
  telefon: string;
  email: string;
  postnr: string;
  calculator_type: "solceller" | "badevaerelse";
  beregnet_vaerdi: number;
  input_data: Record<string, unknown>;
  created_at?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(n);
}

function buildHtmlEmail(lead: LeadData): string {
  const calcLabel =
    lead.calculator_type === "solceller" ? "Solceller" : "Badeværelse";

  const inputRows = Object.entries(lead.input_data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#92A0AC;border-bottom:1px solid #2A3540;">${k}</td><td style="padding:6px 12px;color:#EDF2F5;border-bottom:1px solid #2A3540;">${v}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#0D1217;font-family:Inter,Arial,sans-serif;color:#EDF2F5;margin:0;padding:0;">
  <div style="max-width:600px;margin:40px auto;background:#161D24;border:1px solid #2A3540;border-radius:12px;overflow:hidden;">
    <div style="background:#1D262F;padding:24px 32px;border-bottom:1px solid #2A3540;">
      <div style="color:#C9F031;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Nyt lead</div>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#EDF2F5;">BoligKalkylen — ${calcLabel}</h1>
    </div>

    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 12px;color:#92A0AC;border-bottom:1px solid #2A3540;width:140px;">Navn</td><td style="padding:6px 12px;color:#EDF2F5;border-bottom:1px solid #2A3540;">${lead.navn}</td></tr>
        <tr><td style="padding:6px 12px;color:#92A0AC;border-bottom:1px solid #2A3540;">Telefon</td><td style="padding:6px 12px;color:#EDF2F5;border-bottom:1px solid #2A3540;"><a href="tel:${lead.telefon}" style="color:#C9F031;">${lead.telefon}</a></td></tr>
        <tr><td style="padding:6px 12px;color:#92A0AC;border-bottom:1px solid #2A3540;">E-mail</td><td style="padding:6px 12px;color:#EDF2F5;border-bottom:1px solid #2A3540;"><a href="mailto:${lead.email}" style="color:#C9F031;">${lead.email}</a></td></tr>
        <tr><td style="padding:6px 12px;color:#92A0AC;border-bottom:1px solid #2A3540;">Postnummer</td><td style="padding:6px 12px;color:#EDF2F5;border-bottom:1px solid #2A3540;">${lead.postnr}</td></tr>
      </table>

      <div style="background:#1D262F;border:1px solid #2A3540;border-radius:8px;padding:16px 20px;margin-bottom:24px;text-align:center;">
        <div style="color:#5C6B78;font-size:12px;margin-bottom:4px;">Beregnet estimat</div>
        <div style="color:#C9F031;font-size:28px;font-weight:700;font-family:monospace;">${formatCurrency(lead.beregnet_vaerdi)}</div>
      </div>

      <h2 style="font-size:14px;font-weight:600;color:#92A0AC;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Beregner-input</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${inputRows}
      </table>

      ${
        lead.created_at
          ? `<div style="margin-top:24px;color:#5C6B78;font-size:12px;">Modtaget: ${new Date(lead.created_at).toLocaleString("da-DK")}</div>`
          : ""
      }
    </div>
  </div>
</body>
</html>`;
}

export async function sendLeadNotification(lead: LeadData): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? "aa@motivobyg.com";
  const calcLabel =
    lead.calculator_type === "solceller" ? "Solceller" : "Badeværelse";

  await resend.emails.send({
    from:
      process.env.RESEND_FROM_INTERNAL ??
      "BoligKalkylen Intern <noreply@boligkalkylen.dk>",
    to,
    subject: `Nyt lead — ${calcLabel} — ${lead.navn} (${lead.postnr})`,
    html: buildHtmlEmail(lead),
  });
}

function buildCustomerConfirmationEmail(lead: LeadData): string {
  const isSolceller = lead.calculator_type === "solceller";
  const calcLabel = isSolceller ? "Solcelle" : "Badeværelse";
  const estimatLabel = isSolceller
    ? `Din beregnede årlige besparelse: <strong>${formatCurrency(lead.beregnet_vaerdi)}</strong>`
    : `Dit estimerede prisinterval: <strong>ca. ${formatCurrency(lead.beregnet_vaerdi)}</strong>`;

  return `<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#f4f4f4;font-family:Inter,Arial,sans-serif;color:#1a1a1a;margin:0;padding:0;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e0e0e0;">
    <div style="padding:32px 36px 24px;">
      <p style="margin:0 0 4px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.08em;">BoligKalkylen.dk</p>
      <h1 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#1a1a1a;">Tak for din henvendelse, ${lead.navn.split(" ")[0]}</h1>

      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">
        Vi har modtaget din ${calcLabel.toLowerCase()}-beregning og vil vende tilbage med et uforpligtende tilbud inden for <strong>24 timer</strong>.
      </p>

      <div style="background:#f9f9f9;border-left:3px solid #C9F031;border-radius:4px;padding:14px 18px;margin:24px 0;font-size:14px;color:#333;">
        ${estimatLabel}
      </div>

      <p style="margin:0;font-size:14px;line-height:1.6;color:#555;">
        Har du spørgsmål i mellemtiden, er du velkommen til at svare på denne mail.
      </p>
    </div>

    <div style="padding:16px 36px;border-top:1px solid #e8e8e8;font-size:12px;color:#999;line-height:1.5;">
      BoligKalkylen.dk · Du modtager denne mail fordi du indsendte en beregning på boligkalkylen.dk.
    </div>
  </div>
</body>
</html>`;
}

export async function sendCustomerConfirmation(lead: LeadData): Promise<void> {
  const calcLabel = lead.calculator_type === "solceller" ? "Solcelle" : "Badeværelse";

  await resend.emails.send({
    from:
      process.env.RESEND_FROM_NOREPLY ??
      "BoligKalkylen <noreply@boligkalkylen.dk>",
    to: lead.email,
    subject: `Tak for din henvendelse — ${calcLabel}-beregning modtaget`,
    html: buildCustomerConfirmationEmail(lead),
  });
}
