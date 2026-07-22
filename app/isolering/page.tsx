"use client";

import { useState } from "react";
import CalculatorShell from "@/components/calculator-shell";
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";
import { calculateIsolering, type IsoleringsType, type LoftTykkelse } from "@/lib/calculators/isolering";

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

export default function IsoleringsPage() {
  const [areal, setAreal] = useState(100);
  const [type, setType] = useState<IsoleringsType>("loftisolering");
  const [tykkelse, setTykkelse] = useState<LoftTykkelse>("100");

  const result = calculateIsolering(areal, type, tykkelse);

  const typeLabels: Record<IsoleringsType, string> = {
    loftisolering: "Loftisolering",
    hulmur: "Hulmursisolering",
    ydervaeg: "Udvendig ydervægsisolering",
  };

  const inputData: Record<string, unknown> = {
    "Areal (m²)": areal,
    Isoleringstype: typeLabels[type],
    ...(type === "loftisolering" ? { "Isoleringstykkelse": `${tykkelse} mm` } : {}),
    "Estimeret pris (kr)": `${formatDKK(result.minPris)} – ${formatDKK(result.maxPris)}`,
    "Estimeret besparelse/år (kr)": formatDKK(result.annualSavings),
  };

  return (
    <CalculatorShell
      title="Isoleringsberegner"
      description="Beregn prisen på efterisolering og din estimerede årlige varmebesparelse — baseret på danske 2026-priser."
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
                  <span style={{ color: "#6B6356" }}>Årlig varmebesparelse</span>
                  <span className="tabular-nums font-bold" style={{ color: "#3A6B2A" }}>
                    ca. {formatDKK(result.annualSavings)} kr./år
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Tilbagebetalingstid</span>
                  <span className="tabular-nums font-medium" style={{ color: "#1E1A14" }}>
                    ca. {result.paybackYears} år
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6356" }}>Isoleringstype</span>
                  <span style={{ color: "#1E1A14" }}>{typeLabels[type]}</span>
                </div>
                {type === "loftisolering" && (
                  <div className="flex justify-between">
                    <span style={{ color: "#6B6356" }}>Tykkelse</span>
                    <span style={{ color: "#1E1A14" }}>{tykkelse} mm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tilskud note */}
            <div
              className="mt-4 rounded-xl p-3 text-xs"
              style={{ backgroundColor: "rgba(201,240,49,0.08)", border: "1px solid rgba(201,240,49,0.2)", color: "#5A6B3A" }}
            >
              <strong>Tilskud:</strong> Efterisolering kan give ret til tilskud fra Energistyrelsen og er i visse tilfælde omfattet af håndværkerfradraget. Tjek betingelserne på{" "}
              <a href="https://sparenergi.dk" target="_blank" rel="noopener noreferrer" style={{ color: "#3A6B2A", textDecoration: "underline" }}>
                sparenergi.dk
              </a>.
            </div>
          </div>

          <LeadForm
            calculator_type="isolering"
            beregnet_vaerdi={result.midpoint}
            input_data={inputData}
          />

          <FAQSection items={[
            { question: "Hvad koster efterisolering af loft i 2026?", answer: "Efterisolering af loft koster typisk 90–220 kr. pr. m² inkl. moms ved professionel udførelse. For et typisk parcelhus med 100 m² loft svarer det til 9.000–22.000 kr. Prisen afhænger af isoleringstykkelse og adgangsforhold." },
            { question: "Hvad koster hulmursisolering pr. m²?", answer: "Hulmursisolering koster typisk 130–180 kr. pr. m² inkl. moms, arbejde og materialer. For et parcelhus med 100 m² ydervæg koster det ca. 13.000–18.000 kr. og kan give en varmebesparelse på op til 5.000–7.000 kr. om året." },
            { question: "Kan det betale sig at efterisolere loftet?", answer: "Ja — loftisolering er typisk den hurtigst tilbagebetalende isoleringstype. Med en investering på 10.000–20.000 kr. og en besparelse på 2.500–4.000 kr./år tilbagebetaler projektet sig på 4–7 år. Herefter er varmebesparelsen ren gevinst." },
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
              Areal (m²)
            </label>
            <span className="text-xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
              {areal} m²
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={250}
            step={10}
            value={areal}
            onChange={(e) => setAreal(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "#3A6B2A" }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: "#9E9486" }}>20 m²</span>
            <span className="text-xs" style={{ color: "#9E9486" }}>250 m²</span>
          </div>
        </div>

        {/* Isoleringstype */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
            Isoleringstype
          </label>
          <div className="flex flex-col gap-2">
            <OptionButton value="loftisolering" current={type} label="Loftisolering" sub="Efterisolering af loft/tagrum" onSelect={setType} />
            <OptionButton value="hulmur" current={type} label="Hulmursisolering" sub="Indblæsning i hulmur" onSelect={setType} />
            <OptionButton value="ydervaeg" current={type} label="Udvendig ydervægsisolering" sub="Efterisolering af ydervæg udvendigt" onSelect={setType} />
          </div>
        </div>

        {/* Isoleringstykkelse — kun for loft */}
        {type === "loftisolering" && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}>
              Isoleringstykkelse
            </label>
            <div className="grid grid-cols-3 gap-2">
              <OptionButton value="100" current={tykkelse} label="100 mm" onSelect={setTykkelse} />
              <OptionButton value="200" current={tykkelse} label="200 mm" onSelect={setTykkelse} />
              <OptionButton value="300" current={tykkelse} label="300 mm" onSelect={setTykkelse} />
            </div>
          </div>
        )}
      </div>
    </CalculatorShell>
  );
}
