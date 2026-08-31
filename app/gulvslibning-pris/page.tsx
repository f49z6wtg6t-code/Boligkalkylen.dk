import IntentPageLayout from "@/components/intent-page-layout";

function fmt(n: number) {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gulvslibning pris beregner",
  url: "https://boligkalkylen.dk/gulvslibning-pris",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
};

const faqItems = [
  {
    question: "Er der forskel på gulvslibning og gulvafslibning?",
    answer:
      "Nej — gulvslibning og gulvafslibning dækker over den samme proces: fjernelse af det øverste slid- og overfladelag fra et trægulv med specialmaskiner. Begge begreber bruges i daglig tale og i håndværkerpriser om det samme arbejde.",
  },
  {
    question: "Hvad bestemmer prisen på gulvslibning?",
    answer:
      "De tre vigtigste faktorer er: (1) gulvets tilstand — jo mere slidt og behandlet, jo mere arbejde kræves, (2) valg af efterbehandling — lakering, oliering eller sæbe, og (3) arealets størrelse, da der betales en fast opstartspris uanset gulvets størrelse.",
  },
  {
    question: "Kan man spare penge på efterbehandlingen?",
    answer:
      "Det er muligt at vælge en billigere behandling som sæbe frem for lakering, men totalomkostningen over tid bliver ofte højere, da sæbebehandlede gulve skal vedligeholdes langt hyppigere. Sparingen på første behandling modsvares typisk af 3–5 ekstra behandlinger over en 15-årig periode.",
  },
  {
    question: "Hvornår er et trægulv slidt op?",
    answer:
      "Et gulv er slidt op, når der ikke er tilstrækkelig resttykkelse på lamellerne — typisk under 3 mm over not og fjeder. Det kan ses på synlige søm i gulvoverfladen eller mærkes ved, at gulvet giver hule lyde eller er ujævnt. En gulvsliber kontrollerer dette ved besigtigelse med en nål i fugespalterne.",
  },
  {
    question: "Er gulvslibning det samme som at polere gulvet?",
    answer:
      "Nej. Gulvslibning er en grundig mekanisk bearbejdning, der fjerner det øverste lag træ med grove slibemaskiner. Polering er en overfladisk behandling af et allerede behandlet gulv og fjerner ikke slid eller ridser i selve træet. Polering forlænger overfladens levetid marginalt — slibning fornyer gulvet fundamentalt.",
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
## Gulvslibning — hvad er det, og hvad koster det?

Gulvslibning er en mekanisk renovering af trægulve, hvor specialmaskiner fjerner det øverste slid- og overfladelag og efterlader en ren, jævn overflade klar til ny behandling. Det er den eneste metode, der effektivt fjerner dybe ridser, misfarvning og gammel lak eller olie — og det giver gulvet en ny levetid på 10–15 år.

For et **80 m² gulv i middel stand med 3-lags lakering** kan du forvente en pris på **14.500–18.500 kr.** Det svarer til ca. 170–210 kr./m² alt inklusiv.

## Hvad indebærer selve processen?

En professionel gulvslibning foregår i flere trin:

1. **Afdækning** — vægge, døre og tilstødende rum beskyttes mod støv
2. **Grovslibning** — kraftig slibemaskine fjerner gammel overflade og ujævnheder
3. **Kantslibning** — hjørner og kanter behandles med en separat kantslibemaskine
4. **Mellemslibning** — finere korn udglatter overfladen og fjerner mærker fra grovslibningen
5. **Støvsugning og spartling** — søm, fuger og huller udfyldes
6. **Finslibning** — gulvet gøres klar til behandling
7. **Efterbehandling** — 2–3 lag lak, olie eller sæbe påføres

Processen tager typisk 2–4 dage afhængigt af areal og tørretider.

## Hvad bestemmer prisen?

**Tilstand er den primære prisfaktor.** Et gulv i god stand kræver færre slibegange og ingen ekstra spartling. Et gulv med dybe ridser, rester af gammel polyurethanlak eller uens behandling kræver ekstra arbejde og driver prisen op.

**Arealets størrelse** påvirker prisen pr. m² — ikke fordi store gulve er billigere at slibbe, men fordi opstartsprisen på 1.800–2.500 kr. fordeles over et større areal.

**Efterbehandling** er et selvstændigt valg med konsekvenser for både pris og fremtidig vedligeholdelse.

## Lakering, oliering eller sæbebehandling?

Valget af efterbehandling er vigtigt — ikke bare for prisen, men for hvad du kan forvente i de kommende år:

**Lakering** giver en hård, forseglende overflade der holder 10–15 år med minimal vedligeholdelse. Det er det bedste valg, hvis du vil have et gulv, der kan tåle intensiv brug uden løbende pleje.

**Oliering** trænger ned i træet og bevarer et levende, naturligt udseende. Ulempen er, at gulvet skal behandles på ny hvert 3–5 år — og at lokale skader er sværere at undgå, da olien ikke forsegler overfladen.

**Sæbebehandling** er den mildeste behandling og kræver regelmæssig vedligeholdelse med sæbevask. Den er bedst egnet til dem, der vil have et meget naturligt udtryk og ikke har noget imod løbende pleje.

## Hvornår bør du vælge gulvslibning frem for nyt gulv?

Gulvslibning er næsten altid billigere end at lægge nyt gulv — og giver et bedre resultat, hvis det originale gulv er i behold. Et massivt trægulv kan typisk slibes 5–8 gange over sin levetid. Selv et gulv med synlige ridser og mat overflade er sjældent for dårligt til slibning.

Nyt gulv er relevant, hvis:
- Gulvet har strukturelle skader (råd, svamp, store hulrum)
- Resttykkelsen er under minimum (under 3 mm over not og fjeder)
- Gulvet er laminat eller vinyl (disse kan ikke slibes)
- Det er billigst at lægge nyt sammenlignet med de nødvendige reparationer

Beregn dit eget estimat i [gulvberegneren](/gulv) — tilpas areal, tilstand og efterbehandling og få et interval du kan bruge, inden du indhenter tilbud.
`;

const CalcDisplay = (
  <div>
    <div className="mb-3">
      <div className="text-xs mb-1" style={{ color: "#6B6356" }}>Estimeret pris</div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(14500)}
        </span>
        <span className="text-2xl" style={{ color: "#4A7A3A" }}>–</span>
        <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "var(--font-dm-sans)", color: "#3A6B2A" }}>
          {fmt(18500)}
        </span>
        <span className="text-base" style={{ color: "#2D5220" }}>kr</span>
      </div>
    </div>
    <div className="pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: "1px solid #D4CCC0" }}>
      {[
        ["Gulvareal", "80 m²"],
        ["Tilstand", "Middel stand"],
        ["Efterbehandling", "Lakering (3 lag)"],
        ["Holdbarhed", "10–15 år"],
        ["Midpoint", `${fmt(16500)} kr`],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <span style={{ color: "#6B6356" }}>{k}</span>
          <span className="font-medium" style={{ color: "#1E1A14" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function GulvslibningPrisPage() {
  return (
    <IntentPageLayout
      h1="Gulvslibning pris — hvad koster det at sætte gulvet i stand?"
      intro={intro}
      calculator={CalcDisplay}
      faqItems={faqItems}
      faqJsonLd={faqJsonLd}
      webAppJsonLd={webAppJsonLd}
      calculatorHref="/gulv"
      calculatorLabel="Beregn din gulvslibningspris"
    />
  );
}
