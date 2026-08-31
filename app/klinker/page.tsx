"use client";

import { useState } from "react";
import CalculatorShell from "@/components/calculator-shell";
import LeadForm from "@/components/lead-form";
import FAQSection from "@/components/faq-section";
import Link from "next/link";
import {
  calculateKlinker,
  type KlinkeKvalitet,
  type KlinkeGulvvarme,
} from "@/lib/calculators/klinker";

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

function Toggle({
  checked,
  onChange,
  label,
  sub,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sub?: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 rounded-xl py-3 px-3 text-left transition-all duration-150 w-full"
      style={{
        backgroundColor: checked ? "rgba(58,107,42,0.12)" : "#FFFFFF",
        border: checked ? "1px solid #3A6B2A" : "1px solid #B8B0A4",
      }}
    >
      <div
        className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
        style={{
          backgroundColor: checked ? "#3A6B2A" : "#FFFFFF",
          border: checked ? "none" : "1px solid #B8B0A4",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#F6F4EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <span className="text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)", color: checked ? "#3A6B2A" : "#6B6356" }}>
          {label}
        </span>
        {sub && <span className="block text-xs mt-0.5" style={{ color: "#6B6356" }}>{sub}</span>}
      </div>
    </button>
  );
}

export default function KlinkerPage() {
  const [areal, setAreal] = useState(25);
  const [kvalitet, setKvalitet] = useState<KlinkeKvalitet>("standard");
  const [afretning, setAfretning] = useState(false);
  const [gulvvarme, setGulvvarme] = useState<KlinkeGulvvarme>("ingen");
  const [inklMaterialer, setInklMaterialer] = useState(true);

  const result = calculateKlinker({ areal, kvalitet, afretning, gulvvarme, inklMaterialer });

  const kvalitetLabels: Record<KlinkeKvalitet, string> = {
    standard: "Standard",
    premium: "Premium",
    luksus: "Luksus",
  };
  const gulvvarmeLabels: Record<KlinkeGulvvarme, string> = {
    ingen: "Ingen gulvvarme",
    el: "El-gulvvarme",
    vand: "Vandbåren gulvvarme",
  };

  const inputData: Record<string, unknown> = {
    "Areal (m²)": areal,
    Klinkekvalitet: kvalitetLabels[kvalitet],
    Gulvvarme: gulvvarmeLabels[gulvvarme],
    Afretning: afretning ? "Ja" : "Nej",
    "Inkl. klinker som materiale": inklMaterialer ? "Ja" : "Nej",
    "Estimeret pris (kr)": `${formatDKK(result.minPris)} – ${formatDKK(result.maxPris)}`,
  };

  return (
    <>
      <CalculatorShell
        title="Hvad koster lægning af klinker?"
        description="Beregn prisen på klinkegulv inkl. arbejdsløn og eventuelt materialer, afretning og gulvvarme."
        result={
          <>
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
              <p className="text-sm mb-1" style={{ color: "#6B6356" }}>
                Estimeret midtpris:{" "}
                <strong style={{ color: "#1E1A14" }}>{formatDKK(result.midpoint)} kr.</strong>
              </p>
              <p className="text-xs mb-4" style={{ color: "#9E9486" }}>
                Alle priser er inkl. moms · Opstart og transport er indregnet
              </p>

              <div
                className="rounded-xl p-4 text-sm mb-3"
                style={{ backgroundColor: "#F5F0E8", border: "1px solid #D4CCC0" }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: "#6B6356" }}>
                  Prisoversigt
                </p>
                <div className="space-y-1.5">
                  {result.poster.map((p) => (
                    <div key={p.navn} className="flex justify-between">
                      <span style={{ color: "#6B6356" }}>{p.navn}</span>
                      <span className="tabular-nums font-medium" style={{ color: "#1E1A14" }}>
                        {p.max > 0
                          ? `${formatDKK(p.min)} – ${formatDKK(p.max)} kr.`
                          : `${formatDKK(p.min)} kr.`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {result.minimumsprisAnvendt && (
                <div
                  className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                  style={{ backgroundColor: "#F5F0E8", border: "1px solid #D4CCC0", color: "#6B6356" }}
                >
                  <strong style={{ color: "#1E1A14" }}>Minimumspris anvendt.</strong> Transport,
                  maskiner og opstart koster det samme uanset rummets størrelse — et lille rum er
                  typisk dyrere pr. m².
                </div>
              )}
            </div>

            <LeadForm
              calculator_type="klinker"
              beregnet_vaerdi={result.midpoint}
              input_data={inputData}
            />

            <FAQSection
              items={[
                {
                  question: "Hvad koster lægning af klinker pr. m²?",
                  answer:
                    "Arbejdslønnen for klinklægning ligger typisk på 450–700 kr./m² inkl. moms. Inkluderer man klinker som materiale (standard kvalitet), lander det samlede klinkegulv på ca. 650–1.150 kr./m². Er der gulvvarme eller afretning oveni, stiger prisen med 100–1.000 kr./m² afhængigt af type.",
                },
                {
                  question: "Hvad koster det at lægge klinker på 25 m²?",
                  answer:
                    "For 25 m² med standard klinker og ingen tilvalg koster et færdigt klinkegulv typisk 18.000–32.000 kr. inkl. moms, arbejde og materialer. Tilvalg som afretning, el-gulvvarme eller premium klinker kan løfte prisen til 35.000–60.000 kr.",
                },
                {
                  question: "Kan man lægge klinker oven på gulvvarme?",
                  answer:
                    "Ja — klinker er faktisk det bedste gulvvalg til gulvvarme, fordi keramik og fliser leder varme effektivt. El-gulvvarme under klinker koster typisk 400–800 kr./m² ekstra. Vandbåren gulvvarme er dyrere (600–1.000 kr./m²) men giver lavere driftsomkostninger. Matterne lægges i klæbemiddelet inden klinkerne limes.",
                },
                {
                  question: "Hvad koster afretning af gulvet før klinker?",
                  answer:
                    "Afretning af gulvet inden klinklægning koster typisk 100–300 kr./m² inkl. moms. Det er nødvendigt, hvis gulvet har niveauforskelle over 3 mm, revner eller ujævnheder — klinkerne kræver en plan og fast undergrund for ikke at knække.",
                },
                {
                  question: "Hvor lang tid tager det at lægge klinker?",
                  answer:
                    "Et standard klinkegulv på 20–30 m² tager typisk 3–5 dage inkl. afretning og fugning. Klæbemiddelet skal hærde i 24 timer inden fugning, og fugemassen hærder yderligere 24–48 timer inden gulvet bør belastes.",
                },
                {
                  question: "Skal jeg selv købe klinkerne, eller gør håndværkeren det?",
                  answer:
                    "Begge dele er muligt. Køber du selv klinkerne, sparer du evt. håndværkerens avance, men du bærer risikoen ved fejlleveringer og manko. Bestil altid 10–15% ekstra til fremtidige reparationer. Beregneren viser prisen for begge scenarier — brug 'Kun arbejde' hvis du køber klinkerne selv.",
                },
              ]}
            />
          </>
        }
      >
        {/* Input panel */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label
                className="block text-sm font-medium"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
              >
                Areal (m²)
              </label>
              <span
                className="text-xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}
              >
                {areal} m²
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={areal}
              onChange={(e) => setAreal(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#3A6B2A" }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "#9E9486" }}>5 m²</span>
              <span className="text-xs" style={{ color: "#9E9486" }}>150 m²</span>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
            >
              Hvad skal indgå i prisen?
            </label>
            <div className="flex flex-col gap-2">
              <Toggle
                checked={inklMaterialer}
                onChange={setInklMaterialer}
                label="Inkl. klinker som materiale"
                sub="Beregn arbejde + materialer samlet"
              />
              {!inklMaterialer && (
                <p className="text-xs px-1" style={{ color: "#9E9486" }}>
                  Kun arbejdsløn — du køber selv klinkerne
                </p>
              )}
            </div>
          </div>

          {inklMaterialer && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
              >
                Klinkekvalitet
              </label>
              <div className="flex flex-col gap-2">
                <OptionButton
                  value="standard"
                  current={kvalitet}
                  label="Standard"
                  sub="200–450 kr./m² — portugisiske og spanske klinker"
                  onSelect={setKvalitet}
                />
                <OptionButton
                  value="premium"
                  current={kvalitet}
                  label="Premium"
                  sub="450–800 kr./m² — stor format, tykkere, bedre overflade"
                  onSelect={setKvalitet}
                />
                <OptionButton
                  value="luksus"
                  current={kvalitet}
                  label="Luksus"
                  sub="800–1.500 kr./m² — natursten, håndlavede fliser"
                  onSelect={setKvalitet}
                />
              </div>
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
            >
              Tilvalg
            </label>
            <div className="flex flex-col gap-2">
              <Toggle
                checked={afretning}
                onChange={setAfretning}
                label="Afretning af gulv"
                sub="100–300 kr./m² — nødvendigt ved ujævnt underlag"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
            >
              Gulvvarme
            </label>
            <div className="flex flex-col gap-2">
              <OptionButton
                value="ingen"
                current={gulvvarme}
                label="Ingen gulvvarme"
                sub=""
                onSelect={setGulvvarme}
              />
              <OptionButton
                value="el"
                current={gulvvarme}
                label="El-gulvvarme"
                sub="400–800 kr./m² — varmemåtter i klæbemiddel"
                onSelect={setGulvvarme}
              />
              <OptionButton
                value="vand"
                current={gulvvarme}
                label="Vandbåren gulvvarme"
                sub="600–1.000 kr./m² — slanger i afretningslag"
                onSelect={setGulvvarme}
              />
            </div>
          </div>
        </div>
      </CalculatorShell>

      <section className="px-4 sm:px-6 py-10" style={{ borderTop: "1px solid #D4CCC0" }}>
        <div className="max-w-3xl mx-auto space-y-4 text-sm" style={{ color: "#6B6356", lineHeight: "1.75" }}>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Hvad bestemmer prisen på et klinkegulv?
          </h2>
          <p>
            Prisen på et klinkegulv afhænger af fire faktorer:{" "}
            <strong style={{ color: "#1E1A14" }}>arbejdsløn</strong>,{" "}
            <strong style={{ color: "#1E1A14" }}>klinker som materiale</strong>,{" "}
            <strong style={{ color: "#1E1A14" }}>afretning</strong> og{" "}
            <strong style={{ color: "#1E1A14" }}>gulvvarme</strong>. Arbejdslønnen for selve
            lægningen udgør typisk 450–700 kr./m² inkl. moms — og stiger markant i rum under 10 m²,
            fordi der er langt flere tilskæringer pr. m² i et badeværelse end i et alrum.
          </p>
          <p>
            Materialernes andel af prisen varierer enormt. Standard portugisiske klinker koster
            200–450 kr./m², mens natursten og håndlavede fliser let rammer 800–1.500 kr./m². Køber
            du klinkerne selv, sparer du håndværkerens indkøbsavance, men du bærer risikoen ved
            manglende styk og leveringsfejl. Bestil altid 10–15% ekstra til fremtidige reparationer.
          </p>
          <p>
            Har du brug for inspiration til andre renoveringsprojekter? Brug vores{" "}
            <Link href="/gulv" style={{ color: "#3A6B2A", textDecoration: "underline" }}>
              gulvafslibningsberegner
            </Link>{" "}
            til trægulve eller{" "}
            <Link href="/badevaerelse" style={{ color: "#3A6B2A", textDecoration: "underline" }}>
              badeværelsesberegneren
            </Link>{" "}
            til en komplet badeværelsesrenovering.
          </p>
        </div>
      </section>
    </>
  );
}
