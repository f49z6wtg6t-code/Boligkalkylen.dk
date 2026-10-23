import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Malerberegner — pris pr. m²",
  url: "https://boligkalkylen.dk/maler-pris-m2",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster en maler pr. m² i 2026?",
    answer:
      "Standard indvendig maling (vægge og loft, god stand) koster 75–160 kr. pr. m² boligareal inkl. materialer. Kræver det spartling og klargøring, stiger prisen til 150–320 kr./m². Fuld renovering med dyb spartling kan koste 300–520 kr./m². Prisen pr. m² er altid på boligets gulvareal, ikke den faktiske vægflade.",
  },
  {
    question: "Hvad koster en maler pr. time?",
    answer:
      "En autoriseret maler koster 400–650 kr. i timen inkl. moms. De fleste malere giver dog et samlet tilbud på opgaven frem for at fakturere på timer. En maler maler typisk 40–60 m² boligareal pr. dag, svarende til ca. 3.200–5.200 kr. pr. dag ekskl. materialer.",
  },
  {
    question: "Hvad er en rimelig dagspris for en maler?",
    answer:
      "En rimelig dagspris (8 timer) er 3.200–5.200 kr. inkl. moms for ren malerydelse uden materialer. Er materialer inkluderet, tillægges 500–1.500 kr./dag afhængigt af produkttype og forbrug. En lavere dagspris end 2.800 kr. bør give anledning til at undersøge, om maleren er momsregistreret og bruger godkendte produkter.",
  },
  {
    question: "Kan man forhandle malerprisen?",
    answer:
      "Ja — det er muligt at opnå 10–20% rabat ved at: (1) indhente mindst 3 tilbud og nævne det for hver maler, (2) booke i lavsæson (november–februar), (3) selv klargøre rummet (rydde, tape, afmontere stikkontakter), og (4) samle al maling i én opgave frem for at opdele. Undgå at acceptere første tilbud uden sammenligning.",
  },
  {
    question: "Hvad er inkluderet i malerprisen pr. m²?",
    answer:
      "Standardprisen pr. m² inkluderer typisk afdækning, let sparkling af småhuller, grundbehandling ved behov og 2 lag maling på vægge og loft. Ikke inkluderet: fjernelse af tapet, dyb spartling, træværk og lister, radiatorer og rørgennemføringer. Sørg for at afklare dette med maleren inden accept af tilbud.",
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
## Maler pris pr. m² — hvad koster det?

Prisen på malerarbejde opgøres typisk pr. m² **boligareal** (gulvflade), ikke den faktiske vægflade. For **standard indvendig maling af vægge og loft i god stand** er prisen **75–160 kr./m²** inkl. materialer og moms.

## Prisintervaller pr. m² i 2026

| Omfang og tilstand | Pris pr. m² boligareal |
|---|---|
| Vægge og loft — god stand | 75–160 kr./m² |
| Vægge og loft — middel stand | 120–200 kr./m² |
| Vægge, loft + træværk — god stand | 130–250 kr./m² |
| Fuld renovering inkl. spartling — dårlig stand | 300–520 kr./m² |

## Timepris og dagspris for en maler

En maler koster **400–650 kr./time** inkl. moms. De fleste malere tilbyder dog en samlet pris for opgaven.

En maler maler typisk **40–60 m² boligareal pr. dag** (netto maletid). Regner man med transport og klargøring er den faktiske produktivitet 30–45 m²/dag.

**Dagspris (ekskl. materialer):** 3.200–5.200 kr. inkl. moms

## Hvad en maler bruger tid på

Prisen pr. m² stiger markant, når der er behov for:
- **Spartling** — fyldning og slibning af skader, revner og ujævnheder
- **Grundmaling** — ved store farveændringer eller reparerede flader
- **Ekstra lag** — mørke farver kræver typisk 3 lag for fuld dækning
- **Svær tilgængelighed** — høje lofter, smalle rum, trapper

## Priseksempler på konkrete opgaver

| Opgave | Estimeret pris |
|---|---|
| 1 stue (30 m²), vægge + loft | 3.500–7.000 kr. |
| 3 værelser (60 m²), vægge + loft | 6.500–14.000 kr. |
| Hel lejlighed (80 m²), vægge + loft | 9.000–18.000 kr. |
| Hel lejlighed (80 m²) + træværk | 14.000–26.000 kr. |

Brug [malerberegneren](/maler) til at beregne dit eget estimat baseret på faktisk areal, omfang og overfladernes tilstand.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris pr. m²</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          75
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          160
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr/m²</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Omfang", "Vægge og loft"],
        ["Tilstand", "God stand"],
        ["Timepris", "400–650 kr/t"],
        ["Dagspris", "3.200–5.200 kr"],
        ["80 m² total", `${fmt(12000)}–${fmt(22000)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function MalerPrisM2Page() {
  return (
    <IntentPageLayout
      h1="Maler pris pr. m² 2026 — hvad koster en maler?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/maler"
      calculatorLabel="Beregn din pris på malerarbejde"
    />
  );
}
