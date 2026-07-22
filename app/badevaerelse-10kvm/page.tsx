import IntentPageLayout from "@/components/intent-page-layout";
import { calculateBadevaerelse } from "@/lib/calculators/badevaerelse";

const result = calculateBadevaerelse({
  stoerrelse: "mellem",
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
  name: "Badeværelseberegner — standard badeværelse 5–10 kvm",
  url: "https://boligkalkylen.dk/badevaerelse-10kvm",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad koster en totalrenovering af et badeværelse på 5–10 kvm?",
    answer: `En totalrenovering af et standard badeværelse på 5–10 kvm koster typisk ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. med standard materialer og uden VVS-flytning. Det er det mest almindelige scenarie i danske parcelhuse og rækkehuse.`,
  },
  {
    question: "Hvad koster et badeværelse pr. kvm på 5–10 kvm?",
    answer:
      "For et totalrenoveret badeværelse på 5–10 kvm er prisen typisk 18.000–24.000 kr. pr. kvm med standard materialer. Prisen pr. kvm falder relativt set i forhold til et lille badeværelse, fordi faste udgifter som VVS-stikledninger og el fordeles over et større areal.",
  },
  {
    question: "Hvor lang tid tager en totalrenovering af et badeværelse på 5–10 kvm?",
    answer:
      "En totalrenovering tager typisk 5–7 uger fra opstart til færdigt resultat. Husk at importerede fliser kan have 4–8 ugers leveringstid — bestil materialer, inden du bekræfter startdatoen med håndværkeren.",
  },
  {
    question: "Hvad koster det ekstra at flytte VVS på 5–10 kvm badeværelse?",
    answer:
      "Flytning af eksisterende VVS-stikledninger koster typisk 15.000–35.000 kr. afhængigt af omfanget. Skal du have et nyt brusekabine-afløb eller flytte toilettet til ny placering, kan det blive i den høje ende.",
  },
  {
    question: "Kan man renovere et 5–10 kvm badeværelse selv (gør-det-selv)?",
    answer:
      "Nedrivning og malerarbejde kan du selv udføre uden autorisation. VVS og el kræver autoriserede håndværkere. Selv-nedrivning kan spare 5.000–10.000 kr., men vær opmærksom på asbest i huse fra før 1988.",
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
## Hvad koster et badeværelse på 5–10 kvm?

Et badeværelse på 5–10 kvm er det mest almindelige i danske hjem. Det er stort nok til bruseniche, toilet og håndvask med komfort — og typisk nok plads til et luksus-overblik, men stadig inden for et realistisk budget.

Med **standard materialer** og **totalrenovering uden VVS-flytning** koster det typisk **${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr.** Projektet tager ca. ${result.uger} uger fra opstart til nøglefærdigt badeværelse.

## Hvad er inkluderet i prisen?

En totalrenovering på 5–10 kvm inkluderer typisk:

- **Nedrivning** af eksisterende fliser og inventar
- **VVS** — afløb, rør og gulvvarme (uden flytning af stikledninger)
- **El** — belysning, stikkontakter og eventuel ventilation
- **Membran** — obligatorisk vandtæt membran på gulv og vægge (kræves af BR18)
- **Fliser** — standard kvalitet på gulv og vægge
- **Sanitet** — toilet, håndvask og brusekabine eller badekar
- **Maler og afslutning**

## Prisoversigt: badeværelse 5–10 kvm

| Scenarie | Estimat |
|---|---|
| Overfladisk (fliser + inventar) | 110.000–145.000 kr. |
| Totalrenovering, standard | ${fmt(result.prisLav)}–${fmt(result.prisHoej)} kr. |
| Totalrenovering, premium | 225.000–320.000 kr. |
| Totalrenovering inkl. VVS-flytning | 185.000–295.000 kr. |

## De vigtigste prispåvirkere

**1. VVS-flytning**
Beholder du eksisterende placering af toilet, håndvask og bruseniche, sparer du 15.000–35.000 kr. Flytning kræver åbning af gulv eller vægge og er den dyreste enkeltstående post i en badeværelsesrenovering.

**2. Flisemønster**
Store fliser (60×60 cm) lægges hurtigere end mosaik. Mønsterflisning (f.eks. fiskebens) øger håndværkertiden med 20–40% og dermed prisen.

**3. Leveringstid på materialer**
Importerede fliser fra Spanien, Portugal og Belgien har typisk 4–8 ugers leveringstid. Bestil materialer, inden du bekræfter startdatoen med håndværkeren — ellers kan projektet stoppe midt i.

## Sådan bruger du beregneren

Beregneren til højre viser estimatet for et standard badeværelse på 5–10 kvm med totalrenovering og standard materialer. Klik på "Juster dit badeværelsesbudget" for at tilpasse til dit specifikke projekt.
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

export default function Badevaerelse10KvmPage() {
  return (
    <IntentPageLayout
      h1="Badeværelse 5–10 kvm — hvad koster en renovering?"
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
