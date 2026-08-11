"use client";

import { useState, useEffect, useRef } from "react";
import { getSessionId, trackCalculatorEvent, type CalculatorType } from "@/lib/analytics";

interface LeadFormProps {
  calculator_type: CalculatorType;
  beregnet_vaerdi: number;
  input_data: Record<string, unknown>;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("da-DK", {
    maximumFractionDigits: 0,
  }).format(n);
}

export default function LeadForm({
  calculator_type,
  beregnet_vaerdi,
  input_data,
}: LeadFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abandonedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState({
    navn: "",
    telefon: "",
    email: "",
    postnr: "",
    samtykke: false,
  });

  // Track calculator_started én gang ved mount
  useEffect(() => {
    trackCalculatorEvent(calculator_type, "started", input_data, beregnet_vaerdi);

    // Sæt abandoned-timer: 30 sek inaktivitet uden at åbne formularen
    abandonedTimer.current = setTimeout(() => {
      trackCalculatorEvent(calculator_type, "abandoned", input_data, beregnet_vaerdi);
    }, 30_000);

    return () => {
      if (abandonedTimer.current) clearTimeout(abandonedTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Annuller abandoned-timer hvis brugeren åbner formularen
  function handleOpenForm() {
    if (abandonedTimer.current) clearTimeout(abandonedTimer.current);
    trackCalculatorEvent(calculator_type, "completed", input_data, beregnet_vaerdi);
    setOpen(true);
  }

  const label =
    calculator_type === "solceller"
      ? `en estimeret besparelse på ${formatCurrency(beregnet_vaerdi)} kr/år`
      : calculator_type === "isolering"
      ? `et estimat på ${formatCurrency(beregnet_vaerdi)} kr med en varmebesparelse`
      : `et estimat på ${formatCurrency(beregnet_vaerdi)} kr`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.samtykke) {
      setError("Du skal acceptere, at håndværkerne må kontakte dig.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          calculator_type,
          beregnet_vaerdi,
          input_data,
          session_id: getSessionId(),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Ukendt fejl");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          backgroundColor: "#EDE8DC",
          border: "1px solid #D4CCC0",
        }}
      >
        <div className="text-3xl mb-3">✓</div>
        <h3
          className="text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-dm-sans)", color: "#4ADE80" }}
        >
          Tak — vi kontakter dig snart!
        </h3>
        <p className="text-sm" style={{ color: "#6B6356" }}>
          Du vil modtage tilbud fra 2-3 lokale håndværkere inden for 1-2 hverdage.
        </p>
      </div>
    );
  }

  const ALL_REVIEWS = [
    { stars: 5, quote: "Estimatet matchede tilbuddet næsten til punkt og prikke.", name: "Mette K." },
    { stars: 5, quote: "Tog fem minutter og vi vidste hvad vi gik ind til.", name: "Rasmus T." },
    { stars: 4, quote: "Meget bedre end at ringe rundt til håndværkere.", name: "Camilla F." },
    { stars: 5, quote: "Vi stod langt stærkere da vi mødte håndværkeren med et konkret estimat.", name: "Hanne B." },
    { stars: 4, quote: "Prøvede både standard og premium — god måde at se hvad ekstra koster.", name: "Michael D." },
    { stars: 5, quote: "Ingen spam, ingen salgsopkald. Bare et ærligt estimat.", name: "Lars M." },
    { stars: 5, quote: "Hurtig bekræftelse og professionelt svar. Imponerende.", name: "Anette W." },
    { stars: 4, quote: "Vi havde fået tre vidt forskellige tilbud. Beregneren satte det hele i perspektiv.", name: "Claus J." },
    { stars: 5, quote: "Brugte det som udgangspunkt da vi indhentede tilbud. Virker.", name: "Sofie M." },
    { stars: 4, quote: "Præcis nok til at vi kunne tage en beslutning uden at ringe rundt.", name: "Henrik N." },
    { stars: 5, quote: "Beregneren forklarede hvad der påvirker prisen. Lærerigt.", name: "Maria S." },
    { stars: 4, quote: "Giver et realistisk interval — ikke et kunstigt lavt tal for at lokke.", name: "Jens P." },
  ];

  const OFFSETS: Record<string, number> = {
    solceller: 0, badevaerelse: 3, maler: 6, gulv: 9, isolering: 1,
  };
  const offset = OFFSETS[calculator_type] ?? 0;
  const reviews = [
    ALL_REVIEWS[offset % ALL_REVIEWS.length],
    ALL_REVIEWS[(offset + 1) % ALL_REVIEWS.length],
    ALL_REVIEWS[(offset + 2) % ALL_REVIEWS.length],
  ];

  return (
    <>
    <div className="grid grid-cols-3 gap-2 mb-3">
      {reviews.map((r) => (
        <div key={r.name + r.quote} className="rounded-xl p-3" style={{ backgroundColor: "#F0EBE0", border: "1px solid #D4CCC0" }}>
          <div className="text-xs mb-1" style={{ color: "#3A6B2A" }}>{"★".repeat(r.stars)}</div>
          <p className="text-xs leading-snug mb-1" style={{ color: "#2D3A28" }}>{r.quote}</p>
          <p className="text-[10px]" style={{ color: "#9E9486" }}>{r.name}</p>
        </div>
      ))}
    </div>
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #D4CCC0", backgroundColor: "#EDE8DC" }}
    >
      <div className="p-5 sm:p-6">
        <p className="text-sm mb-4" style={{ color: "#6B6356" }}>
          Dine tal viser {label}. Vil du have et{" "}
          <strong style={{ color: "#1E1A14" }}>uforpligtende og gratis tilbud</strong>{" "}
          fra 2-3 lokale håndværkere, der matcher dit budget?
        </p>

        {!open ? (
          <>
            <button
              onClick={handleOpenForm}
              className="w-full rounded-xl py-3 px-6 font-semibold text-sm transition-all duration-150"
              style={{
                backgroundColor: "#2D5220",
                color: "#FFFFFF",
                fontFamily: "var(--font-dm-sans)",
                boxShadow: "0 4px 12px rgba(45,82,32,0.3)",
              }}
            >
              Ja, send mig et gratis tilbud
            </button>
            <p className="text-xs text-center mt-2" style={{ color: "#9E9486" }}>
              Gratis og 100% uforpligtende · Modtag tilbud i din indbakke · Vi deler ikke dine data
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: "#6B6356" }}>
                  Navn *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.navn}
                  onChange={(e) => setForm((f) => ({ ...f, navn: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B8B0A4",
                    color: "#1E1A14",
                  }}
                  placeholder="Dit fulde navn"
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: "#6B6356" }}>
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  value={form.telefon}
                  onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B8B0A4",
                    color: "#1E1A14",
                  }}
                  placeholder="12 34 56 78"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: "#6B6356" }}>
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B8B0A4",
                    color: "#1E1A14",
                  }}
                  placeholder="din@email.dk"
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: "#6B6356" }}>
                  Postnummer *
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={4}
                  value={form.postnr}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, postnr: e.target.value.replace(/\D/g, "") }))
                  }
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B8B0A4",
                    color: "#1E1A14",
                  }}
                  placeholder="2100"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setForm((f) => ({ ...f, samtykke: !f.samtykke }))}>
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={form.samtykke}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, samtykke: e.target.checked }))
                  }
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: form.samtykke ? "#3A6B2A" : "#FFFFFF",
                    border: form.samtykke ? "none" : "1px solid #B8B0A4",
                  }}
                >
                  {form.samtykke && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#F6F4EF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: "#6B6356" }}>
                Jeg accepterer, at 2-3 lokale håndværkere må kontakte mig med et uforpligtende tilbud
                baseret på mine beregninger.
              </span>
            </label>

            {error && (
              <p
                className="text-xs rounded-lg px-3 py-2"
                style={{
                  color: "#F87171",
                  backgroundColor: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 px-6 font-semibold text-sm transition-all duration-150 disabled:opacity-50"
              style={{
                backgroundColor: "#2D5220",
                color: "#FFFFFF",
                fontFamily: "var(--font-dm-sans)",
                boxShadow: "0 4px 12px rgba(45,82,32,0.3)",
              }}
            >
              {loading ? "Sender..." : "Send anmodning"}
            </button>
            <p className="text-xs text-center mt-2" style={{ color: "#9E9486" }}>
              Gratis og 100% uforpligtende · Modtag tilbud i din indbakke · Vi deler ikke dine data
            </p>
          </form>
        )}
      </div>
    </div>
    </>
  );
}
