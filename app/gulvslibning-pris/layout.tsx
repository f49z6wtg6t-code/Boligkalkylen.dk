import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gulvslibning pris 2026 — hvad koster det?",
  description:
    "Hvad koster gulvslibning? Et 80 m² gulv i middel stand koster typisk 14.500–18.500 kr. inkl. moms. Forstå processen, priselementerne og vælg den rigtige efterbehandling.",
  alternates: { canonical: "https://boligkalkylen.dk/gulvslibning-pris" },
  openGraph: {
    title: "Gulvslibning pris 2026 — hvad koster det?",
    description:
      "Priser på gulvslibning 2026. Forstå hvad der påvirker prisen og beregn dit estimat gratis.",
    url: "https://boligkalkylen.dk/gulvslibning-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gulvslibning pris 2026 — hvad koster det?",
    description:
      "Priser på gulvslibning 2026. Forstå hvad der påvirker prisen og beregn dit estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
