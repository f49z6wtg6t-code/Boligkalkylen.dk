import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Klinker 25 m² beregner",
  url: "https://boligkalkylen.dk/klinker-25-kvm",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster det at lægge klinker på 25 m²?",
    answer:
      "Lægning af klinker på 25 m² inkl. standard materialer koster typisk 18.000–32.000 kr. inkl. moms. Midtpunktet ligger på ca. 25.000 kr. Prisen varierer med materialekvalitet, om der er behov for afretning, og om der ønskes gulvvarme.",
  },
  {
    question: "Hvad er inkluderet i prisen for klinkelægning?",
    answer:
      "Standardprisen inkluderer: fliseklæber og fugemasse, selve klinkerene (standard kvalitet), arbejdsløn for lægning og fugning, sokler langs vægge og rengøring. Afretning af underlaget, gulvvarme og premium klinker faktureres typisk separat.",
  },
  {
    question: "Skal man have afretning, og hvad koster det?",
    answer:
      "Afretning er nødvendigt, når underlaget er ujævnt — typisk ved ældre betonunderlag, træbjælkelag eller gulve med niveauforskelle over 3 mm pr. 2 m. Afretning koster 100–300 kr./m², dvs. 2.500–7.500 kr. for 25 m². En fliseudlægger vurderer dette ved besigtigelse.",
  },
  {
    question: "Hvor lang tid tager det at lægge klinker på 25 m²?",
    answer:
      "Et 25 m² klinkearbejde tager typisk 2–4 dage for én håndværker. Dag 1–2 bruges til forberedelse og lægning, dag 3 til fugning. Herefter skal fugen hærde i 24–48 timer, inden gulvet kan bruges normalt.",
  },
  {
    question: "Ændres prisen ved premium eller luksus klinker?",
    answer:
      "Ja — arbejdslønnen er den samme uanset materialekvalitet, men materialerne kan variere fra 200 kr./m² (standard) til over 1.500 kr./m² (luksus natursten). For 25 m² betyder det en forskel på materialeomkostninger på op til 32.500 kr. Derudover kræver store formater og natursten ofte mere erfaring og ekstra forsigtighed ved lægning.",
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
## Hvad koster det at lægge klinker på 25 m²?

Et klinkebelægt gulv på 25 m² er typisk en hel stue, et stort køkken-alrum eller et kombineret entre/gangarea. For dette areal med **standard klinker uden afretning og gulvvarme** kan du forvente en pris på **18.000–32.000 kr.** inkl. moms. Midtpunktet ligger på ca. 25.000 kr.

## Hvad er inkluderet i prisen?

En standardpris for klinkelægning inkluderer:

- **Klinker** — standard kvalitet (ca. 200–400 kr./m²)
- **Klæber og fugemasse** — inkl. fliseklæber, armeringsnet ved behov og fugemasse
- **Arbejdsløn** — lægning, tilpasning, fugning og rengøring
- **Sokler** — afslutning langs vægkant

Hvad der typisk **ikke** er inkluderet:
- Afretning af underlag (faktureres separat: 100–300 kr./m²)
- Gulvvarme (el eller vandbåren)
- Premium eller luksus klinker
- Demontering af eksisterende gulvbelægning

## Prisbreakdown pr. post

| Post | Estimeret pris for 25 m² |
|---|---|
| Arbejdsløn (lægning + fugning) | 11.000–17.500 kr. |
| Klinker, standard | 5.000–10.000 kr. |
| Klæber og fugemasse | 2.000–4.500 kr. |
| **Total** | **18.000–32.000 kr.** |

## Hvornår er afretning nødvendigt?

Afretning er påkrævet, hvis underlaget har niveauforskelle på mere end 3 mm pr. 2 løbende meter. Det er hyppigt ved:

- Ældre betonunderlag med sætninger
- Træbjælkelag og strøgulve
- Gulve, der tidligere har haft tæppe eller parket, som efterlader ujævnheder

En dygtig fliseudlægger vurderer dette ved besigtigelse og kan i mange tilfælde udføre selve afretningen som en del af projektet. Prisen for afretning er typisk 100–300 kr./m², svarende til 2.500–7.500 kr. for 25 m².

## Materialekvalitet: standard, premium og luksus

Materialekvalitet er den faktor, der kan skalere prisen mest:

| Kvalitet | Materialeomkostning pr. m² | Eksempel |
|---|---|---|
| Standard | 200–400 kr. | Cementklinker, basis keramik |
| Premium | 400–900 kr. | Porcelæn, store formater |
| Luksus | 900–1.500+ kr. | Natursten, marmor, håndlavet flise |

Arbejdslønnen er i store træk uforandret — men store formater og natursten kræver mere præcision ved tilpasning og lægning, hvilket kan øge tidsforbrug med 20–30%.

## Gulvvarme som tilvalg

Gulvvarme er populært under klinker, da klinker optager og afgiver varme effektivt. To systemer:

**Elvarme (varmekabel eller varmemåtte):** Passer til de fleste projekter, nemt at installere og koster 400–800 kr./m² inkl. termostat og montering. For 25 m² betyder det 10.000–20.000 kr. ekstra.

**Vandbåren gulvvarme:** Kræver forbindelse til varmesystem og er mest rentabelt i nybyggeri eller ved store arealer. Koster 600–1.000 kr./m² inkl. installation.

Har du et [badeværelse](/badevaerelse), et køkken eller en entre på 25 m², er el-gulvvarme under klinker næsten altid en god investering — både komfortmæssigt og for boligens værdi.

## Beregn din pris

Estimaterne på denne side er baseret på 25 m² med standard klinker, ingen afretning og ingen gulvvarme. Har du andre krav, kan du tilpasse alle parametre i [klinkberegneren](/klinker) og få et estimat, du kan bruge som udgangspunkt, inden du indhenter tilbud.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(18000)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(32000)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Areal", "25 m²"],
        ["Kvalitet", "Standard"],
        ["Gulvvarme", "Ingen"],
        ["Afretning", "Nej"],
        ["Inkl. klinker", "Ja"],
        ["Midpoint", `${fmt(25000)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Klinker25KvmPage() {
  return (
    <IntentPageLayout
      h1="Lægning af klinker på 25 m² — pris og estimat 2026"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/klinker"
      calculatorLabel="Tilpas din klinkepris"
    />
  );
}
