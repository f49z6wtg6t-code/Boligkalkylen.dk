import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Badeværelse prisberegner 2026 — hvad koster din renovering?",
  description:
    "Prisestimat på badeværelsesrenovering efter størrelse, omfang og materialer. Danske håndværkerpriser 2026. Gratis og uforpligtende.",
  alternates: { canonical: "https://boligkalkylen.dk/badevaerelse" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Badeværelsesberegner — BoligKalkylen.dk",
  url: "https://boligkalkylen.dk/badevaerelse",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  description:
    "Gratis badeværelsesberegner — få et realistisk prisestimat på din renovering baseret på størrelse, omfang og materialer. Danske håndværkerpriser 2026.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-badevaerelse"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
