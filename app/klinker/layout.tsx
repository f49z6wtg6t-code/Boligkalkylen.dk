import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Lægning af klinker — pris pr. m² 2026 | Beregn din pris",
  description:
    "Beregn prisen på lægning af klinker i 2026. Et færdigt klinkegulv inkl. materialer koster typisk 800–1.800 kr./m². Gratis estimat på 1 minut.",
  alternates: { canonical: "https://boligkalkylen.dk/klinker" },
  openGraph: {
    title: "Lægning af klinker — pris pr. m² 2026 | Beregn din pris",
    description:
      "Beregn prisen på lægning af klinker inkl. materialer, afretning og gulvvarme. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/klinker",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lægning af klinker — pris pr. m² 2026",
    description: "Beregn prisen på klinkelægning på 1 minut. Gratis og uforpligtende.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Klinkeberegner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/klinker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis klinkeberegner — beregn prisen på lægning af klinker inkl. arbejdsløn, materialer, afretning og gulvvarme. Danske 2026-priser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-klinker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
