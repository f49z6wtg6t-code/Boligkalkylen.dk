import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Malerberegner — pris på maling af lejlighed",
  url: "https://boligkalkylen.dk/male-lejlighed-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster det at male en 3-værelses lejlighed?",
    answer:
      "En 3-værelses lejlighed på 75–85 m² med vægge og loft i god stand koster typisk 12.000–22.000 kr. inkl. moms. Er der behov for spartling og klargøring (middel stand), stiger prisen til 18.000–32.000 kr. Fuld malerbehandling inkl. træværk og dårlige overflader kan koste 28.000–50.000 kr.",
  },
  {
    question: "Hvad koster det at male en 2-værelses lejlighed?",
    answer:
      "En 2-værelses lejlighed på 50–65 m² koster typisk 8.000–15.000 kr. for vægge og loft i god stand. Med spartling og middel tilstand stiger det til 12.000–22.000 kr. Inkluderes træværk og lister, tillægges 2.000–5.000 kr. afhængigt af omfanget.",
  },
  {
    question: "Skal man male lejlighed inden fraflytning?",
    answer:
      "Det afhænger af lejekontrakten og normalistandsættelsesreglerne. Istandsættelse ved fraflytning er reguleret af lejeloven. Generelt gælder, at du skal aflevere lejligheden i samme stand som ved indflytning, fraregnet normal slid. Er der krav om maling, er prisen typisk 8.000–22.000 kr. for en standard 2–3 værelses lejlighed.",
  },
  {
    question: "Hvor lang tid tager det at male en lejlighed?",
    answer:
      "En professionel maler bruger typisk 2–3 dage på en lejlighed på 80 m² med vægge og loft i god stand. Kræver det spartling og klargøring, tager det 3–5 dage. Fuld renovering med dyb spartling, slibning og maling af træværk kan tage 5–8 dage.",
  },
  {
    question: "Kan man male lejlighed selv og spare penge?",
    answer:
      "Ja — at male selv kan spare 60–75% af malerregningen (materialer udgør kun 15–25% af prisen). Men professionel kvalitet kræver korrekt teknik, de rigtige produkter og tilstrækkelig tørretid mellem lag. Amatørfejl som synlige penselstreger, sjatter og ujævn dækning er svære at rette efterfølgende. Til en fraflytningsrenovering, hvor kvaliteten vurderes, anbefales det at bruge professionel maler.",
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
## Hvad koster det at male en lejlighed?

At male en lejlighed er et af de mest hyppige malerarbejder i Danmark. For en **3-værelses lejlighed på 80 m² med vægge og loft i god stand** kan du forvente en pris på **12.000–22.000 kr.** inkl. moms.

## Prisoversigt — maling af lejlighed 2026

| Lejlighed | Tilstand | Omfang | Estimeret pris |
|---|---|---|---|
| 2 vær. (55 m²) | God stand | Vægge + loft | 8.000–15.000 kr. |
| 3 vær. (80 m²) | God stand | Vægge + loft | 12.000–22.000 kr. |
| 3 vær. (80 m²) | Middel stand | Vægge + loft | 18.000–32.000 kr. |
| 4 vær. (100 m²) | God stand | Vægge + loft | 15.000–27.000 kr. |
| 3 vær. (80 m²) | God stand | Vægge, loft + træværk | 18.000–32.000 kr. |
| 3 vær. (80 m²) | Dårlig stand | Fuld renovering | 28.000–50.000 kr. |

## Hvad der påvirker prisen

**Overfladernes tilstand** er den vigtigste faktor. God stand (let slid, intakt maling) er billigst. Lejligheder med mange skader, gammel tapet, revner eller store reparationer kræver spartling og klargøring, der kan fordoble prisen.

**Farvevalg** påvirker prisen mere end de fleste tror. Hvid og lyse farver dækker typisk på 2 lag. Mørke og mættede farver (navy, skovgrøn, antracit) kræver ofte 3–4 lag for fuld dækning, da bundfarven skinner igennem — og det koster ekstra i arbejdstid og materialer.

**Træværk og lister** er typisk ikke inkluderet i standardtilbud. Maling af lister, fodlister, vindueskarme og døre tillægges 2.000–8.000 kr. afhængigt af lejlighedens størrelse og listernes tilstand.

## Fraflytningsrenovering — hvad er kravet?

Lejeloven regulerer kravene ved fraflytning. Generelt skal lejligheden afleveres i samme stand som ved indflytning, fraregnet normal slid. Mange kontrakter specificerer malerstanden nærmere — tjek din kontrakt inden du indhenter tilbud.

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
        ["Lejlighed", "3 vær. (80 m²)"],
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

export default function MalelejlighedPrisPage() {
  return (
    <IntentPageLayout
      h1="Hvad koster det at male en lejlighed? Pris 2026"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/maler"
      calculatorLabel="Beregn din pris på maling af lejlighed"
    />
  );
}
