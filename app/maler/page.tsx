"use client";

import { useState } from "react";
import Link from "next/link";
import CalculatorShell from "@/components/calculator-shell";

const RELATED_ARTICLES = [
  { slug: "diy-badevaerelse-hvad-maa-du-selv", title: "Hvad må du selv lave — og hvad kræver fagmand?" },
  { slug: "badevaerelse-5-fejl-undgaa", title: "5 fejl du skal undgå ved renovering" },
  { slug: "badevaerelse-oenske-vs-budget", title: "Sådan prioriterer du når ønskerne er større end budgettet" },
];
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";
import { calculateMaler, type MalerOmfang, type MalerTilstand } from "@/lib/calculators/maler";

function formatDKK(n: number): string {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

function OptionButton<T extends string>({
  value,
  current,
  label,
  sub,
  onSelect,
}: {
  value: T;
  current: T;
  label: string;
  sub?: string;
  onSelect: (v: T) => void;
}) {
  const selected = value === current;
  return (
    <button
      onClick={() => onSelect(value)}
      className="flex flex-col rounded-xl py-3 px-3 text-left transition-all duration-150 w-full"
      style={{
        backgroundColor: selected ? "rgba(58,107,42,0.12)" : "#FFFFFF",
        border: selected ? "1px solid #3A6B2A" : "1px solid #B8B0A4",
        color: selected ? "#3A6B2A" : "#6B6356",
      }}
    >
      <span className="text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
        {label}
      </span>
      {sub && (
        <span className="text-xs mt-0.5" style={{ color: "#6B6356" }}>
          {sub}
        </span>
      )}
    </button>
  );
}

export default function MalerPage() {
  const [areal, setAreal] = useState(80);
  const [omfang, setOmfang] = useState<MalerOmfang>("vaegge_loft");
  const [tilstand, setTilstand] = useState<MalerTilstand>("god");

  const result = calculateMaler(areal, omfang, tilstand);

  const omfangLabels: Record<MalerOmfang, string> = {
    vaegge_loft: "Vægge og loft",
    vaegge_loft_traevark: "Vægge og loft + træværk",
    fuld_renovering: "Fuld renovering inkl. spartling",
  };

  const tilstandLabels: Record<MalerTilstand, string> = {
    god: "God stand",
    middel: "Middel stand",
    daarlig: "Dårlig stand",
  };

  const inputData: Record<string, unknown> = {
    "Boligareal (m²)": areal,
    Omfang: omfangLabels[omfang],
    "Overfladernes tilstand": tilstandLabels[tilstand],
    "Estimeret pris (kr)": `${formatDKK(result.minPris)} – ${formatDKK(result.maxPris)}`,
  };

  return (
    <>
    <CalculatorShell
      title="Malerberegner"
      description="Beregn prisen på indvendig maling af din bolig — baseret på areal, omfang og overfladernes tilstand."
      result={
        <>
          {/* Result card */}
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#6B6356" }}>
              Estimeret pris
            </p>
            <p
              className="text-3xl sm:text-4xl font-bold tabular-nums mb-1"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}
            >
              {formatDKK(result.minPris)} – {formatDKK(result.maxPris)} kr.
            </p>
            <p className="text-sm mb-4" style={{ color: "#6B6356" }}>
              Estimeret midtpris: <strong style={{ color: "#1E1A14" }}>{formatDKK(result.midpoint)} kr.</strong>
            </p>
            <div
              className="rounded-xl p-4 text-sm"
              style={{ backgroundColor: "#F5F0E8", border: "1px solid #D4CCC0" }}
            >
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Forventet varighed</span>
                  <span className="tabular-nums font-medium" style={{ color: "#1E1A14" }}>
                    {result.dage}–{result.dage + 1} dage
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Omfang</span>
                  <span style={{ color: "#1E1A14" }}>{omfangLabels[omfang]}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Tilstand</span>
                  <span style={{ color: "#1E1A14" }}>{tilstandLabels[tilstand]}</span>
                </div>
              </div>
            </div>

            {/* Håndværkerfradrag note */}
            <div
              className="mt-4 rounded-xl p-3 text-xs"
              style={{ backgroundColor: "rgba(201,240,49,0.08)", border: "1px solid rgba(201,240,49,0.2)", color: "#5A6B3A" }}
            >
              <strong>Bemærk:</strong> Indvendig maling er ikke omfattet af håndværkerfradraget. Udvendig maling er dækket.
            </div>
          </div>

          <LeadForm
            calculator_type="maler"
            beregnet_vaerdi={result.midpoint}
            input_data={inputData}
          />

          <FAQSection items={[
            { question: "Hvad koster det at male en lejlighed i 2026?", answer: "En typisk 3-værelses lejlighed på 80 m² koster 15.000–35.000 kr. inkl. moms at male indvendigt med vægge og lofter. Prisen afhænger af overfladernes tilstand og om der er behov for spartling." },
            { question: "Hvad koster en maler pr. m² i 2026?", answer: "En maler koster 75–160 kr. pr. m² vægflade for standard indvendig maling inkl. materialer. Kræver gulvet spartling eller fuld klargøring, stiger prisen til 150–520 kr. pr. m². Timeprisen er 400–650 kr. inkl. moms." },
            { question: "Hvor lang tid tager det at male en bolig?", answer: "En maler arbejder typisk 40–60 m² boligareal pr. dag. En lejlighed på 80 m² tager typisk 2–3 dage. Kræver der fuld spartling og klargøring, kan det tage op til 5–7 dage." },
          ]} />
        </>
      }
    >
      {/* Input panel */}
      <div className="space-y-6">
        {/* Areal slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="block text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
              Boligareal (m²)
            </label>
            <span className="text-xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
              {areal} m²
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={300}
            step={5}
            value={areal}
            onChange={(e) => setAreal(Number(e.target.value))}
            className="w-full accent-green-700"
            style={{ accentColor: "#3A6B2A" }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: "#9E9486" }}>20 m²</span>
            <span className="text-xs" style={{ color: "#9E9486" }}>300 m²</span>
          </div>
          <p className="text-xs mt-1" style={{ color: "#6B6356" }}>
            Boligens samlede gulvareal, ikke vægflade
          </p>
        </div>

        {/* Omfang */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
            Omfang
          </label>
          <div className="flex flex-col gap-2">
            <OptionButton value="vaegge_loft" current={omfang} label="Vægge og loft" onSelect={setOmfang} />
            <OptionButton value="vaegge_loft_traevark" current={omfang} label="Vægge og loft + træværk" onSelect={setOmfang} />
            <OptionButton value="fuld_renovering" current={omfang} label="Fuld renovering inkl. spartling" onSelect={setOmfang} />
          </div>
        </div>

        {/* Tilstand */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
            Overfladernes tilstand
          </label>
          <div className="grid grid-cols-3 gap-2">
            <OptionButton value="god" current={tilstand} label="God stand" sub="2 lag maling" onSelect={setTilstand} />
            <OptionButton value="middel" current={tilstand} label="Middel stand" sub="Spartling + maling" onSelect={setTilstand} />
            <OptionButton value="daarlig" current={tilstand} label="Dårlig stand" sub="Fuld klargøring + spartling" onSelect={setTilstand} />
          </div>
        </div>
      </div>
    </CalculatorShell>

    {/* Læs mere */}
    <section className="px-4 sm:px-6 py-10" style={{ borderTop: "1px solid #D4CCC0" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold mb-4" style={{ color: "#6B6356" }}>
          Læs mere om renovering
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
