import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solceller på eternittag — pris og hvad du skal vide | BoligKalkylen.dk",
  description:
    "Kan man sætte solceller på eternittag? Hvad koster det og hvad skal man være opmærksom på? Se prisestimat og guide til solceller på eternit. Gratis beregner.",
  alternates: { canonical: "https://boligkalkylen.dk/solceller-eternittag" },
  openGraph: {
    title: "Solceller på eternittag — pris og guide 2026",
    description:
      "Guide til solceller på eternittag: pris, besparelse, asbest-regler og hvad der er vigtigt at vide. Gratis beregner.",
    url: "https://boligkalkylen.dk/solceller-eternittag",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
