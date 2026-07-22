"use client";

import { useState } from "react";
import Link from "next/link";
import CalculatorShell from "@/components/calculator-shell";

const RELATED_ARTICLES = [
  { slug: "diy-badevaerelse-hvad-maa-du-selv", title: "Hvad må du selv lave — og hvad kræver fagmand?" },
  { slug: "badevaerelse-alder-hus-hvad-koester", title: "Ekstraomkostningerne i ældre huse" },
  { slug: "badevaerelse-5-fejl-undgaa", title: "5 fejl du skal undgå" },
];
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";
import { calculateGulv, type GulvTilstand, type GulvEfterbehandling } from "@/lib/calculators/gulv";

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

export default function GulvPage() {
  const [areal, setAreal] = useState(50);
  const [tilstand, setTilstand] = useState<GulvTilstand>("god");
  const [efterbehandling, setEfterbehandling] = useState<GulvEfterbehandling>("lakering");

  const result = calculateGulv(areal, tilstand, efterbehandling);

  const tilstandLabels: Record<GulvTilstand, string> = {
    god: "God stand",
    middel: "Middel stand",
    daarlig: "Dårlig stand",
  };

  const efterbehandlingLabels: Record<GulvEfterbehandling, string> = {
    lakering: "Lakering (3 lag)",
    oliering: "Oliebehandling",
    saebe: "Sæbebehandling (lud + sæbe)",
  };

  const inputData: Record<string, unknown> = {
    "Gulvareal (m²)": areal,
    "Gulvets tilstand": tilstandLabels[tilstand],
    Efterbehandling: efterbehandlingLabels[efterbehandling],
    "Estimeret pris (kr)": `${formatDKK(result.minPris)} – ${formatDKK(result.maxPris)}`,
  };

  return (
    <>
    <CalculatorShell
      title="Gulvafslibningsberegner"
      description="Beregn prisen på afslibning og efterbehandling af dit trægulv — baseret på areal, stand og valg af overfladebehandling."
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
                  <span style={{ color: "#6B6356" }}>Gulvareal</span>
                  <span className="tabular-nums font-medium" style={{ color: "#1E1A14" }}>{areal} m²</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Tilstand</span>
                  <span style={{ color: "#1E1A14" }}>{tilstandLabels[tilstand]}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Efterbehandling</span>
                  <span style={{ color: "#1E1A14" }}>{efterbehandlingLabels[efterbehandling]}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Forventet holdbarhed</span>
                  <span style={{ color: "#1E1A14" }}>{result.holdbarhed}</span>
                </div>
              </div>
            </div>
          </div>

          <LeadForm
            calculator_type="gulv"
            beregnet_vaerdi={result.midpoint}
            input_data={inputData}
          />

          <FAQSection items={[
            { question: "Hvad koster gulvafslibning og lakering i 2026?", answer: "Gulvafslibning med 3 lag lakering koster typisk 135–200 kr. pr. m² inkl. moms, arbejde og materialer. For 50 m² gulv svarer det til ca. 7.000–10.000 kr. Prisen afhænger af gulvets tilstand og antallet af laklag." },
            { question: "Hvad er forskellen på lakering og oliebehandling af gulv?", answer: "Lakering giver en hård, slidsikkert overflade der holder 10–15 år uden vedligeholdelse. Oliebehandling giver et mere naturligt udtryk men kræver løbende vedligeholdelse med olie hvert 1–2 år. Lakering er typisk 10–20% dyrere." },
            { question: "Kan man spare penge ved at slibe gulvet selv?", answer: "Ja — udlejning af gulvslibemaskine koster 600–900 kr./dag. Men et dårligt udført amatørjob kan skade gulvet permanent. Anbefales kun på mindre arealer og hvis du har erfaring med træbehandling." },
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
              Gulvareal (m²)
            </label>
            <span className="text-xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
              {areal} m²
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={200}
            step={5}
            value={areal}
            onChange={(e) => setAreal(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "#3A6B2A" }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: "#9E9486" }}>10 m²</span>
            <span className="text-xs" style={{ color: "#9E9486" }}>200 m²</span>
          </div>
        </div>

        {/* Tilstand */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
            Gulvets tilstand
          </label>
          <div className="flex flex-col gap-2">
            <OptionButton value="god" current={tilstand} label="God stand" sub="Let slibning, overfladiske ridser" onSelect={setTilstand} />
            <OptionButton value="middel" current={tilstand} label="Middel stand" sub="Tydelige ridser og slidspor" onSelect={setTilstand} />
            <OptionButton value="daarlig" current={tilstand} label="Dårlig stand" sub="Dybe hakker, gammel lak/fernis" onSelect={setTilstand} />
          </div>
        </div>

        {/* Efterbehandling */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
            Efterbehandling
          </label>
          <div className="flex flex-col gap-2">
            <OptionButton value="lakering" current={efterbehandling} label="Lakering (3 lag)" sub="10–15 års holdbarhed" onSelect={setEfterbehandling} />
            <OptionButton value="oliering" current={efterbehandling} label="Oliebehandling" sub="Naturligt udtryk, kræver vedligeholdelse" onSelect={setEfterbehandling} />
            <OptionButton value="saebe" current={efterbehandling} label="Sæbebehandling (lud + sæbe)" sub="Traditionelt, løbende vedligeholdelse" onSelect={setEfterbehandling} />
          </div>
        </div>
      </div>
    </CalculatorShell>

    {/* Læs mere */}
    <section className="px-4 sm:px-6 py-10" style={{ borderTop: "1px solid #D4CCC0" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold mb-4" style={{ color: "#6B6356" }}>
          Læs mere om gulvrenovering
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
