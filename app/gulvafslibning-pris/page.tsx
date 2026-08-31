import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gulvafslibning pris beregner",
  url: "https://boligkalkylen.dk/gulvafslibning-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster gulvafslibning pr. m²?",
    answer:
      "Prisen for gulvafslibning inkl. efterbehandling ligger typisk på 135–250 kr./m² afhængigt af gulvets tilstand og valg af behandling. Hertil kommer en opstartspris på 1.800–2.500 kr. for transport og afdækning. Et 80 m² gulv i middel stand med lakering koster typisk 14.500–18.500 kr. samlet.",
  },
  {
    question: "Hvad er inkluderet i prisen for gulvafslibning?",
    answer:
      "Standardprisen inkluderer afdækning, grovslibning, mellemslibning, finslibning, støvsugning, spartling af søm og huller samt 3 lag efterbehandling (lakering, oliering eller sæbe). Afmontering af lister og møbeltransport er typisk ikke inkluderet og faktureres separat.",
  },
  {
    question: "Hvad gør gulvets tilstand ved prisen?",
    answer:
      "Gulvets tilstand er den vigtigste prisfaktor. Et gulv i god stand (let slid, intakt overflade) behandles med færre slibegange. Et gulv i middel stand kræver mere arbejde og eventuelt spartling. Et gulv i dårlig stand kan kræve ekstra grovslibning, udskiftning af brædder og ekstra spartling — det kan øge prisen med 30–50%.",
  },
  {
    question: "Hvornår er det billigst at sætte gulvafslibning i gang?",
    answer:
      "Gulvsliber har typisk lavere belægning i vintermånederne (november–februar) og kan i denne periode være mere forhandlingsvillige på prisen. Derudover er det billigere at behandle hele gulvarealet på én gang frem for at opdele projektet i etaper, da opstartsprisen betales per besøg.",
  },
  {
    question: "Kan et meget dårligt gulv slibes — eller er det for sent?",
    answer:
      "Et gulv kan slibes, så længe der er tilstrækkelig resttykkelse på lamellerne — typisk minimum 3 mm over not og fjeder. Er gulvet under denne grænse, kan slibning gøre det ustabilt. En professionel gulvsliber vurderer dette ved besigtigelse og kan kontrollere tykkelsen med en nål i fugespalterne.",
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
## Hvad koster gulvafslibning?

Gulvafslibning er processen, hvor det øverste slid- og overfladelag fjernes fra et trægulv med specialmaskiner, hvorefter gulvet behandles med lak, olie eller sæbe. For et **80 m² gulv i middel stand med 3-lags lakering** kan du forvente en pris på **14.500–18.500 kr.** inkl. moms.

## Sådan er prisen sammensat

En gulvafslibning består af to hoveddele: **opstartspris** og **arealpris**.

**Opstartspris: 1.800–2.500 kr.**
Opstartsprisen dækker transport af maskiner og mandskab, tid til afdækning og beskyttelse af rum samt opsætning. Den betales uanset gulvareal og er grunden til, at små arealer har en høj pris pr. m².

**Arealpris: 135–250 kr./m²**
Arealprisen varierer alt efter:
- Gulvets tilstand (god, middel, dårlig)
- Valg af efterbehandling (lakering, oliering, sæbe)
- Tilgængelighed (møbler, trapper, hjørner)

## Hvad tilstand gør ved prisen

Tilstand er den primære prisfaktor:

| Tilstand | Hvad det kræver | Priseffekt |
|---|---|---|
| God stand | Grovslibning + finslibning + behandling | Basisprisen |
| Middel stand | Ekstra mellemslibning, spartling | +15–25% |
| Dårlig stand | Ekstra grovslibning, mulig udskiftning af brædder, mere spartling | +30–50% |

Et gulv i dårlig stand med rester af gammel polyurethanlak, dybe ridser eller ujævnheder kræver markant mere tid — og prisen stiger derefter.

## Prisoversigt: typiske projekter

| Areal og tilstand | Estimeret pris |
|---|---|
| 30 m², god stand, lakering | 5.500–7.500 kr. |
| 50 m², god stand, lakering | 8.500–11.500 kr. |
| 80 m², middel stand, lakering | 14.500–18.500 kr. |
| 100 m², dårlig stand, lakering | 20.000–28.000 kr. |

## Forskel på lille og stort areal

På et lille areal udgør opstartsprisen en stor del af totalomkostningen. På et 30 m² gulv kan opstartsprisen alene udgøre 20–30% af den samlede pris. Har du mulighed for at sætte alle rum i stand på samme tid, sparer du opstartsprisen på de ekstra besøg.

## Hvornår er det for sent at sætte gulvet i stand?

Et trægulv kan slibes, så længe der er nok materiale tilbage over not og fjeder — typisk minimum 3 mm. Er lamellen tyndere, risikerer du at slibbe ned i not-systemet, og gulvet bliver ustabilt. Synlige søm i gulvoverfladen (dvs. søm, der er slidt fri) er et tegn på, at gulvet nærmer sig grænsen.

Brug [gulvberegneren](/gulv) til at beregne dit eget estimat baseret på faktisk areal, tilstand og ønsket behandling. Beregneren giver dig et interval, du kan bruge, inden du indhenter tilbud.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(14500)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(18500)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Gulvareal", "80 m²"],
        ["Tilstand", "Middel stand"],
        ["Efterbehandling", "Lakering (3 lag)"],
        ["Holdbarhed", "10–15 år"],
        ["Midpoint", `${fmt(16500)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function GulvafslibningPrisPage() {
  return (
    <IntentPageLayout
      h1="Hvad koster gulvafslibning? Priser og estimat 2026"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/gulv"
      calculatorLabel="Beregn din pris på gulvafslibning"
    />
  );
}
