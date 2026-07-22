import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Isoleringsberegner 2026 — hvad koster efterisolering?",
  description:
    "Beregn prisen på efterisolering af loft eller hulmur. Se din årlige varmebesparelse og tilbagebetalingstid. Gratis estimat.",
  openGraph: {
    title: "Isoleringsberegner 2026 — hvad koster efterisolering?",
    description:
      "Beregn prisen på efterisolering og se din varmebesparelse. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/isolering",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Isoleringsberegner 2026 — hvad koster efterisolering?",
    description:
      "Beregn prisen på efterisolering og se din varmebesparelse. Gratis og uforpligtende.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Isoleringsberegner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/isolering",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis isoleringsberegner — beregn prisen på efterisolering af loft eller hulmur og se din årlige varmebesparelse. Danske 2026-priser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-isolering"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
