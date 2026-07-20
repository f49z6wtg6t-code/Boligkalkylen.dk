"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ArticleFrontmatter } from "@/lib/articles";
import { Search } from "lucide-react";

const CATEGORIES = [
  { value: "alle", label: "Alle" },
  { value: "solceller", label: "Solceller" },
  { value: "badevaerelse", label: "Badeværelse" },
  { value: "generelt", label: "Generelt" },
];

const CATEGORY_LABELS: Record<string, string> = {
  solceller: "Solceller",
  badevaerelse: "Badeværelse",
  generelt: "Generelt",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesClient({ articles }: { articles: ArticleFrontmatter[] }) {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [search, setSearch] = useState("");

  const filtered = articles
    .filter((a) => activeCategory === "alle" || a.category === activeCategory)
    .filter((a) =>
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "#F5F0E8", backgroundColor: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-sm w-20" style={{ color: "rgba(0,0,0,0.4)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tilbage
          </Link>
          <Link href="/">
            <Image
              src="/logo-header.png"
              alt="BoligKalkylen"
              width={600}
              height={160}
              className="h-32 w-auto sm:h-40"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <section className="px-4 sm:px-6 pt-12 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            Artikler og guides
          </h1>
          <p className="text-lg mb-8" style={{ color: "#6B6356" }}>
            Generelle guides om solceller og badeværelsesrenovering — baseret på danske priser og lovgivning.
          </p>

          {/* Søgefelt */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9E9486" }} />
            <input
              type="text"
              placeholder="Søg i artikler..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "#EDE8DC",
                border: "1px solid #D4CCC0",
                color: "#1E1A14",
              }}
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150"
                style={{
                  backgroundColor: activeCategory === cat.value ? "rgba(201,240,49,0.1)" : "#EDE8DC",
                  border: activeCategory === cat.value ? "1px solid rgba(201,240,49,0.25)" : "1px solid #D4CCC0",
                  color: activeCategory === cat.value ? "#C9F031" : "#6B6356",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length === 0 ? (
            <p style={{ color: "#6B6356" }}>Ingen artikler i denne kategori endnu.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((article) => (
                <Link
                  key={article.slug}
                  href={`/artikler/${article.slug}`}
                  className="block rounded-2xl p-6 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #2D5220 0%, #3A6B2A 60%, #4a8a36 100%)",
                    border: "1px solid #2D5220",
                    boxShadow: "0 4px 16px rgba(45,82,32,0.18)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(255,255,255,0.25)",
                      }}
                    >
                      {CATEGORY_LABELS[article.category] ?? article.category}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h2
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "var(--font-dm-sans)", color: "#FFFFFF" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {article.excerpt}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: "#FFFFFF" }}
                  >
                    Læs guide
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

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
