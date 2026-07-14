import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solcelleberegner – Beregn pris og besparelse på solceller (2026) | BoligKalkylen",
  description:
    "Beregn din årlige besparelse, tilbagebetalingstid og CO₂-reduktion på solceller. Gratis estimat baseret på dit elforbrug og tagforhold — ingen forpligtelse.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
