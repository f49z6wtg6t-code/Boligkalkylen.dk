import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Sun, Bath, Paintbrush, FlipVertical, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisberegner: Solceller & badeværelse | BoligKalkylen.dk",
  description:
    "Beregn prisen på solceller eller badeværelse på 1 minut. Gratis og uforpligtende — ingen kontaktoplysninger kræves.",
  openGraph: {
    title: "Gratis prisberegner: Solceller & badeværelse 2026",
    description:
      "Beregn prisen på dit næste boligprojekt på 1 minut — gratis og uforpligtende.",
    url: "https://boligkalkylen.dk",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gratis prisberegner: Solceller & badeværelse 2026",
    description:
      "Beregn prisen på dit næste boligprojekt på 1 minut — gratis og uforpligtende.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BoligKalkylen.dk",
  url: "https://boligkalkylen.dk",
  description: "Gratis prisberegnere til solceller og badeværelsesrenovering",
  address: {
    "@type": "PostalAddress",
    addressLocality: "København",
    addressCountry: "DK",
  },
  priceRange: "Fra 80.000 kr.",
  image: "https://www.boligkalkylen.dk/logo-header.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    reviewCount: "20",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mette K." },
      reviewBody:
        "Beregneren viste at vi sparer næsten 5.000 kr. om året på solceller. Nu har vi fået tilbud.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Thomas B." },
      reviewBody:
        "Fik et realistisk prisestimat på badeværelset på under et minut.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Lars M." },
      reviewBody:
        "Simpel og ærlig. Ingen spam, ingen salgsopkald — bare et estimat.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Camilla F." },
      reviewBody:
        "Tog fem minutter og vi fik et estimat vi faktisk kunne bruge til noget.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Hanne B." },
      reviewBody:
        "Badeværelsesestimatet var lige hvad vi havde brug for inden vi mødte håndværkeren.",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
    },
  ],
};

const REVIEWS = [
  { stars: 5, quote: "Jeg troede solceller var for dyre til vores hus — men beregneren viste at vi sparer næsten 5.000 kr. om året. Nu har vi fået tilbud.", name: "Mette K., Aarhus" },
  { stars: 5, quote: "Super nemt at bruge. Fik et realistisk prisestimat på badeværelset på under et minut, og tilbuddet matchede faktisk beregningen.", name: "Thomas B., København" },
  { stars: 3, quote: "Nogenlunde præcis beregning, men jeg ville ønske der var flere detaljer om tagtype og skyggeforhold. Mangler lidt dybde.", name: "Lone H., Odense" },
  { stars: 5, quote: "Vi ville gerne have solceller men vidste ikke om vores tag var stort nok. Beregneren forklarede det hele — perfekt.", name: "Anders R., Aalborg" },
  { stars: 4, quote: "Badeværelset skulle totalrenoveres og vi anede ikke hvad det kostede. BoligKalkylen gav os et ærligt interval at arbejde med.", name: "Sofie M., Esbjerg" },
  { stars: 5, quote: "Hurtig, overskuelig og præcis. Fik beregnet tilbagebetalingstiden på vores solcelleanlæg og bestilte tilbud samme dag.", name: "Rasmus T., Randers" },
  { stars: 3, quote: "Estimatet var lidt lavere end det tilbud vi fik i virkeligheden. Men det er et godt udgangspunkt — bare regn med lidt ekstra.", name: "Kirsten L., Horsens" },
  { stars: 4, quote: "Vi sidder i et parcelhus fra 70'erne og ville vide om solceller gav mening. Det gør det — og vi er nu i gang med processen.", name: "Henrik N., Vejle" },
  { stars: 5, quote: "Tog fem minutter og vi fik et estimat vi faktisk kunne bruge til noget. Langt bedre end at ringe rundt til håndværkere.", name: "Camilla F., Kolding" },
  { stars: 4, quote: "Vores badeværelse er kun 4 kvm men beregneren tog højde for det. Estimatet var realistisk og hjælpsomt.", name: "Jens P., Silkeborg" },
  { stars: 5, quote: "Ikke nok med at vi fik et godt estimat — vi fik også forklaret hvad der påvirker prisen. Meget lærerigt.", name: "Maria S., Fredericia" },
  { stars: 2, quote: "Siden virkede ikke helt på min telefon — nogle knapper var svære at trykke på. Fungerede bedre på computer.", name: "Ole V., Herning" },
  { stars: 4, quote: "Vi overvejede om vi skulle flytte VVS i badeværelset — beregneren viste hvad det ville koste ekstra. God hjælp til beslutningen.", name: "Pia A., Næstved" },
  { stars: 5, quote: "Simpel og ærlig. Ingen spam, ingen salgsopkald — bare et estimat. Sendte forespørgsel og hørte fra dem næste dag.", name: "Lars M., Helsingør" },
  { stars: 4, quote: "Bor i lejlighed med fælles tag — beregneren hjalp os med at forstå at solceller ikke var en mulighed for os. Ærligt svar.", name: "Nina C., Roskilde" },
  { stars: 3, quote: "Fin beregner men savner mulighed for at indtaste mit faktiske elforbrug måned for måned. Gennemsnittet passer ikke altid.", name: "Søren K., Slagelse" },
  { stars: 5, quote: "Badeværelsesestimatet var lige hvad vi havde brug for inden vi mødte håndværkeren. Vi stod meget stærkere i dialogen.", name: "Hanne B., Hillerød" },
  { stars: 4, quote: "Brugte beregneren to gange — én gang for standardmaterialer og én gang for premium. God måde at se hvad ekstra koster.", name: "Michael D., Viborg" },
  { stars: 5, quote: "Hurtig bekræftelse efter at vi sendte vores forespørgsel. Professionelt og imødekommende fra start.", name: "Anette W., Holstebro" },
  { stars: 4, quote: "Vi havde fået tre vidt forskellige tilbud og vidste ikke hvad der var rimeligt. Beregneren satte det hele i perspektiv.", name: "Claus J., Frederikshavn" },
];

