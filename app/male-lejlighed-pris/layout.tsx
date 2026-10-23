import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvad koster det at male en lejlighed? Pris 2026",
  description:
    "Hvad koster det at male en lejlighed i 2026? En 3-værelses lejlighed på 80 m² koster typisk 12.000–22.000 kr. inkl. moms. Se hvad der påvirker prisen og beregn dit estimat.",
  alternates: { canonical: "https://boligkalkylen.dk/male-lejlighed-pris" },
  openGraph: {
    title: "Hvad koster det at male en lejlighed? Pris 2026",
    description: "Pris på maling af lejlighed 2026. Beregn dit eget estimat gratis.",
    url: "https://boligkalkylen.dk/male-lejlighed-pris",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hvad koster det at male en lejlighed? Pris 2026",
    description: "Pris på maling af lejlighed 2026. Beregn dit eget estimat gratis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
