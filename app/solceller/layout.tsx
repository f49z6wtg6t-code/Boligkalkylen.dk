import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solcelleberegner 2026 — beregn din besparelse gratis | BoligKalkylen.dk",
  description:
    "Beregn din årlige besparelse, tilbagebetalingstid og CO₂-reduktion ved solceller. Baseret på 2026-priser og danske elafgiftsregler. Gratis og uforpligtende.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
