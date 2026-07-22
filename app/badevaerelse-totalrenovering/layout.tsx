import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Totalrenovering af badeværelse 2026 — pris og guide | BoligKalkylen.dk",
  description:
    "Hvad koster en totalrenovering af badeværelse i 2026? Se realistiske prisestimater, hvad der er inkluderet, og hvad der øger prisen. Gratis beregner.",
  alternates: { canonical: "https://boligkalkylen.dk/badevaerelse-totalrenovering" },
  openGraph: {
    title: "Totalrenovering af badeværelse 2026 — pris og guide",
    description:
      "Komplet guide til totalrenovering af badeværelse. Prisestimater, hvad der er inkluderet og hvad der øger prisen.",
    url: "https://boligkalkylen.dk/badevaerelse-totalrenovering",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
