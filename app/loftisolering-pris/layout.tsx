import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvad koster loftisolering? Priser 2026",
  description:
    "Efterisolering af loft koster typisk 90–220 kr./m² inkl. moms. Et typisk parcelhus med 100 m² loft koster 9.000–22.000 kr. Se hvad tykkelse og tilskud gør ved prisen.",
  alternates: { canonical: "https://boligkalkylen.dk/loftisolering-pris" },
  openGraph: {
    title: "Hvad koster loftisolering? Priser 2026",
    description: "Priser på loftisolering 2026. Se tilskudsmuligheder og beregn dit estimat gratis.",
    url: "https://boligkalkylen.dk/loftisolering-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hvad koster loftisolering? Priser 2026",
    description: "Priser på loftisolering 2026. Se tilskudsmuligheder og beregn dit estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
