import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badeværelse 5–10 kvm — hvad koster en renovering? | BoligKalkylen.dk",
  description:
    "Hvad koster det at renovere et badeværelse på 5–10 kvm? Se realistiske prisestimater for totalrenovering med standard materialer — gratis beregner.",
  alternates: { canonical: "https://boligkalkylen.dk/badevaerelse-10kvm" },
  openGraph: {
    title: "Badeværelse 5–10 kvm — hvad koster renovering?",
    description:
      "Prisestimat for standard badeværelse på 5–10 kvm. Totalrenovering med standard materialer. Gratis og uforpligtende.",
    url: "https://boligkalkylen.dk/badevaerelse-10kvm",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
