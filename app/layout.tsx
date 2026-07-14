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
  title: "BoligKalkylen.dk — Gratis beregner: Solceller & badeværelse (2026)",
  description:
    "Beregn hurtigt hvad solceller eller en badeværelsesrenovering koster dig i 2026 — og modtag gratis, uforpligtende tilbud fra 2-3 lokale håndværkere.",
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
    title: "BoligKalkylen.dk — Gratis beregner: Solceller & badeværelse (2026)",
    description:
      "Beregn hvad solceller eller en badeværelsesrenovering koster i 2026 — og modtag gratis tilbud fra lokale håndværkere.",
    url: "https://boligkalkylen.dk",
    siteName: "BoligKalkylen.dk",
    locale: "da_DK",
    type: "website",
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
