import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Isoleringsberegner — loftisolering pris",
  url: "https://boligkalkylen.dk/loftisolering-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster efterisolering af loft i 2026?",
    answer:
      "Efterisolering af loft koster typisk 90–220 kr. pr. m² inkl. moms ved professionel udførelse. For et typisk parcelhus med 100 m² loftareal svarer det til 9.000–22.000 kr. Prisen afhænger af isoleringstykkelse (100, 200 eller 300 mm), loftets tilgængelighed og eksisterende isolering.",
  },
  {
    question: "Hvad er den anbefalede isoleringstykkelse for loft?",
    answer:
      "Bygningsreglementet anbefaler minimum 300 mm isolering i nye bygninger. I ældre huse er 100–150 mm typisk. At opgradere fra 100 mm til 300 mm på et 100 m² loft koster ca. 10.000–18.000 kr. men kan halvere varmetabet gennem loftet og spare 1.500–3.000 kr./år i varmeudgifter.",
  },
  {
    question: "Kan det betale sig at efterisolere loftet?",
    answer:
      "Ja — loftisolering er typisk den isoleringstype med hurtigst tilbagebetaling. Med en investering på 10.000–20.000 kr. og en besparelse på 2.000–4.000 kr./år tilbagebetaler projektet sig på 4–8 år. Herefter er varmebesparelsen ren gevinst. Tilskud fra Energistyrelsen kan reducere investeringen med op til 30%.",
  },
  {
    question: "Kan man få tilskud til loftisolering?",
    answer:
      "Ja — efterisolering af loft er typisk tilskudsberettiget under Energistyrelsens ordning for energirenoveringer. Tilskuddets størrelse afhænger af det aktuelle program og din boligsituation. Tjek altid de aktuelle betingelser på sparenergi.dk. Visse typer efterisolering er også omfattet af håndværkerfradraget (BoligJobordningen).",
  },
  {
    question: "Hvad er forskellen på løsuldsisolering og battisolering til loft?",
    answer:
      "Løsuld (typisk glasuld eller stenuldsgranulat, indblæst med maskine) er hurtigere at lægge og passer godt til ujævne loftrum. Batts (ruller eller plader) lægges i hånden og er bedre egnet til accessible lofter med god ståhøjde. Løsuld er typisk 10–20% billigere for større arealer, mens batts er lettere at DIY-installere.",
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
## Hvad koster loftisolering?

Efterisolering af loftet er den energirenovering der giver hurtigst tilbagebetaling i Danmark. For et **typisk parcelhus med 100 m² loftareal** koster det **9.000–22.000 kr.** inkl. moms at efterisolere til 300 mm — den anbefalede tykkelse.

## Prisintervaller for loftisolering 2026

| Tykkelse | Pris pr. m² | 100 m² loft |
|---|---|---|
| 100 mm | 70–110 kr./m² | 7.000–11.000 kr. |
| 200 mm | 90–150 kr./m² | 9.000–15.000 kr. |
| 300 mm | 110–220 kr./m² | 11.000–22.000 kr. |

Prisen inkluderer materialer, arbejde, transport og oprydning. Adgang via loftlem er standard — øget adgangsvanskelighed tillægges.

## Besparelse og tilbagebetaling

Loftisolering er den hurtigst tilbagebetalende isoleringstype fordi:
1. **Varme stiger** — op til 25–30% af boligens varmetab går gennem et dårligt isoleret loft
2. **Lavt installationskompleks** — ingen indgreb i ydervægge, ingen pudsning eller malingsopgave
3. **Tilskud tilgængeligt** — op til 30% tilskud fra Energistyrelsen reducerer investeringen

**Typisk tilbagebetaling:**

| Investering | Besparelse/år | Tilbagebetaling |
|---|---|---|
| 10.000 kr. | 2.000–3.000 kr. | 4–5 år |
| 15.000 kr. | 2.500–4.000 kr. | 4–6 år |
| 20.000 kr. | 3.000–5.000 kr. | 5–7 år |

## Hvad påvirker prisen?

- **Isoleringstykkelse**: 100 → 300 mm fordobler næsten materialemængden
- **Eksisterende isolering**: Er der allerede 100 mm, skal der kun toppes op med 200 mm
- **Adgangsforhold**: Loftrum med god ståhøjde og bred loftlem er billigst
- **Isoleringsmateriale**: Løsuld vs. batts — løsuld er typisk billigst til større arealer

## Tilskud og håndværkerfradrag

Efterisolering af loft er typisk tilskudsberettiget under Energistyrelsens ordning. Tjek de aktuelle betingelser på [sparenergi.dk](https://sparenergi.dk).

Visse isoleringstyper er også dækket af håndværkerfradraget (BoligJobordningen), som giver fradrag for arbejdslønnen.

Brug [isoleringsberegneren](/isolering) til at beregne dit eget estimat inkl. estimeret varmebesparelse og tilbagebetalingstid.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
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
        ["Midpoint", `${fmt(15500)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function LoftisoleringPrisPage() {
  return (
    <IntentPageLayout
      h1="Hvad koster loftisolering? Priser og estimat 2026"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/isolering"
      calculatorLabel="Beregn din pris på loftisolering"
    />
  );
}
