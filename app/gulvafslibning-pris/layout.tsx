import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvad koster gulvafslibning? Priser 2026",
  description:
    "Få overblik over prisen på gulvafslibning. Et 80 m² gulv i middel stand koster typisk 14.500–18.500 kr. inkl. moms. Se prisoversigt og beregn dit eget estimat.",
  alternates: { canonical: "https://boligkalkylen.dk/gulvafslibning-pris" },
  openGraph: {
    title: "Hvad koster gulvafslibning? Priser 2026",
    description:
      "Priser på gulvafslibning 2026. Se typiske priser og beregn dit eget estimat gratis.",
    url: "https://boligkalkylen.dk/gulvafslibning-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hvad koster gulvafslibning? Priser 2026",
    description:
      "Priser på gulvafslibning 2026. Se typiske priser og beregn dit eget estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
