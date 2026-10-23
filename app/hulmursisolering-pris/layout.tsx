import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hulmursisolering pris 2026 — hvad koster det?",
  description:
    "Hulmursisolering koster typisk 130–180 kr./m² inkl. moms. For et parcelhus med 100 m² ydervæg er prisen ca. 13.000–18.000 kr. Se besparelse, tilbagebetalingstid og tilskud.",
  alternates: { canonical: "https://boligkalkylen.dk/hulmursisolering-pris" },
  openGraph: {
    title: "Hulmursisolering pris 2026 — hvad koster det?",
    description: "Priser på hulmursisolering 2026. Se besparelse og beregn dit estimat gratis.",
    url: "https://boligkalkylen.dk/hulmursisolering-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hulmursisolering pris 2026 — hvad koster det?",
    description: "Priser på hulmursisolering 2026. Se besparelse og beregn dit estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
