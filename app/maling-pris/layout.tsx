import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvad koster maling af hus? Priser 2026",
  description:
    "Få overblik over prisen på indvendig maling. En 80 m² bolig med vægge og loft i god stand koster typisk 12.000–22.000 kr. inkl. moms. Se prisoversigt og beregn dit eget estimat.",
  alternates: { canonical: "https://boligkalkylen.dk/maling-pris" },
  openGraph: {
    title: "Hvad koster maling af hus? Priser 2026",
    description:
      "Priser på indvendig maling 2026. Se typiske priser og beregn dit eget estimat gratis.",
    url: "https://boligkalkylen.dk/maling-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hvad koster maling af hus? Priser 2026",
    description:
      "Priser på indvendig maling 2026. Se typiske priser og beregn dit eget estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
