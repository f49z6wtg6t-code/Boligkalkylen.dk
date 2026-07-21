"use client";

import { useState } from "react";
import Link from "next/link";
import CalculatorShell from "@/components/calculator-shell";
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";

const RELATED_ARTICLES = [
  { slug: "badevaerelse-renovering-pris-2026", title: "Pris på badeværelsesrenovering 2026" },
  { slug: "totalrenovering-badevaerelse-pris", title: "Hvad koster en totalrenovering?" },
  { slug: "badevaerelse-5-fejl-undgaa", title: "5 fejl du skal undgå ved badeværelse" },
];
import {
  calculateBadevaerelse,
  type BadevaerelseInputs,
} from "@/lib/calculators/badevaerelse";

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
  const active = value === current;
  return (
    <button
      onClick={() => onSelect(value)}
      className="flex flex-col rounded-xl py-3.5 px-4 text-left transition-all duration-150 w-full"
      style={{
        backgroundColor: active ? "rgba(58,107,42,0.12)" : "#FFFFFF",
        border: active ? "1px solid #3A6B2A" : "1px solid #B8B0A4",
        color: active ? "#3A6B2A" : "#6B6356",
      }}
    >
      <span
        className="text-sm font-medium"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
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

const STOERRELSE_OPTIONS: {
  value: BadevaerelseInputs["stoerrelse"];
  label: string;
  sub: string;
}[] = [
  { value: "lille", label: "< 5 kvm", sub: "Lille badeværelse" },
  { value: "mellem", label: "5–10 kvm", sub: "Standard" },
  { value: "stor", label: "> 10 kvm", sub: "Stort badeværelse" },
];

const OMFANG_OPTIONS: {
  value: BadevaerelseInputs["omfang"];
  label: string;
  sub: string;
}[] = [
  {
    value: "overfladisk",
    label: "Overfladisk",
    sub: "Fliser, inventar, maling",
  },
  {
    value: "totalrenovering",
    label: "Totalrenovering",
    sub: "Komplet renovering inkl. VVS",
  },
];

const MATERIALE_OPTIONS: {
  value: BadevaerelseInputs["materialer"];
  label: string;
  sub: string;
}[] = [
  { value: "standard", label: "Standard", sub: "Funktionelt og holdbart" },
  { value: "premium", label: "Premium", sub: "Høj kvalitet og design" },
  { value: "luksus", label: "Luksus", sub: "Topkvalitet og eksklusivt" },
];

export default function BadevaerelserPage() {
  const [inputs, setInputs] = useState<BadevaerelseInputs>({
    stoerrelse: "mellem",
    omfang: "totalrenovering",
    materialer: "standard",
    vvsFlytning: false,
  });

  const result = calculateBadevaerelse(inputs);

  const stoerrelseLabel =
    STOERRELSE_OPTIONS.find((o) => o.value === inputs.stoerrelse)?.label ?? "";
  const omfangLabel =
    OMFANG_OPTIONS.find((o) => o.value === inputs.omfang)?.label ?? "";
  const materialerLabel =
    MATERIALE_OPTIONS.find((o) => o.value === inputs.materialer)?.label ?? "";

  const inputData: Record<string, unknown> = {
    Størrelse: stoerrelseLabel,
    Omfang: omfangLabel,
    Materialer: materialerLabel,
    "VVS flytning": inputs.vvsFlytning ? "Ja" : "Nej",
    "Estimat (lav)": formatDKK(result.prisLav) + " kr",
    "Estimat (høj)": formatDKK(result.prisHoej) + " kr",
    "Varighed": `${result.uger} uger`,
  };

  return (
    <>
    <CalculatorShell
      title="Badeværelsesberegner"
      description="Vælg størrelse, omfang og materialer for at se et realistisk prisestimat."
      result={
        <>
          {/* Big price range */}
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #C8C0B4" }}
          >
            <div className="text-xs mb-2" style={{ color: "#6B6356" }}>
              Estimeret pris
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span
                className="text-4xl sm:text-5xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "#3A6B2A",
                }}
              >
                {formatDKK(result.prisLav)}
              </span>
              <span
                className="text-3xl font-light"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "#4A7A3A",
                }}
              >
                –
              </span>
              <span
                className="text-4xl sm:text-5xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "#3A6B2A",
                }}
              >
                {formatDKK(result.prisHoej)}
              </span>
              <span
                className="text-lg"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#2D5220" }}
              >
                kr
              </span>
            </div>

            <div
              className="mt-3 pt-3 flex justify-between text-sm"
              style={{ borderTop: "1px solid #D4CCC0", color: "#6B6356" }}
            >
              <span>
                Forventet varighed:{" "}
                <span
                  className="font-semibold tabular-nums"
                  style={{
                    color: "#1E1A14",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {result.uger} uger
                </span>
              </span>
              <span>
                Midpoint:{" "}
                <span
                  className="font-semibold tabular-nums"
                  style={{
                    color: "#1E1A14",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {formatDKK(result.midpoint)} kr
                </span>
              </span>
            </div>
          </div>

          {/* Summary card */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#F0EBE0", border: "1px solid #C8C0B4" }}
          >
            <div className="text-xs font-medium mb-3" style={{ color: "#6B6356" }}>
              Dine valg
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                ["Størrelse", stoerrelseLabel],
                ["Omfang", omfangLabel],
                ["Materialer", materialerLabel],
                ["VVS flytning", inputs.vvsFlytning ? "Ja" : "Nej"],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <span style={{ color: "#6B6356" }}>{k}</span>
                  <span
                    className="font-medium"
                    style={{ color: "#1E1A14" }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead form */}
          <LeadForm
            calculator_type="badevaerelse"
            beregnet_vaerdi={result.midpoint}
            input_data={inputData}
          />

          <p className="text-xs leading-relaxed" style={{ color: "#6B6356" }}>
            * Estimaterne er vejledende og baseret på gennemsnitlige markedspriser.
            Endelig pris afhænger af konkrete forhold, materialevalg og eventuelle
            uforudsete udgifter. Indhent tilbud fra flere håndværkere for et præcist prisestimat.
          </p>

          <FAQSection items={[
            { question: "Hvad koster et nyt badeværelse i 2026?", answer: "Prisen på en badeværelsesrenovering afhænger meget af størrelse og omfang. En overfladisk renovering (fliser, inventar, maling) koster typisk 80.000–100.000 kr., mens en totalrenovering inkl. VVS koster 150.000–300.000 kr. for et standard badeværelse på 5–10 kvm." },
            { question: "Hvad koster et badeværelse pr. kvm?", answer: "En totalrenovering koster typisk 20.000–25.000 kr. pr. kvm inkl. VVS, fliser og inventar. Premium-materialer kan øge prisen til 30.000+ kr. pr. kvm. Prisen pr. kvm falder relativt set ved større badeværelser." },
            { question: "Hvor lang tid tager en badeværelsesrenovering?", answer: "En overfladisk renovering tager typisk 1–2 uger. En totalrenovering inkl. VVS-arbejde tager 3–6 uger afhængigt af omfang, håndværkerkapacitet og levering af materialer." },
            { question: "Hvad er inkluderet i en totalrenovering af badeværelse?", answer: "En totalrenovering inkluderer typisk: nedrivning af eksisterende fliser og inventar, VVS-arbejde (rør, afløb, gulvvarme), nye fliser på gulv og vægge, nyt toilet, håndvask og brusekabine/badekar samt maler- og snedkerarbejde." },
            { question: "Kan jeg trække badeværelsesrenovering fra i skat?", answer: "Ja — arbejdslønnen til håndværkere kan delvist fratrækkes via håndværkerfradraget (BoligJobordningen). I 2026 kan du fratrække op til 8.600 kr. pr. person for grøn istandsættelse. Et par kan tilsammen opnå op til 17.200 kr. i fradrag." },
          ]} />
        </>
      }
    >
      {/* Input panel */}
      <div className="space-y-6">
        {/* Størrelse */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Størrelse
          </label>
          <div className="grid grid-cols-3 gap-2">
            {STOERRELSE_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                current={inputs.stoerrelse}
                label={opt.label}
                sub={opt.sub}
                onSelect={(v) => setInputs((i) => ({ ...i, stoerrelse: v }))}
              />
            ))}
          </div>
        </div>

        {/* Omfang */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Omfang
          </label>
          <div className="grid grid-cols-2 gap-2">
            {OMFANG_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                current={inputs.omfang}
                label={opt.label}
                sub={opt.sub}
                onSelect={(v) => setInputs((i) => ({ ...i, omfang: v }))}
              />
            ))}
          </div>
        </div>

        {/* Materialer */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Materialer
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MATERIALE_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                value={opt.value}
                current={inputs.materialer}
                label={opt.label}
                sub={opt.sub}
                onSelect={(v) => setInputs((i) => ({ ...i, materialer: v }))}
              />
            ))}
          </div>
        </div>

        {/* VVS flytning */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            VVS flytning
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { v: true, label: "Ja", sub: "+15.000–35.000 kr" },
                { v: false, label: "Nej", sub: "Ingen flytning" },
              ] as const
            ).map(({ v, label, sub }) => (
              <button
                key={String(v)}
                onClick={() => setInputs((i) => ({ ...i, vvsFlytning: v }))}
                className="flex flex-col rounded-xl py-3.5 px-4 text-left transition-all duration-150 w-full"
                style={{
                  backgroundColor:
                    inputs.vvsFlytning === v ? "rgba(58,107,42,0.12)" : "#FFFFFF",
                  border:
                    inputs.vvsFlytning === v
                      ? "1px solid #3A6B2A"
                      : "1px solid #B8B0A4",
                  color: inputs.vvsFlytning === v ? "#3A6B2A" : "#6B6356",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                </span>
                <span className="text-xs mt-0.5" style={{ color: "#6B6356" }}>
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CalculatorShell>

    {/* Læs mere */}
    <section className="px-4 sm:px-6 py-10" style={{ borderTop: "1px solid #D4CCC0" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold mb-4" style={{ color: "#6B6356" }}>
          Læs mere om badeværelsesrenovering
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
