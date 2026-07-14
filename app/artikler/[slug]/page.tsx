import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — BoligKalkylen.dk`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const CATEGORY_LABELS: Record<string, string> = {
    solceller: "Solceller",
    badevaerelse: "Badeværelse",
    generelt: "Generelt",
  };

  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#F5F0E8", backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/artikler" className="flex items-center gap-1 text-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(0,0,0,0.4)" }}>
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "rgba(0,0,0,0.4)" }}>Tilbage</span>
          </Link>
          <span className="text-sm font-semibold" style={{ color: "#3A6B2A", fontFamily: "var(--font-dm-sans)" }}>
            BoligKalkylen
          </span>
          <div className="w-16" />
        </div>
      </header>

      <article className="px-4 sm:px-6 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(201,240,49,0.1)",
                color: "#C9F031",
                border: "1px solid rgba(201,240,49,0.25)",
              }}
            >
              {CATEGORY_LABELS[article.category] ?? article.category}
            </span>
            <span className="text-xs" style={{ color: "#6B6356" }}>
              {publishedDate}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            {article.title}
          </h1>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#6B6356" }}>
            {article.excerpt}
          </p>

          {/* Article body */}
          <div className="prose-boligkalkylen">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      color: "#1E1A14",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      marginTop: "2rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      color: "#1E1A14",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      marginTop: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ color: "#6B6356", lineHeight: "1.75", marginBottom: "1rem" }}>
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul
                    style={{
                      color: "#6B6356",
                      paddingLeft: "1.25rem",
                      marginBottom: "1rem",
                      lineHeight: "1.75",
                    }}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol
                    style={{
                      color: "#6B6356",
                      paddingLeft: "1.25rem",
                      marginBottom: "1rem",
                      lineHeight: "1.75",
                    }}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li style={{ marginBottom: "0.375rem" }}>{children}</li>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: "#1E1A14", fontWeight: 600 }}>{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a href={href} style={{ color: "#3A6B2A", textDecoration: "underline" }}>
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: "3px solid #D4CCC0",
                      paddingLeft: "1rem",
                      margin: "1.5rem 0",
                      color: "#B0A898",
                      fontStyle: "italic",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                hr: () => <hr style={{ borderColor: "#D4CCC0", margin: "2rem 0" }} />,
                table: ({ children }) => (
                  <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", fontWeight: 600, color: "#1E1A14", backgroundColor: "#EDE8DC", borderBottom: "2px solid #D4CCC0", borderRight: "1px solid #D4CCC0" }}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td style={{ padding: "0.5rem 0.75rem", color: "#6B6356", borderBottom: "1px solid #D4CCC0", borderRight: "1px solid #D4CCC0" }}>
                    {children}
                  </td>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Related calculator CTA */}
          {article.relatedCalculator && (
            <div
              className="mt-12 rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #2D5220 0%, #3A6B2A 60%, #4a8a36 100%)",
                border: "1px solid #2D5220",
                boxShadow: "0 4px 16px rgba(45,82,32,0.18)",
              }}
            >
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                Klar til at beregne dit projekt?
              </p>
              <p
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#FFFFFF" }}
              >
                Prøv vores gratis beregner og få et hurtigt estimat.
              </p>
              <Link
                href={article.relatedCalculator}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                Prøv kalkulatoren
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </article>

      <footer className="border-t py-6" style={{ borderColor: "#D4CCC0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm" style={{ color: "#6B6356" }}>
            © {new Date().getFullYear()} BoligKalkylen.dk — Drevet af{" "}
            <a href="https://motivobyg.dk" style={{ color: "#6B6356" }}>
              Motivo Gruppen
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
