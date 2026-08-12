import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Solcelleberegner 2026 — beregn din besparelse gratis",
  description:
    "Se din årlige besparelse, tilbagebetalingstid og CO₂-reduktion ved solceller. Danske 2026-priser og elafgiftsregler. Gratis.",
  alternates: { canonical: "https://boligkalkylen.dk/solceller" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Solcelleberegner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/solceller",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis solcelleberegner — beregn din årlige besparelse, tilbagebetalingstid og CO₂-reduktion baseret på 2026-priser og elafgiftsregler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-solceller"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
