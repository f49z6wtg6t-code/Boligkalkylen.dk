import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import FAQSection from "@/components/faq-section";

interface FAQItem {
  question: string;
  answer: string;
}

interface IntentPageLayoutProps {
  h1: string;
  intro: string;            // markdown body content
  calculator: ReactNode;    // pre-filled calculator component
  faqItems: FAQItem[];
  faqJsonLd: object;
  webAppJsonLd: object;
  calculatorHref: string;
  calculatorLabel: string;
}

export default function IntentPageLayout({
  h1,
  intro,
  calculator,
  faqItems,
  faqJsonLd,
  webAppJsonLd,
  calculatorHref,
  calculatorLabel,
}: IntentPageLayoutProps) {
  return (
    <>
      <Script
        id="json-ld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <Script
        id="json-ld-faqpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
        {/* Header */}
        <header
          className="sticky top-0 z-10 border-b"
          style={{ borderColor: "#F5F0E8", backgroundColor: "#F5F0E8" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(0,0,0,0.4)" }}>
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Tilbage</span>
            </Link>
            <Link href="/">
              <Image
                src="/logo-header.png"
                alt="BoligKalkylen"
                width={600}
                height={160}
                className="h-64 w-auto sm:h-80"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <div className="w-24" />
          </div>
        </header>

        <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
          {/* H1 */}
          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            {h1}
          </h1>

          {/* Two-column layout: content left, calculator right */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Left: article content + FAQ */}
            <div>
              <div className="prose-boligkalkylen mb-10">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14", fontSize: "1.2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.75rem" }}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14", fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p style={{ color: "#6B6356", lineHeight: "1.75", marginBottom: "1rem" }}>{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul style={{ color: "#6B6356", paddingLeft: "1.25rem", marginBottom: "1rem", lineHeight: "1.75" }}>{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol style={{ color: "#6B6356", paddingLeft: "1.25rem", marginBottom: "1rem", lineHeight: "1.75" }}>{children}</ol>
                    ),
                    li: ({ children }) => <li style={{ marginBottom: "0.375rem" }}>{children}</li>,
                    strong: ({ children }) => <strong style={{ color: "#1E1A14", fontWeight: 600 }}>{children}</strong>,
                    table: ({ children }) => (
                      <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", fontWeight: 600, color: "#1E1A14", backgroundColor: "#EDE8DC", borderBottom: "2px solid #D4CCC0", borderRight: "1px solid #D4CCC0" }}>{children}</th>
                    ),
                    td: ({ children }) => (
                      <td style={{ padding: "0.5rem 0.75rem", color: "#6B6356", borderBottom: "1px solid #D4CCC0", borderRight: "1px solid #D4CCC0" }}>{children}</td>
                    ),
                  }}
                >
                  {intro}
                </ReactMarkdown>
              </div>

              <FAQSection items={faqItems} />
            </div>

            {/* Right: sticky calculator */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6B6356" }}>
                  Beregn dit estimat
                </p>
                {calculator}
              </div>

              {/* CTA to full calculator */}
              <Link
                href={calculatorHref}
                className="flex items-center justify-between rounded-2xl p-4 transition-all duration-150 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2D5220 0%, #3A6B2A 100%)", border: "1px solid #2D5220" }}
              >
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Vil du justere flere detaljer?</p>
                  <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{calculatorLabel}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ color: "#FFFFFF", flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <footer className="border-t py-6" style={{ borderColor: "#D4CCC0" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm" style={{ color: "#6B6356" }}>
              © {new Date().getFullYear()} BoligKalkylen.dk
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
