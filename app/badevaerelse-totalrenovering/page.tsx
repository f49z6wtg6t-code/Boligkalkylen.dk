import IntentPageLayout from "@/components/intent-page-layout";
import { calculateBadevaerelse } from "@/lib/calculators/badevaerelse";

const result = calculateBadevaerelse({
  stoerrelse: "mellem",
  omfang: "totalrenovering",
  materialer: "standard",
  vvsFlytning: false,
});

const resultPremium = calculateBadevaerelse({
  stoerrelse: "mellem",
  omfang: "totalrenovering",
  materialer: "premium",
  vvsFlytning: false,
});

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Badeværelseberegner — totalrenovering",
  url: "https://boligkalkylen.dk/badevaerelse-totalrenovering",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster en totalrenovering af badeværelse i 2026?",
    answer: `En totalrenovering af et standard badeværelse på 5–10 kvm koster ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. med standard materialer og uden VVS-flytning. Med premium materialer stiger prisen til ${fmt(resultPremium.prisLav)}–${fmt(resultPremium.prisHoej)} kr.`,
  },
  {
    question: "Hvad er forskellen på overfladisk renovering og totalrenovering?",
    answer:
      "En overfladisk renovering udskifter kun det synlige: fliser, inventar og maling. En totalrenovering river alt ned til beton og starter forfra — ny membran, nyt VVS, ny el, nye rør og ny gulvvarme. Totalrenovering er den eneste måde at sikre, at du ikke har skjulte fugtskader bagved.",
  },
  {
    question: "Kan man bo hjemme under en totalrenovering af badeværelse?",
    answer:
      "Ja, hvis du har et andet toilet i boligen. Under en totalrenovering er badeværelset komplet utilgængeligt i 4–7 uger. Mange familier klarer sig med midlertidigt adgang hos naboer eller familie, eller lejer en campingvogn.",
  },
  {
    question: "Hvad øger prisen mest ved totalrenovering af badeværelse?",
    answer:
      "De tre største prisdrivere er: (1) VVS-flytning (+15.000–35.000 kr.), (2) materialeniveau — premium-fliser og designsanitet kan fordoble materialeomkostningerne, og (3) uforudsete skader bag fliser, som opdages efter nedrivning.",
  },
  {
    question: "Kræver totalrenovering af badeværelse byggetilladelse?",
    answer:
      "I de fleste tilfælde kræver en totalrenovering ikke byggetilladelse, hvis du ikke ændrer boligens konstruktion eller ændrer boligens anvendelse. Dog kræver ændringer i bærende vægge, flytning af stikledninger til kloak samt installation af ny ventilation i nogle kommuner en anmeldelse.",
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
## Hvad koster en totalrenovering af badeværelse?

En totalrenovering af badeværelse er et af de mest komplekse projekter i et hjem — og et af dem, der skaber mest værdi, når det er gjort rigtigt. Alt rives ned til beton, og alt bygges op fra bunden: membran, VVS, el, fliser og sanitet.

For et standard badeværelse på 5–10 kvm med standard materialer koster en totalrenovering typisk **${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr.** Det svarer til ca. ${result.uger} ugers arbejde.

## Hvad er inkluderet i en totalrenovering?

En komplet totalrenovering inkluderer:

- **Nedrivning** — eksisterende fliser, inventar og gulvbelægning
- **VVS** — afløb, vandinstallationer og gulvvarme (uden flytning)
- **El** — belysning, stikkontakter og ventilation
- **Membran** — obligatorisk vandtæt membran (BR18 krav)
- **Fliser** — gulv og vægge, standard kvalitet
- **Sanitet** — toilet, håndvask, brusekabine og/eller badekar
- **Maler og afslutning**

## Prisoversigt: totalrenovering af badeværelse

| Størrelse | Standard | Premium | Premium + VVS-flytning |
|---|---|---|---|
| < 5 kvm | 95.000–130.000 kr. | 150.000–205.000 kr. | 165.000–240.000 kr. |
| 5–10 kvm | ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. | ${fmt(resultPremium.prisLav)}–${fmt(resultPremium.prisHoej)} kr. | 185.000–295.000 kr. |
| > 10 kvm | 290.000–440.000 kr. | 430.000–600.000 kr. | 445.000–635.000 kr. |

## Totalrenovering vs. overfladisk renovering

**Overfladisk renovering** (fliser, inventar, maling) koster ca. 30–40% af en totalrenovering. Det er relevant, hvis:
- Rørene er i god stand
- Der ikke er fugtskader bag fliserne
- Du vil opdatere udseendet på kort sigt

**Totalrenovering** er nødvendig, hvis:
- Badeværelset er mere end 20–25 år gammelt
- Der er synlig fugt, kalk eller misfarvning
- Du vil have gulvvarme
- Du vil flytte inventar til ny placering

## Hvad øger prisen?

**VVS-flytning** er den største enkeltpost: at flytte toilet, håndvask eller bruseniche til ny placering kræver åbning af gulv eller vægge og koster 15.000–35.000 kr. ekstra.

**Materialeniveau** har stor indflydelse: premium-fliser fra kendte mærker og designsanitet kan fordoble materialeomkostningerne. Standard-materialer fra danske byggemarkeder giver et godt pris/kvalitets-forhold.

**Uforudsete skader** opdages som regel efter nedrivning. Fugt- og råd-skader bag fliser er hyppigst i huse fra 1960–1990erne. Afsæt 10–15% af budgettet til uforudsete udgifter.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris (5–10 kvm, standard)</div>
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
        ["Størrelse", "5–10 kvm"],
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

export default function BadevaerelseTodalrenovPage() {
  return (
    <IntentPageLayout
      h1="Totalrenovering af badeværelse 2026 — pris og guide"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/badevaerelse"
      calculatorLabel="Beregn din totalrenovering"
    />
  );
}
