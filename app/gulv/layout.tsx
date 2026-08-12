import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Gulvafslibning pris 2026 — gratis beregner",
  description:
    "Beregn prisen på gulvafslibning og lakering af dit trægulv. Baseret på m² og gulvets tilstand. Danske 2026-priser. Gratis estimat på 1 minut.",
  alternates: { canonical: "https://boligkalkylen.dk/gulv" },
  openGraph: {
    title: "Gulvafslibning pris 2026 — gratis beregner",
    description:
      "Beregn prisen på gulvafslibning og lakering på 1 minut. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/gulv",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gulvafslibning pris 2026 — gratis beregner",
    description:
      "Beregn prisen på gulvafslibning og lakering på 1 minut. Gratis og uforpligtende.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gulvafslibning beregner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/gulv",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis gulvberegner — beregn prisen på gulvafslibning og lakering, oliering eller sæbebehandling. Baseret på danske 2026-priser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-gulv"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
