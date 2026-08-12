import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Malerberegner 2026 — hvad koster maling af bolig?",
  description:
    "Beregn prisen på indvendig maling af din bolig på 1 minut. Baseret på m², tilstand og omfang. Danske 2026-priser. Gratis og uforpligtende.",
  alternates: { canonical: "https://boligkalkylen.dk/maler" },
  openGraph: {
    title: "Malerberegner 2026 — hvad koster maling af bolig?",
    description:
      "Beregn prisen på indvendig maling af din bolig på 1 minut. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/maler",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Malerberegner 2026 — hvad koster maling af bolig?",
    description:
      "Beregn prisen på indvendig maling af din bolig på 1 minut. Gratis og uforpligtende.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Malerberegner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/maler",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis malerberegner — beregn prisen på indvendig maling af din bolig baseret på areal, overfladernes tilstand og omfang. Danske 2026-priser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-maler"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
