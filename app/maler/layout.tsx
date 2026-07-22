import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malerberegner 2026 — hvad koster det at male din bolig?",
  description:
    "Beregn prisen på indvendig maling af din bolig. Baseret på m², overfladernes tilstand og omfang. Gratis estimat på 1 minut.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
