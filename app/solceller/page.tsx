"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import CalculatorShell from "@/components/calculator-shell";
const SavingsChart = dynamic(() => import("@/components/savings-chart"), { ssr: false });
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";
import { calculateSolceller, type SolcellerResult } from "@/lib/calculators/solceller";

const RELATED_ARTICLES = [
  { slug: "solceller-pris-2026", title: "Hvad koster solceller i 2026?" },
  { slug: "solceller-tilbagebetalingstid", title: "Tilbagebetalingstid for solceller" },
  { slug: "solceller-elafgift-2026-regler", title: "Elafgift og solceller 2026 — regler" },
];

const ROOF_OPTIONS: { label: string; sub: string; factor: number }[] = [
  { label: "Syd-vendt", sub: "Optimal", factor: 1.0 },
  { label: "Øst / Vest", sub: "Middel", factor: 0.85 },
  { label: "Fladt / Nord", sub: "Reduceret", factor: 0.65 },
];

function formatDKK(n: number, decimals = 0): string {
  return new Intl.NumberFormat("da-DK", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n);
}

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
    >
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-xl font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs" style={{ color: "#6B6356" }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SolcellerPage() {
  const [kwh, setKwh] = useState(4000);
  const [roofFactor, setRoofFactor] = useState(1.0);
  const [postnr, setPostnr] = useState("");
  const [result, setResult] = useState<SolcellerResult>(() =>
    calculateSolceller(4000, 1.0)
  );
  const [animKey, setAnimKey] = useState(0);
  const prevSavings = useRef(result.annualSavings);

  const recalculate = useCallback(() => {
    const r = calculateSolceller(kwh, roofFactor);
    if (Math.round(r.annualSavings) !== Math.round(prevSavings.current)) {
      setAnimKey((k) => k + 1);
      prevSavings.current = r.annualSavings;
    }
    setResult(r);
  }, [kwh, roofFactor]);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  const inputData: Record<string, unknown> = {
    "Elforbrug (kWh/år)": kwh,
    "Tagorienterting": ROOF_OPTIONS.find((o) => o.factor === roofFactor)?.label ?? "",
    "Postnummer": postnr || "Ikke angivet",
    "Systemstørrelse (kWp)": result.systemSizeKwp.toFixed(1),
    "Installationsomkostning (kr)": formatDKK(result.installCost),
  };

  return (
    <>
    <CalculatorShell
      title="Solcelleberegner"
      description="Indtast dit elforbrug og tagforhold for at se din potentielle besparelse."
      result={
        <>
          {/* Big result */}
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
          >
            <div className="text-xs mb-2" style={{ color: "#6B6356" }}>
              Estimeret årlig besparelse
            </div>
            <div
              key={animKey}
              className="animate-pulse-scale"
              style={{ display: "inline-block" }}
            >
              <span
                className="text-5xl sm:text-6xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "#3A6B2A",
                }}
              >
                {formatDKK(Math.round(result.annualSavings))}
              </span>
              <span
                className="text-lg ml-2"
                style={{ color: "#2D5220", fontFamily: "var(--font-dm-sans)" }}
              >
                kr/år
              </span>
            </div>

            <div
              className="mt-3 pt-3 text-sm"
              style={{
                borderTop: "1px solid #D4CCC0",
                color: "#6B6356",
              }}
            >
              Tilbagebetaling på ca.{" "}
              <span
                className="font-semibold tabular-nums"
                style={{
                  color: "#1E1A14",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {result.paybackYears.toFixed(1)} år
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Systemstørrelse"
              value={result.systemSizeKwp.toFixed(1)}
              unit="kWp"
            />
            <StatCard
              label="CO₂-reduktion"
              value={result.co2Reduction.toFixed(2)}
              unit="ton/år"
            />
            <StatCard
              label="Besparelse 25 år"
              value={formatDKK(Math.round(result.savings25y / 1000)) + "k"}
              unit="kr"
            />
          </div>

          {/* Chart */}
          <SavingsChart yearlyData={result.yearlyData} installCost={result.installCost} />

          {/* Håndværkerfradrag */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(58,107,42,0.08)", border: "1px solid rgba(58,107,42,0.15)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#2D5220" strokeWidth="1.5" />
                  <path d="M7 5v3M7 9.5v.5" stroke="#2D5220" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
                  Husk håndværkerfradraget
                </p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "#6B6356" }}>
                  Arbejdsløn til installation af solceller kan være fradragsberettiget via det grønne
                  håndværkerfradrag (BoligJobordningen, ligningslovens § 8 V) — op til 8.600 kr. i fradrag
                  pr. person i 2025-niveau, gælder samlet for al grøn istandsættelse i indkomståret.
                  Et par kan tilsammen opnå op til det dobbelte. Fradraget dækker kun arbejdsløn inkl. moms,
                  ikke materialer, og kræver at installatøren er momsregistreret i Danmark.
                </p>
                <p className="text-[10px]" style={{ color: "#6B6356" }}>
                  Beløbsgrænsen reguleres årligt. Tjek aktuelle satser og betingelser på{" "}
                  <a
                    href="https://skat.dk"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#B0A898", textDecoration: "underline" }}
                  >
                    skat.dk
                  </a>{" "}
                  — kilde: Skattestyrelsen, ligningslovens § 8 V og bilag 1.
                </p>
              </div>
            </div>
          </div>

          {/* Lead form */}
          <LeadForm
            calculator_type="solceller"
            beregnet_vaerdi={Math.round(result.annualSavings)}
            input_data={inputData}
          />

          {/* Disclaimer */}
          <div
            className="rounded-xl p-4 text-xs leading-relaxed space-y-2"
            style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0", color: "#6B6356" }}
          >
            <p>
              <span style={{ color: "#1E1A14", fontWeight: 600 }}>Om beregningsmodellen:</span>{" "}
              Selvforbrugt solcellestrøm er fritaget for elafgift (elafgiftslovens § 2, stk. 1, litra c — permanent regel).
              Den almindelige elafgift på netkøbt strøm er midlertidigt sænket til 1 øre/kWh i 2026–2027 og forventes
              at stige igen fra 2028 — beregningen tager højde for dette.
            </p>
            <p>
              Estimat baseret på spotpris + nettariffer 1,55 kr/kWh, installationspris 9.500 kr/kWp,
              750 kWh/kWp/år solindstråling (syd-vendt DK) og 2% årlig prisstigning.
              Faktisk besparelse afhænger af tagforhold, installation og fremtidige markedspriser.
            </p>
          </div>

          <FAQSection items={[
            { question: "Hvad koster et solcelleanlæg i 2026?", answer: "Et typisk solcelleanlæg til et parcelhus koster mellem 45.000 og 80.000 kr. inkl. installation, afhængigt af systemstørrelse (kWp) og tagets beskaffenhed. Prisen pr. kWp ligger typisk på 9.000–11.000 kr." },
            { question: "Hvordan beregnes tilbagebetalingstiden på solceller?", answer: "Tilbagebetalingstiden beregnes ved at dividere installationsomkostningen med den årlige besparelse. Med et gennemsnitsforbrug på 4.000 kWh/år og en besparelse på ca. 4.700 kr./år er tilbagebetalingstiden typisk 7–10 år." },
            { question: "Hvor meget strøm producerer solceller i Danmark?", answer: "Et typisk anlæg i Danmark producerer ca. 750–900 kWh pr. kWp om året, afhængigt af tagorienteringen. Syd-vendt tag giver mest, fladt eller nordvendt tag reducerer udbyttet med 20–35%." },
            { question: "Kan jeg få tilskud eller fradrag til solceller?", answer: "Ja — arbejdslønnen til installation kan være fradragsberettiget via det grønne håndværkerfradrag (BoligJobordningen, § 8 V) op til 8.600 kr. pr. person i 2026. Derudover er selvforbrugt solcellestrøm fritaget for elafgift." },
            { question: "Hvor stor et anlæg har jeg brug for?", answer: "En tommelfingerregel er 1 kWp pr. 1.000 kWh i årligt elforbrug. Et husstand med 4.000 kWh/år har brug for et anlæg på ca. 4–5 kWp, svarende til ca. 10–12 solceller og et tagareal på 20–25 m²." },
          ]} />
        </>
      }
    >
      {/* Input panel */}
      <div className="space-y-6">
        {/* Stats band */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Selvforbrug solstrøm", value: "2,50 kr/kWh", source: "Afgiftsfritaget, jf. elafgiftsloven" },
            { label: "Tilbagebetalingstid", value: "7–9 år", source: "Solceller inkl. installation" },
            { label: "Installationspris", value: "9.500 kr/kWp", source: "DK-gennemsnit 2026" },
            { label: "Håndværkerfradrag", value: "Op til 8.600 kr.", source: "Pr. person, jf. ligningslovens § 8 V" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-4 py-4"
              style={{ background: "#F5F0E8", border: "1px solid #C8C0B4" }}
            >
              <div className="text-xs font-medium mb-2 leading-tight" style={{ color: "#3A6B2A" }}>
                {stat.label}
              </div>
              <div
                className="text-base font-bold mb-1 tabular-nums"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px]" style={{ color: "#6B6356" }}>
                {stat.source}
              </div>
            </div>
          ))}
        </div>

        {/* kWh slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label
              className="text-sm font-medium"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
            >
              Årligt elforbrug
            </label>
            <span
              className="text-lg font-semibold tabular-nums"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}
            >
              {formatDKK(kwh)} kWh
            </span>
          </div>
          <input
            type="range"
            min={1500}
            max={12000}
            step={100}
            value={kwh}
            onChange={(e) => setKwh(Number(e.target.value))}
            className="w-full accent-[#3A6B2A]"
            style={{ accentColor: "#3A6B2A" }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "#6B6356" }}>
            <span>1.500 kWh</span>
            <span>12.000 kWh</span>
          </div>
          <p className="text-xs mt-2" style={{ color: "#6B6356" }}>
            Gennemsnitlig husstand bruger ca. 3.500–5.000 kWh/år
          </p>
        </div>

        {/* Roof orientation */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Tagorientering
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ROOF_OPTIONS.map((opt) => (
              <button
                key={opt.factor}
                onClick={() => setRoofFactor(opt.factor)}
                className="flex flex-col items-center rounded-xl py-3 px-2 text-center transition-all duration-150"
                style={{
                  backgroundColor:
                    roofFactor === opt.factor ? "rgba(58,107,42,0.12)" : "#EDE8DC",
                  border:
                    roofFactor === opt.factor
                      ? "1px solid #3A6B2A"
                      : "1px solid #D4CCC0",
                  color: roofFactor === opt.factor ? "#3A6B2A" : "#6B6356",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {opt.label}
                </span>
                <span className="text-xs mt-0.5" style={{ color: "#6B6356" }}>
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Postnummer */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Postnummer{" "}
            <span className="font-normal text-xs" style={{ color: "#6B6356" }}>
              (valgfrit)
            </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={postnr}
            onChange={(e) => setPostnr(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #B8B0A4",
              color: "#1E1A14",
            }}
            placeholder="f.eks. 2100"
          />
        </div>

        {/* Summary */}
        <div
          className="rounded-xl p-4 text-sm"
          style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
        >
          <div className="text-xs font-medium mb-2" style={{ color: "#6B6356" }}>
            Installationsdetaljer
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span style={{ color: "#6B6356" }}>Systemstørrelse</span>
              <span
                className="tabular-nums"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
              >
                {result.systemSizeKwp.toFixed(1)} kWp
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6B6356" }}>Estimeret pris</span>
              <span
                className="tabular-nums"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
              >
                {formatDKK(result.installCost)} kr
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
    {/* Læs mere */}
    <section className="px-4 sm:px-6 py-10" style={{ borderTop: "1px solid #D4CCC0" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold mb-4" style={{ color: "#6B6356" }}>
          Læs mere om solceller
        </p>
        <div className="flex flex-wrap gap-3">
          {RELATED_ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/artikler/${a.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150"
              style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0", color: "#3A6B2A" }}
            >
              {a.title}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
