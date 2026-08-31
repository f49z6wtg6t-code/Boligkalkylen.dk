import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gulvafslibning lakering beregner",
  url: "https://boligkalkylen.dk/gulvafslibning-lakering",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Hvad er forskellen på lakering, oliering og sæbebehandling?",
    answer:
      "Lakering danner en hård, forseglende film oven på træet og holder 10–15 år med minimal vedligeholdelse. Oliering trænger ned i træet og giver et mere naturligt udtryk, men skal fornyes hvert 3–5 år. Sæbebehandling er den blideste behandling og kræver løbende vedligeholdelse med sæbevask. Til familier med børn eller kæledyr anbefales lakering generelt pga. holdbarhed.",
  },
  {
    question: "Hvad er inkluderet i prisen for gulvafslibning med lakering?",
    answer:
      "Prisen inkluderer typisk: afdækning af rum, grovslibning, mellemslibning og finslibning, støvsugning, spartling af ridser og huller samt 2–3 lag lak. Møbeltransport og afmontering af lister faktureres ofte separat.",
  },
  {
    question: "Hvornår er det nødvendigt at slibe gulvet?",
    answer:
      "Gulvet bør slibes, når overfladen er mat og ridset, når pletter ikke kan fjernes med rengøring, eller når træet begynder at splinte. Et godt tegn er, om vand stadig perler på overfladen — gør det ikke det, er beskyttelseslaget brugt op.",
  },
  {
    question: "Hvor mange lag lak skal der på gulvet?",
    answer:
      "Standard er 3 lag lak: et grundlag og to toplag. Det første lag åbner træporerne og skal slibes let inden næste lag. Med 3 lag opnår du den holdbarhed, der forventes af en professionel gulvbehandling.",
  },
  {
    question: "Kan man bo i huset, mens gulvet lakeres?",
    answer:
      "Det er muligt at bo i huset, men ubelejligt. Hvert lag lak kræver ca. 8–12 timers tørretid, og du bør ikke gå på gulvet i denne periode. Lugt fra opløsningsmidler (ved traditionel lak) kræver god udluftning. Vandbaserede lak har væsentligt mindre lugt og kortere tørretid.",
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
## Gulvafslibning og lakering — hvad koster det?

Gulvafslibning med lakering er den mest populære måde at renovere et slidt trægulv på. Processen fjerner det øverste lag træ og gammel overflade og giver gulvet en ny, holdbar beskyttelse. For et **50 m² gulv i god stand med 3 lags lakering** kan du forvente en pris på **8.500–11.500 kr.**

## Hvad er inkluderet i prisen?

Når en gulvsliber afgiver et tilbud på afslibning og lakering, inkluderer det typisk:

- **Afdækning** af vægge, tilstødende rum og inventar
- **Grovslibning** der fjerner gammel lak, fernis eller olie
- **Mellemslibning og finslibning** til jævn og ensartet overflade
- **Spartling** af synlige søm, ridser og mindre huller
- **3 lag lak** — grundlag + 2 toplag med let slibning imellem

Afmontering af lister og møbeltransport faktureres typisk separat. Husk at medregne dette, hvis du indhenter tilbud.

## Hvad bestemmer prisen på lakering?

Prisen varierer af tre primære årsager:

**1. Gulvets tilstand**
Et gulv i god stand kræver kun en grovslibning og behandling. Er gulvet i dårlig stand med dybe ridser, ujævnheder eller rester af gammel polyurethanlak, kræves ekstra slibegange og spartling — det øger prisen med 20–40%.

**2. Laktype**
Vandbaseret lak er den mest almindelige i dag. Den er lugtsvag, tørrer hurtigt og er miljøvenlig. Oliemodificeret lak er mere holdbar under hårdt slid og foretrækkes til kontorer og erhverv. Prisen på selve lakken er ikke den store faktor — det er antallet af arbejdsgange, der tæller.

**3. Gulvareal og tilgængelighed**
Opstarten (transport, opsætning og afdækning) koster det samme uanset gulvets størrelse. Derfor er prisen pr. m² relativt høj på små arealer (under 30 m²) og falder markant på større gulve.

## Lakering kontra olie og sæbe

Valget af efterbehandling er det, der i høj grad definerer gulvets fremtidige vedligeholdelse:

| Behandling | Holdbarhed | Vedligeholdelse | Totalomkostning over 15 år |
|---|---|---|---|
| Lakering | 10–15 år | Meget lav | Lav |
| Oliering | 3–5 år | Løbende | Middel–høj |
| Sæbebehandling | 2–4 år | Konstant | Høj |

Lakering er det bedste valg, hvis du ønsker et gulv med minimal løbende vedligeholdelse og lang levetid. Det er særligt velegnet til familier med børn, kæledyr eller erhvervslokaler med meget trafik.

Oliering giver et smukt, naturligt udtryk, hvor træets årer fremstår mere levende. Ulempen er, at du skal behandle gulvet igen hvert 3–5 år — og eventuelt vedligeholde med olie en gang om året. Over en 15-årig periode kan totalomkostningen ved oliering overstige lakeringsomkostningen.

## Hvornår bør du vælge lakering?

Lakering er det rigtige valg, når:

- Du vil have et gulv, der kan modstå intensiv brug uden løbende vedligeholdelse
- Du har børn eller kæledyr, der slider hårdt på overfladen
- Du lejer din bolig ud og ønsker et holdbart, nemt at vedligeholde gulv
- Du har et erhvervslokale med meget færdsel

Olie og sæbe er bedre, hvis du foretrækker et levende, naturligt udtryk og er villig til at vedligeholde gulvet regelmæssigt — eller hvis du ønsker at reparere lokale skader uden at skulle sætte hele gulvet i stand.

## Beregn din pris

Estimaterne på denne side er baseret på et 50 m² gulv i god stand med standard 3-lags lakering. Har du et andet areal, anden tilstand eller andet behandlingsønske, kan du justere alle parametre i [gulvberegneren](/gulv) og få et præcist estimat tilpasset dit projekt.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(8500)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(11500)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Gulvareal", "50 m²"],
        ["Tilstand", "God stand"],
        ["Efterbehandling", "Lakering (3 lag)"],
        ["Holdbarhed", "10–15 år"],
        ["Midpoint", `${fmt(10000)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function GulvafslibningLakeringPage() {
  return (
    <IntentPageLayout
      h1="Gulvafslibning og lakering — hvad koster det?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/gulv"
      calculatorLabel="Juster dit estimat i beregneren"
    />
  );
}
