import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solceller 6 kW — hvad koster det og hvad sparer du? | BoligKalkylen.dk",
  description:
    "Hvad koster et 6 kW solcelleanlæg i 2026? Se pris, besparelse og tilbagebetalingstid for et 6 kW anlæg med syd-vendt tag. Gratis beregner.",
  alternates: { canonical: "https://boligkalkylen.dk/solceller-6kw" },
  openGraph: {
    title: "Solceller 6 kW — pris, besparelse og tilbagebetalingstid",
    description:
      "Komplet guide til 6 kW solcelleanlæg. Pris, besparelse og tilbagebetalingstid beregnet ud fra dit forbrug.",
    url: "https://boligkalkylen.dk/solceller-6kw",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
