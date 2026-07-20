import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badeværelse prisberegner 2026 — hvad koster din renovering? | BoligKalkylen.dk",
  description:
    "Få et realistisk prisestimat på badeværelsesrenovering baseret på størrelse, omfang og materialer. Danske håndværkerpriser 2026. Gratis og uforpligtende.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
