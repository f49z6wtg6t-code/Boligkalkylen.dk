import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// JetBrains Mono: bibeholdes til tal og beregningsresultater
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gratis prisberegner: Solceller & badeværelse 2026 | BoligKalkylen.dk",
  description:
    "Få et gratis og uforpligtende prisestimat på solceller eller badeværelsesrenovering på under 1 minut. Ingen kontaktoplysninger kræves — se dit estimat med det samme.",
  metadataBase: new URL("https://boligkalkylen.dk"),
  keywords: [
    "solcelleberegner",
    "solceller pris 2026",
    "badeværelsesberegner",
    "badeværelse renovering pris",
    "gratis tilbud håndværker",
    "tilbagebetalingstid solceller",
    "BoligKalkylen",
  ],
  openGraph: {
    title: "Gratis prisberegner: Solceller & badeværelse 2026",
    description:
      "Beregn prisen på dit næste boligprojekt på 1 minut — gratis og uforpligtende.",
    url: "https://boligkalkylen.dk",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gratis prisberegner: Solceller & badeværelse 2026",
    description:
      "Beregn prisen på dit næste boligprojekt på 1 minut — gratis og uforpligtende.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#F5F0E8", color: "#1A2418" }}
      >
        {children}
      </body>
    </html>
  );
}
