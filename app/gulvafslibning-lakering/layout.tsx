import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gulvafslibning og lakering — pris 2026",
  description:
    "Hvad koster gulvafslibning med lakering? Et 50 m² gulv i god stand koster typisk 8.500–11.500 kr. inkl. moms. Se hvad der er inkluderet og sammenlign lakering, olie og sæbe.",
  alternates: { canonical: "https://boligkalkylen.dk/gulvafslibning-lakering" },
  openGraph: {
    title: "Gulvafslibning og lakering — pris 2026",
    description:
      "Pris på gulvafslibning med lakering 2026. Se hvad der er inkluderet og beregn dit estimat.",
    url: "https://boligkalkylen.dk/gulvafslibning-lakering",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gulvafslibning og lakering — pris 2026",
    description:
      "Pris på gulvafslibning med lakering 2026. Se hvad der er inkluderet og beregn dit estimat.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
