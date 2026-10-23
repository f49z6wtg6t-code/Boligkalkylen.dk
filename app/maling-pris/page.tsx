import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Malerberegner — pris på indvendig maling",
  url: "https://boligkalkylen.dk/maling-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster det at male en bolig indvendigt i 2026?",
    answer:
      "En 80 m² bolig med vægge og loft i god stand koster typisk 12.000–22.000 kr. inkl. moms ved professionel maler. Er overfladerne i middel stand med behov for let spartling, stiger prisen til 18.000–32.000 kr. Fuld renovering med komplet spartling og klargøring kan koste 28.000–50.000 kr. for 80 m².",
  },
  {
    question: "Hvad koster en maler pr. time i 2026?",
    answer:
      "En autoriseret maler koster typisk 400–650 kr. i timen inkl. moms i 2026. Timeprisen varierer alt efter region, virksomhedsstørrelse og omfanget af opgaven. I større byer er timeprisen som regel i den høje ende af intervallet. Til en standard malerakt beregner maleren oftest på samlet tilbud frem for timer.",
  },
  {
    question: "Er indvendig maling dækket af håndværkerfradrag?",
    answer:
      "Nej — indvendig maling er ikke omfattet af håndværkerfradraget (BoligJobordningen). Udvendig maling af huset er derimod dækket, hvis du bruger en godkendt håndværker. Hold øje med Skatteministeriets liste over godkendte arbejdstyper, da ordningen kan ændres.",
  },
  {
    question: "Hvad gør overfladernes tilstand ved prisen?",
    answer:
      "Tilstand er den vigtigste prisfaktor. God stand (2 lag maling direkte på væggen) er billigst. Middel stand kræver let spartling og evt. grundmaling, og prisen stiger med 20–40%. Dårlig stand kræver fuld klargøring, dyb spartling og slibning, og prisen kan stige med 60–100% sammenlignet med god stand.",
  },
  {
    question: "Kan man spare penge ved at gøre noget selv?",
    answer:
      "Ja — du kan spare 15–25% ved selv at rydde rum, afmontere stikkontakter og tape vinduer og lister inden maleren starter. Maleren fakturerer ikke for klargøringstid, og det er let arbejde for dig som boligejer. Selve malerarbejdet bør udføres professionelt, da amatørfejl (streger, sjatter, ujævn dækning) er svære at rette efterfølgende.",
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
## Hvad koster maling af hus?

Indvendig maling er en af de mest populære boligrenovering i Danmark. For en **80 m² bolig med vægge og loft i god stand** kan du forvente en pris på **12.000–22.000 kr.** inkl. moms ved professionel maler.

## Sådan er prisen sammensat

Malerprisen består primært af **arbejdsløn** og **materialer**. Materialeprisen er typisk 15–25% af den samlede pris — resten er arbejde.

**Arealpris: 75–160 kr./m² boligareal**
Prisen pr. m² angives ofte på boligareal (gulvflade), ikke vægflade. En bolig på 80 m² har typisk 280–350 m² vægflade alt efter loftshøjde og ruminddeling.

**Hvad påvirker prisen:**
- Overfladernes tilstand (god, middel, dårlig)
- Omfanget (vægge og loft, + træværk, eller fuld renovering)
- Farvevalg (mørke farver kræver flere lag)
- Region (priser er højere i og omkring de store byer)

## Prisoversigt: typiske projekter

| Bolig og omfang | Tilstand | Estimeret pris |
|---|---|---|
| 60 m², vægge og loft | God stand | 9.000–16.000 kr. |
| 80 m², vægge og loft | God stand | 12.000–22.000 kr. |
| 80 m², vægge og loft | Middel stand | 18.000–32.000 kr. |
| 100 m², vægge, loft + træværk | God stand | 20.000–35.000 kr. |
| 80 m², fuld renovering | Dårlig stand | 28.000–50.000 kr. |

## Tilstand er den vigtigste prisfaktor

| Tilstand | Hvad det kræver | Priseffekt |
|---|---|---|
| God stand | 2 lag maling direkte | Basisprisen |
| Middel stand | Let spartling + grundmaling + 2 lag | +20–40% |
| Dårlig stand | Fuld klargøring, dyb spartling, slibning | +60–100% |

Et rum med mange skader, store revner eller gammel tapet der skal fjernes, kræver markant mere arbejde — og prisen stiger derefter.

## Hvad er inkluderet i prisen?

Standardtilbud fra en maler inkluderer typisk:
- Afdækning af gulve og fast inventar
- Let overfladebehandling og spartling af småhuller
- 2 lag maling på vægge og loft
- Oprydning

**Ikke inkluderet:** Fjernelse af tapet, dyb spartling, maling af radiatorer og rørgennemføringer, maling af lister og træværk.

## Håndværkerfradrag — hvad gælder for maling?

Indvendig maling er **ikke** dækket af håndværkerfradraget (BoligJobordningen). Udvendig maling af facaden er derimod omfattet, hvis du bruger en godkendt håndværker.

Brug [malerberegneren](/maler) til at beregne dit eget estimat baseret på faktisk areal, omfang og overfladernes tilstand.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(12000)}
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
        ["Boligareal", "80 m²"],
        ["Omfang", "Vægge og loft"],
        ["Tilstand", "God stand"],
        ["Varighed", "2–3 dage"],
        ["Midpoint", `${fmt(17000)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function MalingPrisPage() {
  return (
    <IntentPageLayout
      h1="Hvad koster maling af hus? Priser og estimat 2026"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/maler"
      calculatorLabel="Beregn din pris på maling"
    />
  );
}
