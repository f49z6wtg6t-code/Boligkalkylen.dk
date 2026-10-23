import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Isoleringsberegner — hulmursisolering pris",
  url: "https://boligkalkylen.dk/hulmursisolering-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster hulmursisolering pr. m² i 2026?",
    answer:
      "Hulmursisolering koster typisk 130–180 kr. pr. m² ydervæg inkl. moms, arbejde og materialer. For et parcelhus med 100 m² ydervæg svarer det til 13.000–18.000 kr. Prisen inkluderer boringer, indblæsning af isolering og oplukning af huller. Større huse er billigere pr. m² pga. lavere opstartspris relativt til areal.",
  },
  {
    question: "Hvad er besparelsen ved hulmursisolering?",
    answer:
      "Hulmursisolering kan give en varmebesparelse på 3.000–7.000 kr./år afhængigt af husets størrelse, varmekilde og det eksisterende isoleringsniveau. Et typisk parcelhus på 120 m² med fjernvarme kan spare 4.000–6.000 kr./år, svarende til en tilbagebetaling på 3–5 år.",
  },
  {
    question: "Kan alle huse hulmursisoleres?",
    answer:
      "Nej — huset skal have et hulmur (luftspalte mellem yder- og indervæg) for at metoden kan bruges. Huse bygget før ca. 1930 har typisk massive mure uden hulrum. Huse fra 1930–1970'erne har som regel et hulmur på 5–10 cm. Undgå hulmursisolering hvis murværket er fugtpåvirket — tjek altid med en håndværker inden.",
  },
  {
    question: "Er hulmursisolering dækket af tilskud?",
    answer:
      "Hulmursisolering er typisk tilskudsberettiget under Energistyrelsens ordning. Tilskuddets størrelse afhænger af det aktuelle program — tjek sparenergi.dk for aktuelle satser. I visse tilfælde er arbejdslønnen også dækket af håndværkerfradraget (BoligJobordningen).",
  },
  {
    question: "Hvad er risikoen ved hulmursisolering?",
    answer:
      "Den primære risiko er fugtproblemer, hvis murværket ikke er tæt. Indblæst isolering i en revnet eller porøs mur kan binde fugt og give skimmelproblemer over tid. Sørg for at isolatøren foretager en visuel inspektion og evt. fugtighedsmåling inden arbejdet påbegyndes. En autoriseret energiinstallatør er en god investering.",
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
## Hvad koster hulmursisolering?

Hulmursisolering er indblæsning af isoleringsmateriale (typisk mineraluld eller EPS-perler) i luftspalten mellem yder- og indervæg. For et **parcelhus med 100 m² ydervæg** koster det **13.000–18.000 kr.** inkl. moms — og kan give en varmebesparelse på 3.000–7.000 kr. om året.

## Pris på hulmursisolering 2026

| Hus og ydervægsareal | Estimeret pris |
|---|---|
| Lille hus (80 m²) | 10.500–14.500 kr. |
| Typisk parcelhus (100 m²) | 13.000–18.000 kr. |
| Stort hus (150 m²) | 18.000–26.000 kr. |
| Meget stort hus (200 m²) | 23.000–34.000 kr. |

Prisen pr. m² er typisk **130–180 kr.** og inkluderer boringer, indblæsning og tillukning af huller.

## Besparelse og tilbagebetaling

Hulmursisolering er en af de rentable energirenoveringer:

| Husstørrelse | Besparelse/år | Investering | Tilbagebetaling |
|---|---|---|---|
| 80 m² | 3.000–5.000 kr. | 10.500–14.500 kr. | 3–4 år |
| 120 m² | 4.000–7.000 kr. | 15.000–21.000 kr. | 3–5 år |
| 160 m² | 5.000–9.000 kr. | 19.000–27.000 kr. | 3–5 år |

Besparelsen varierer med varmekilde (fjernvarme, naturgas, varmepumpe), eksisterende isolering og boligens brug.

## Hvem kan hulmursisolere?

Huset skal have et **hulmur med luftspalte** — typisk huse bygget fra 1930 til 1980'erne. Ældre huse fra før ca. 1930 har som regel massive mure og kan ikke hulmursisoleres med denne metode.

**Inden isolering:** En professionel installatør skal vurdere murværkets tilstand. Fugtpåvirket eller revnet murværk er en kontraindikation.

## Tilskud

Hulmursisolering er normalt tilskudsberettiget under Energistyrelsens ordning. Tjek aktuelle satser og betingelser på [sparenergi.dk](https://sparenergi.dk).

Brug [isoleringsberegneren](/isolering) til at beregne dit estimat inkl. varmebesparelse og tilbagebetalingstid.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(13000)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(18000)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Ydervægsareal", "100 m²"],
        ["Pris pr. m²", "130–180 kr/m²"],
        ["Besparelse/år", "ca. 4.000–6.000 kr"],
        ["Tilbagebetaling", "ca. 3–5 år"],
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

export default function HulmursisoleringsPage() {
  return (
    <IntentPageLayout
      h1="Hulmursisolering pris 2026 — hvad koster det?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/isolering"
      calculatorLabel="Beregn din pris på hulmursisolering"
    />
  );
}
