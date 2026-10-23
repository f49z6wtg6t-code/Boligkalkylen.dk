import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maler pris pr. m² 2026 — hvad koster en maler?",
  description:
    "Hvad koster en maler pr. m² i 2026? Standard indvendig maling koster 75–160 kr./m² inkl. materialer. Se timepris, dagspris og hvad der påvirker prisen.",
  alternates: { canonical: "https://boligkalkylen.dk/maler-pris-m2" },
  openGraph: {
    title: "Maler pris pr. m² 2026 — hvad koster en maler?",
    description: "Maler pris pr. m² 2026. Se timepris, dagspris og beregn dit estimat gratis.",
    url: "https://boligkalkylen.dk/maler-pris-m2",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Maler pris pr. m² 2026 — hvad koster en maler?",
    description: "Maler pris pr. m² 2026. Se timepris, dagspris og beregn dit estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
