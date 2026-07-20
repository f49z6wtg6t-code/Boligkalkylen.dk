"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface CalculatorShellProps {
  title: string;
  description: string;
  children: ReactNode;       // input panel
  result: ReactNode;         // result panel
}

export default function CalculatorShell({
  title,
  description,
  children,
  result,
}: CalculatorShellProps) {
  return (
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
              className="h-32 w-auto sm:h-40"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>
          <div className="w-24" />
        </div>
      </header>

      {/* Page header */}
      <div
        className="border-b py-8 px-4 sm:px-6"
        style={{ borderColor: "#D4CCC0", backgroundColor: "#F5F0E8" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-2xl sm:text-3xl font-bold mb-1"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
          >
            {title}
          </h1>
          <p className="text-sm" style={{ color: "#6B6356" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          {/* Left: inputs */}
          <div
            className="rounded-2xl p-5 sm:p-6 h-fit"
            style={{ backgroundColor: "#EDE8DC", border: "1px solid #D4CCC0" }}
          >
            {children}
          </div>

          {/* Right: results */}
          <div className="space-y-4">{result}</div>
        </div>
      </div>
    </div>
  );
}
