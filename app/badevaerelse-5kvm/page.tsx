import IntentPageLayout from "@/components/intent-page-layout";
import { calculateBadevaerelse } from "@/lib/calculators/badevaerelse";

const result = calculateBadevaerelse({
  stoerrelse: "lille",
  omfang: "totalrenovering",
  materialer: "standard",
  vvsFlytning: false,
});

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Badeværelseberegner — lille badeværelse under 5 kvm",
  url: "https://boligkalkylen.dk/badevaerelse-5kvm",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster en totalrenovering af et badeværelse under 5 kvm?",
    answer: `En totalrenovering af et lille badeværelse under 5 kvm koster typisk ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. med standard materialer. Det inkluderer el, VVS (uden flytning), membran, fliser, sanitet og maler.`,
  },
  {
    question: "Kan man renovere et badeværelse under 5 kvm uden VVS-flytning?",
    answer:
      "Ja — hvis du beholder de eksisterende rørføringer (håndvask, toilet, bruseniche på samme placering), undgår du de dyreste VVS-udgifter. Det kan spare 15.000–35.000 kr. og reducere projektets varighed med 1–2 uger.",
  },
  {
    question: "Hvor lang tid tager det at renovere et lille badeværelse?",
    answer:
      "En totalrenovering af et lille badeværelse under 5 kvm tager typisk 3–4 uger. Tidsfaktorerne er: membranens tørretid (3–5 dage), fliseklægning og levering af materialer.",
  },
  {
    question: "Hvad er billigst: standard, premium eller luksus materialer til lille badeværelse?",
    answer:
      "Standard materialer giver det bedste pris/kvalitets-forhold for et lille badeværelse. Forskellen i materialeomkostninger er mindre på et lille areal, men ved valg af premium eller luksus stiger prisen med 30–80% uden tilsvarende stigning i brugsværdi.",
  },
  {
    question: "Er der momsfradrag eller skattefradrag ved badeværelsesrenovering?",
    answer:
      "Arbejdslønnen kan delvist fratrækkes via håndværkerfradraget (BoligJobordningen). I 2026 kan du fratrække op til 8.600 kr. pr. person for grøn istandsættelse. Et par kan tilsammen opnå op til 17.200 kr. i fradrag.",
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
## Hvad koster et lille badeværelse under 5 kvm?

Et lille badeværelse under 5 kvm er det hyppigste renoveringsprojekt i danske rækkehuse og lejligheder. Arealet er begrænset, men udgifterne er ikke proportionalt lavere — VVS-arbejde, el, membran og håndværkerløn koster omtrent det samme som på et standard badeværelse.

Med **standard materialer** og **totalrenovering uden VVS-flytning** kan du forvente en pris på **${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr.** Det svarer til en varighed på ca. 3–4 uger.

## Hvad er inkluderet i prisen?

En totalrenovering af et lille badeværelse inkluderer typisk:

- **Nedrivning** af eksisterende fliser og inventar
- **VVS** (rør, afløb og gulvvarme uden flytning af stikledninger)
- **El** (belysning, stikkontakter og eventuel hårtørrerholder)
- **Membran** på gulv og vægge (kræves af bygningsreglementet)
- **Fliser** på gulv og vægge — standard kvalitet
- **Sanitet**: toilet, håndvask og brusekabine
- **Maler og afslutning**

## Hvad øger prisen på et lille badeværelse?

De tre største prisdrivere er:

1. **VVS-flytning** — at flytte toilet, håndvask eller bruseniche til ny placering tilføjer 15.000–35.000 kr.
2. **Materialeniveau** — premium-fliser og designsanitet kan fordoble materialeomkostningerne
3. **Eksisterende fugt- eller råd-skader** — uforudsete skader bag fliser opdages først efter nedrivning

## Prisoversigt: lille badeværelse under 5 kvm

| Scenarie | Estimat |
|---|---|
| Overfladisk (fliser + inventar) | 75.000–100.000 kr. |
| Totalrenovering, standard | ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. |
| Totalrenovering, premium | 175.000–240.000 kr. |
| Totalrenovering inkl. VVS-flytning | 145.000–220.000 kr. |

## Sådan bruger du beregneren

Beregneren til højre er præudfyldt med de mest almindelige værdier for et lille badeværelse: **under 5 kvm**, **totalrenovering** og **standard materialer**. Du kan justere værdierne på den fulde badeværelsesberegner for at se, hvad premium materialer eller VVS-flytning ændrer på prisen.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(result.prisLav)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(result.prisHoej)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Størrelse", "< 5 kvm"],
        ["Omfang", "Totalrenovering"],
        ["Materialer", "Standard"],
        ["VVS flytning", "Nej"],
        ["Varighed", `${result.uger} uger`],
        ["Midpoint", `${fmt(result.midpoint)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function BadevaerelseKvmPage() {
  return (
    <IntentPageLayout
      h1="Badeværelse under 5 kvm — hvad koster en renovering?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/badevaerelse"
      calculatorLabel="Juster dit badeværelsesbudget"
    />
  );
}
