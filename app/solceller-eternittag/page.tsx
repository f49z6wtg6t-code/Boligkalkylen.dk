import IntentPageLayout from "@/components/intent-page-layout";
import { calculateSolceller } from "@/lib/calculators/solceller";

const result = calculateSolceller(4000, 1.0);

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Solcelleberegner — eternittag, syd-vendt",
  url: "https://boligkalkylen.dk/solceller-eternittag",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Kan man sætte solceller på et eternittag?",
    answer:
      "Ja — solceller kan monteres på et eternittag, men det kræver en særlig monteringsteknik. Da eternitplader er skrøbelige, bruges klemmer eller beslag, der fastgøres uden at bore i eternitten. Det øger installationsprisen lidt i forhold til tegl eller trapezplade.",
  },
  {
    question: "Er der asbest i mit eternittag?",
    answer:
      "Eternitplader produceret før 1988 kan indeholde asbest. Asbestholdigt eternit er ikke farligt, så længe det er intakt og uforstyrret. Men installation af solceller på asbestholdigt eternit kræver en autoriseret asbestentreprenør — og kan i nogle tilfælde udløse et krav om udskiftning af taget. Få taget vurderet, inden du indhenter tilbud på solceller.",
  },
  {
    question: "Hvad koster solceller på eternittag?",
    answer: `Solceller på et eternittag koster typisk 5.000–10.000 kr. mere at installere end på et tegltag, grundet den særlige monteringsteknik. For et anlæg tilpasset 4.000 kWh/år estimerer vores beregner en installationspris på ca. ${fmt(result.installCost)} kr. Den årlige besparelse er ca. ${fmt(result.annualSavings)} kr.`,
  },
  {
    question: "Hvad er tilbagebetalingstiden for solceller på eternittag?",
    answer: `Med et syd-vendt eternittag og 4.000 kWh/år i forbrug er tilbagebetalingstiden typisk ${result.paybackYears} år. Over 25 år sparer du ca. ${fmt(result.savings25y)} kr. netto.`,
  },
  {
    question: "Hvornår skal jeg skifte eternittaget, inden jeg sætter solceller op?",
    answer:
      "Hvis eternittaget er mere end 25–30 år gammelt eller viser tegn på revner, mos eller forstyrrelser, anbefales det at skifte taget inden installation af solceller. Solcelleanlæg holder 25–30 år, og du risikerer ekstraomkostninger, hvis taget skal skiftes mens panelerne er monteret.",
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
## Solceller på eternittag — hvad skal du vide?

Mange danske huse fra 1960–1990'erne har et eternittag. Det gode nyhed er, at man sagtens kan installere solceller på eternit — men der er et par ting, du skal kende til, inden du indhenter tilbud.

Med et **syd-vendt eternittag** og et forbrug på **4.000 kWh/år** kan du forvente en **årlig besparelse på ca. ${fmt(result.annualSavings)} kr.** og en tilbagebetalingstid på ca. **${result.paybackYears} år**.

## Asbest i eternittag — vigtig information

Eternitplader produceret **før 1988** kan indeholde asbest. Det er ikke farligt, så længe eternitten er intakt — men det ændrer sig, hvis taget skal bearbejdes:

- **Boring i asbestholdigt eternit** er forbudt
- Installation af solceller kræver en autoriseret asbestentreprenør, hvis taget indeholder asbest
- I nogle tilfælde vil kommunen kræve, at taget udskiftes, inden solceller kan monteres

**Tjek produktionsåret** på din bolig og bed installatøren om at vurdere taget, inden du underskriver en kontrakt.

## Monteringsteknik på eternit

Da eternitplader er sprøde og ikke kan bores i, bruges alternative monteringsmetoder:

- **Klemme-systemer** der klemmer fast om eternitpladernes kant
- **Integrerede tagpaneler** der erstatter eternitpladerne direkte
- **Ballastmontage** på flade tage (ikke relevant for skrå eternittage)

Montering på eternit er mere tidskrævende end på tegl og øger installationsprisen med typisk 5.000–10.000 kr.

## Hvornår bør du skifte tag inden solcelleinstallation?

Solcelleanlæg har en levetid på 25–30 år. Hvis dit eternittag er **mere end 25–30 år gammelt** eller viser tegn på:

- Revner eller brud i pladerne
- Mos og algevækst
- Løse eller forskubbede plader

...anbefales det at skifte taget **inden** solcellerne installeres. Det er markant dyrere at flytte et solcelleanlæg midlertidigt for at skifte tag.

## Besparelse og økonomi

| Parameter | Estimat |
|---|---|
| Anlægsstørrelse | ${result.systemSizeKwp.toFixed(1)} kWp |
| Installationspris (excl. evt. tagrenovering) | ${fmt(result.installCost)} kr. |
| Årlig besparelse | ${fmt(result.annualSavings)} kr. |
| Tilbagebetalingstid | ${result.paybackYears} år |
| Samlet besparelse over 25 år | ${fmt(result.savings25y)} kr. |
| CO₂-reduktion pr. år | ${fmt(result.co2Reduction)} kg |

## Sammenligning: eternittag vs. tegltag

| Faktor | Eternittag | Tegltag |
|---|---|---|
| Monteringskompleksitet | Høj | Middel |
| Ekstraomkostning | +5.000–10.000 kr. | 0 kr. |
| Asbest-risiko (pre-1988) | Ja | Nej |
| Levetid for nyt tag | 30–40 år | 50–70 år |
| Anbefaling hvis tag er >25 år | Skift tag først | Vurder løbende |
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
        ["Forbrug", "4.000 kWh/år"],
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

export default function SolcellerEtternittPage() {
  return (
    <IntentPageLayout
      h1="Solceller på eternittag — pris og hvad du skal vide"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/solceller"
      calculatorLabel="Beregn din solcellebesparelse"
    />
  );
}
