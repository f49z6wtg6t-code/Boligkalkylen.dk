import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Isoleringsberegner — efterisolering pris",
  url: "https://boligkalkylen.dk/efterisolering-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster efterisolering i 2026?",
    answer:
      "Prisen på efterisolering varierer meget afhængigt af type. Loftisolering koster typisk 90–220 kr./m² (9.000–22.000 kr. for 100 m²). Hulmursisolering koster 130–180 kr./m² ydervæg (13.000–18.000 kr. for 100 m²). Udvendig ydervægsisolering er markant dyrere: 700–1.200 kr./m² inkl. puds og maling.",
  },
  {
    question: "Hvad er den bedste efterisolering at starte med?",
    answer:
      "Loftisolering er næsten altid det rigtige første skridt: lavest pris pr. m², hurtigst tilbagebetaling (4–7 år), ingen indgreb i ydervægge og tilskud tilgængeligt. Hulmursisolering er det næstbedste for huse med egnet murværk. Udvendig ydervægsisolering er dyrere og giver mening ved facaderenovering eller ved huse uden hulmur.",
  },
  {
    question: "Kan man få tilskud til efterisolering?",
    answer:
      "Ja — efterisolering er den mest tilskudsvenlige energirenovering i Danmark. Energistyrelsen har ordninger der kan dække op til 30% af investeringen. Visse typer er også dækket af håndværkerfradraget (BoligJobordningen). Tjek aktuelle satser og betingelser på sparenergi.dk inden du indhenter tilbud.",
  },
  {
    question: "Hvad er tilbagebetalingstiden på efterisolering?",
    answer:
      "Loftisolering: 4–7 år. Hulmursisolering: 3–5 år. Udvendig ydervægsisolering: 10–20 år (men giver også ny facade og øget boligværdi). Med tilskud fra Energistyrelsen kan tilbagebetalingstiden reduceres med 1–3 år på alle typer. Beregn din specifikke tilbagebetalingstid med beregneren nedenfor.",
  },
  {
    question: "Hvornår er det ikke klogt at efterisolere?",
    answer:
      "Efterisolering er ikke klogt: (1) hvis murværket er fugtpåvirket eller revnet — isoleringen lukker fugten inde, (2) hvis huset har et ventilationsproblem — mere isolering uden ventilation giver kondens og skimmel, (3) hvis du planlægger at sælge om få år — du indhenter måske ikke tilbagebetalingstiden. Tal altid med en energirådgiver inden større isoleringsprojekter.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const intro = `
## Hvad koster efterisolering?

Efterisolering er tilføjelse af isolering til en eksisterende bygning for at reducere varmetabet. Der er tre primære typer, og prisen varierer markant.

## Overblik over efterisoleringstyper og priser

| Type | Pris pr. m² | Typisk projekt | Besparelse/år |
|---|---|---|---|
| Loftisolering (300 mm) | 90–220 kr./m² | 9.000–22.000 kr. | 2.000–4.000 kr. |
| Hulmursisolering | 130–180 kr./m² | 13.000–18.000 kr. | 4.000–7.000 kr. |
| Udvendig ydervæg | 700–1.200 kr./m² | 70.000–120.000 kr. | 5.000–10.000 kr. |

## Loftisolering — det rigtige første skridt

Efterisolering af loftet er næsten altid det bedste sted at starte:
- **Lavest pris pr. investeret krone**
- **Hurtigst tilbagebetaling** (4–7 år, eller 3–5 år med tilskud)
- **Ingen indgreb** i ydervægge, facade eller fundament
- **Let adgang** — arbejdet foregår i loftrummet

Prisen er **90–220 kr./m²** afhængigt af isoleringstykkelse.

## Hulmursisolering — for huse med egnet murværk

Hulmursisolering er indblæsning af isolering i luftspalten i ydervæggen og koster **130–180 kr./m²** ydervæg. Forudsætter at huset har et egnet hulmur (typisk byggeri fra 1930–1980'erne).

Besparelse: **4.000–7.000 kr./år** for et typisk parcelhus, med tilbagebetaling på **3–5 år**.

## Udvendig ydervægsisolering — stor investering, lang horisont

Udvendig ydervægsisolering er påmontering af isoleringsplader og ny pudset facade. Det er den dyreste isoleringstype (700–1.200 kr./m²) men giver også ny facade, øger ejendomsværdien og giver den bedste varmeperformance.

Tilbagebetalingstiden er **10–20 år** — denne type giver mening, hvis facaden alligevel skal renoveres.

## Tilskud og håndværkerfradrag

Efterisolering er den mest tilskudsvenlige energirenovering i Danmark. Energistyrelsen har aktive ordninger — tjek [sparenergi.dk](https://sparenergi.dk) for aktuelle satser.

Brug [isoleringsberegneren](/isolering) til at beregne dit estimat inkl. varmebesparelse og tilbagebetalingstid.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Loftisolering — estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(9000)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(22000)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Loftareal", "100 m²"],
        ["Tykkelse", "300 mm"],
        ["Besparelse/år", "ca. 2.500–4.000 kr"],
        ["Tilbagebetaling", "ca. 5–7 år"],
        ["Hulmur (100 m²)", `${fmt(13000)}–${fmt(18000)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function EfterisoleringsPage() {
  return (
    <IntentPageLayout
      h1="Efterisolering pris 2026 — hvad koster det?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/isolering"
      calculatorLabel="Beregn din pris på efterisolering"
    />
  );
}
