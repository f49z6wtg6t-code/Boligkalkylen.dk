import IntentPageLayout from "@/components/intent-page-layout";
import { calculateSolceller } from "@/lib/calculators/solceller";

const result = calculateSolceller(4500, 1.0);

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Solcelleberegner — 6 kW anlæg, syd-vendt tag",
  url: "https://boligkalkylen.dk/solceller-6kw",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster et 6 kW solcelleanlæg i 2026?",
    answer: `Et 6 kW solcelleanlæg koster typisk 55.000–65.000 kr. installeret i 2026. Prisen varierer med leverandør, tagtype og om du har brug for ny elinstallation. Vores beregner estimerer installationsomkostningen til ca. ${fmt(result.installCost)} kr. for et anlæg tilpasset et forbrug på 4.500 kWh/år.`,
  },
  {
    question: "Hvad sparer man på strøm med 6 kW solceller?",
    answer: `Med et syd-vendt tag og et elforbrug på 4.500 kWh/år kan du spare ca. ${fmt(result.annualSavings)} kr. om året på din elregning. Det svarer til en tilbagebetalingstid på ca. ${result.paybackYears} år.`,
  },
  {
    question: "Er 6 kW det rigtige anlæg til mit hus?",
    answer:
      "Et 6 kW anlæg passer godt til et hus med 4.000–5.000 kWh/år i elforbrug (typisk et enfamiliehus med 3–4 beboere). Har du elbil eller varmepumpe, kan et større anlæg på 8–10 kW give bedre økonomi.",
  },
  {
    question: "Hvad er tilbagebetalingstiden for 6 kW solceller?",
    answer: `Med de nuværende elpriser og et syd-vendt tag er tilbagebetalingstiden for et 6 kW anlæg typisk ${result.paybackYears} år. Over 25 år sparer du ca. ${fmt(result.savings25y)} kr. netto efter fradrag af installationsprisen.`,
  },
  {
    question: "Kan man få støtte til 6 kW solceller i 2026?",
    answer:
      "Fra 2024 er den direkte statslige støtte til solceller afskaffet. Du kan dog stadig bruge BoligJobordningen til at trække 8.600 kr. pr. person fra i skat på arbejdslønnen. Derudover kan du sælge overskudsstrøm til nettet og udnytte nettomålerordningen.",
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
## Hvad koster et 6 kW solcelleanlæg?

Et 6 kW solcelleanlæg er en af de mest populære størrelser for danske parcelhuse. Det passer til et elforbrug på 4.000–5.000 kWh/år og giver en god balance mellem investering og besparelse.

Med et syd-vendt tag og et forbrug på 4.500 kWh/år kan du forvente en **årlig besparelse på ca. ${fmt(result.annualSavings)} kr.** og en tilbagebetalingstid på ca. **${result.paybackYears} år**.

## Besparelse og økonomi

| Parameter | Estimat |
|---|---|
| Anlægsstørrelse | ${result.systemSizeKwp.toFixed(1)} kWp |
| Installationsomkostning | ${fmt(result.installCost)} kr. |
| Årlig besparelse | ${fmt(result.annualSavings)} kr. |
| Tilbagebetalingstid | ${result.paybackYears} år |
| Samlet besparelse over 25 år | ${fmt(result.savings25y)} kr. |
| CO₂-reduktion pr. år | ${fmt(result.co2Reduction)} kg |

## Hvad påvirker besparelsen med 6 kW solceller?

**Tagorientering** er den vigtigste enkeltfaktor. Et syd-vendt tag giver 100% af den mulige produktion. Øst/vest-vendt tag giver ca. 85%, og et fladt eller nord-vendt tag giver kun ca. 65% af den optimale produktion.

**Selvforbrugsandel** afhænger af hvornår du er hjemme. Jo mere strøm du forbruger direkte (frem for at eksportere til nettet), desto bedre økonomi. Elbil og varmepumpe øger selvforbrugsandelen markant.

**Elforbrug** bestemmer anlæggets størrelse. Med 4.500 kWh/år er et 6 kW anlæg passende. Har du elbil, anbefales 8–10 kW.

## Hvad koster 6 kW solceller at installere?

Installationsprisen afhænger af:

- **Tagtype** — eternit, tegl og trapezplade er alle egnede, men monteringen varierer i pris
- **Antal etager** — stilladsbehov øger prisen
- **Eksisterende elinstallation** — gammel tavle kan kræve opgradering
- **Leverandør** — priserne varierer 15–25% mellem leverandører

Hent 2–3 tilbud og sammenlign pris pr. kWp for at sikre et fair tilbud.

## 6 kW vs. andre anlægsstørrelser

| Størrelse | Passer til | Pris (ca.) | Besparelse/år |
|---|---|---|---|
| 4 kW | 3.000 kWh/år | 38.000–45.000 kr. | 7.000–9.000 kr. |
| 6 kW | 4.500 kWh/år | 55.000–65.000 kr. | ${fmt(result.annualSavings)} kr. |
| 8 kW | 6.000 kWh/år | 72.000–85.000 kr. | 14.000–18.000 kr. |
| 10 kW | 7.500+ kWh/år | 88.000–105.000 kr. | 17.000–22.000 kr. |
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret besparelse pr. år</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(result.annualSavings)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr/år</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Forbrug", "4.500 kWh/år"],
        ["Tagorientering", "Syd-vendt"],
        ["Anlæg", `${result.systemSizeKwp.toFixed(1)} kWp`],
        ["Installationspris", `${fmt(result.installCost)} kr`],
        ["Tilbagebet.", `${result.paybackYears} år`],
        ["Besparelse 25 år", `${fmt(result.savings25y)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Solceller6KwPage() {
  return (
    <IntentPageLayout
      h1="Solceller 6 kW — hvad koster det og hvad sparer du?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/solceller"
      calculatorLabel="Tilpas dit solcelleanlæg"
    />
  );
}
