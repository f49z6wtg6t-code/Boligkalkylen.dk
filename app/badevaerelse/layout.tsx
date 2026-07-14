import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badeværelsesberegner – Beregn pris på nyt badeværelse (2026) | BoligKalkylen",
  description:
    "Få et realistisk prisestimat på din badeværelsesrenovering. Beregn pris baseret på størrelse, omfang og materialer — gratis og uforpligtende.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
