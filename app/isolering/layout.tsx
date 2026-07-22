import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Isoleringsberegner 2026 — hvad koster efterisolering?",
  description:
    "Beregn prisen på efterisolering af loft eller hulmur. Se din årlige varmebesparelse. Baseret på danske 2026-priser. Gratis estimat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
