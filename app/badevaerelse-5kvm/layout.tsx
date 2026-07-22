import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badeværelse under 5 kvm — hvad koster en renovering? | BoligKalkylen.dk",
  description:
    "Hvad koster det at renovere et lille badeværelse på under 5 kvm? Se realistiske prisestimater for totalrenovering med standard materialer — gratis beregner.",
  alternates: { canonical: "https://boligkalkylen.dk/badevaerelse-5kvm" },
  openGraph: {
    title: "Badeværelse under 5 kvm — hvad koster renovering?",
    description:
      "Prisestimat for lille badeværelse under 5 kvm. Totalrenovering med standard materialer. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/badevaerelse-5kvm",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
