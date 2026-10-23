import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Efterisolering pris 2026 — hvad koster det?",
  description:
    "Hvad koster efterisolering i 2026? Loftisolering koster 90–220 kr./m², hulmursisolering 130–180 kr./m². Se tilskud fra Energistyrelsen og beregn tilbagebetalingstiden.",
  alternates: { canonical: "https://boligkalkylen.dk/efterisolering-pris" },
  openGraph: {
    title: "Efterisolering pris 2026 — hvad koster det?",
    description: "Priser på efterisolering 2026. Se tilskud og beregn tilbagebetalingstiden gratis.",
    url: "https://boligkalkylen.dk/efterisolering-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Efterisolering pris 2026 — hvad koster det?",
    description: "Priser på efterisolering 2026. Se tilskud og beregn tilbagebetalingstiden gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