export default function Home() {
  return (
    <>
    <Script
      id="json-ld-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
    />
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#F5F0E8", backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="w-20" />
          <Link href="/">
            <Image
              src="/logo-header.png"
              alt="BoligKalkylen"
              width={600}
              height={160}
              className="h-32 w-auto sm:h-40"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>
          <Link
            href="/artikler"
            className="text-sm font-semibold rounded-full px-4 py-2 transition-colors"
            style={{ backgroundColor: "#3A6B2A", color: "#FFFFFF" }}
          >
            Artikler
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold mb-6"
            style={{
              backgroundColor: "#3A6B2A",
              color: "#FFFFFF",
            }}
          >
            Gratis estimat — ingen forpligtelse
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Gratis prisberegnere til dit næste boligprojekt — se estimat på 1 minut
          </h1>

          <p className="text-lg font-medium mb-10" style={{ color: "#1E1A14" }}>
            Få et ærligt prisestimat på solceller eller badeværelse — på under 1 minut.
          </p>

        </div>
      </section>

      {/* Sådan virker det */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { num: "1", text: "Vælg beregner" },
            { num: "2", text: "Se dit estimat — ingen kontaktinfo kræves" },
            { num: "3", text: "Send forespørgsel — svar inden 24 timer" },
          ].map((step) => (
            <div
              key={step.num}
              className="flex gap-4 items-start rounded-2xl p-5"
              style={{ backgroundColor: "#EDE8DC", border: "1px solid #C8C0B4" }}
            >
              <span
                className="text-sm font-bold flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#3A6B2A", color: "#FFFFFF" }}
              >
                {step.num}
              </span>
              <p className="text-sm font-medium leading-relaxed" style={{ color: "#2D3A28" }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator cards */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              href: "/solceller",
              icon: <Sun size={24} color="#FFFFFF" strokeWidth={1.5} />,
              title: "Solcelleberegner",
              desc: "Beregn din årlige besparelse, tilbagebetalingstid og CO₂-reduktion baseret på dit elforbrug og tagforhold.",
              example: "Eks: 4.000 kWh/år → ca. 4.700 kr./år i besparelse",
            },
            {
              href: "/badevaerelse",
              icon: <Bath size={24} color="#FFFFFF" strokeWidth={1.5} />,
              title: "Badeværelsesberegner",
              desc: "Få et realistisk prisestimat på din badeværelsesrenovering — tilpasset størrelse, omfang og materialer.",
              example: "Eks: 5–10 kvm totalrenovering → ca. 130.000–260.000 kr.",
            },
            {
              href: "/maler",
              icon: <Paintbrush size={24} color="#FFFFFF" strokeWidth={1.5} />,
              title: "Malerberegner",
              desc: "Beregn prisen på indvendig maling af din bolig baseret på areal, omfang og overfladernes tilstand.",
              example: "Eks: 80 m² med spartling → ca. 20.000–32.000 kr.",
            },
            {
              href: "/gulv",
              icon: <FlipVertical size={24} color="#FFFFFF" strokeWidth={1.5} />,
              title: "Gulvafslibningsberegner",
              desc: "Beregn prisen på afslibning og lakering af trægulv baseret på areal, gulvets stand og efterbehandling.",
              example: "Eks: 50 m² god stand + lakering → ca. 7.000–8.500 kr.",
            },
            {
              href: "/isolering",
              icon: <Layers size={24} color="#FFFFFF" strokeWidth={1.5} />,
              title: "Isoleringsberegner",
              desc: "Beregn pris og årlig varmebesparelse ved efterisolering af loft, hulmur eller ydervæg.",
              example: "Eks: 100 m² loftisolering → ca. 2.500–4.000 kr./år i besparelse",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-3xl p-8 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #2D5220 0%, #3A6B2A 60%, #4a8a36 100%)",
                border: "1px solid #2D5220",
                boxShadow: "0 8px 32px rgba(45,82,32,0.25)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                {card.icon}
              </div>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#FFFFFF" }}
              >
                {card.title}
              </h2>
              <p className="text-sm mb-3 flex-1" style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                {card.desc}
              </p>
              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                {card.example}
              </p>
              <span
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3 px-5 text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                Beregn nu
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews ticker */}
      <section style={{ paddingTop: 32, paddingBottom: 32 }}>
        <p className="text-sm text-center" style={{ color: "#9E9486", marginBottom: "0.75rem" }}>
          Hvad siger andre boligejere?
        </p>
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={i}
                style={{
                  background: "#EDE8DC",
                  border: "1px solid #D4CCC0",
                  borderRadius: 12,
                  padding: 14,
                  minWidth: 220,
                  maxWidth: 260,
                  flexShrink: 0,
                }}
              >
                <div style={{ color: "#C9F031", fontSize: "0.75rem", marginBottom: "0.4rem" }}>{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div>
                <p style={{ color: "#1E1A14", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p style={{ color: "#6B6356", fontSize: "0.7rem" }}>{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-6" style={{ borderColor: "#D4CCC0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm" style={{ color: "#6B6356" }}>
            © {new Date().getFullYear()} BoligKalkylen.dk — Drevet af{" "}
            <a href="https://motivobyg.dk" style={{ color: "#4A4540" }}>
              Motivo Gruppen
            </a>
          </p>
          <p className="text-xs mt-1" style={{ color: "#B0A898" }}>
            Beregningerne opdateres løbende med danske markedspriser og energidata.
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}
