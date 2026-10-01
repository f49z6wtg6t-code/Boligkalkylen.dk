"use client";

import Image from "next/image";
import { BADEVARELSE_PRODUCTS, KOMPLET_FRA_PRIS } from "@/lib/partner-products";
import { getSessionId } from "@/lib/analytics";

interface PartnerProductsProps {
  materialer: "standard" | "premium" | "luksus";
  leadId?: string;
}

function formatDKK(n: number): string {
  return new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(n);
}

function trackPartnerClick(slug: string, materialer: string) {
  if (typeof window === "undefined") return;
  fetch("/api/track/partner-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_slug: slug,
      calculator_type: "badevaerelse",
      materialer,
      session_id: getSessionId(),
    }),
    keepalive: true,
  }).catch(() => {});
}

export default function PartnerProducts({ materialer, leadId }: PartnerProductsProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #D4CCC0", backgroundColor: "#F5F0E8" }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <p
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
        >
          Bademøbel til dit nye badeværelse
        </p>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "#EDE8DC",
            border: "1px solid #C8C0B4",
            color: "#9E9486",
          }}
        >
          Partnerprodukt
        </span>
      </div>

      {/* Produkt-kort */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-3">
        {BADEVARELSE_PRODUCTS.map((p) => {
          const ref = leadId ?? getSessionId();
          const url = `https://motivogruppen.com/interiors/${p.slug}?utm_source=boligkalkylen&utm_campaign=badevaerelse&ref=${ref}`;
          return (
            <a
              key={p.slug}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPartnerClick(p.slug, materialer)}
              className="flex flex-col rounded-xl overflow-hidden transition-all duration-150"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D4CCC0" }}
            >
              <div className="relative w-full" style={{ paddingBottom: "100%" }}>
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 30vw, 180px"
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <p
                  className="text-[11px] font-semibold leading-tight mb-0.5"
                  style={{ color: "#1E1A14", fontFamily: "var(--font-dm-sans)" }}
                >
                  {p.name}
                </p>
                <p className="text-[11px]" style={{ color: "#6B6356" }}>
                  fra {formatDKK(p.fraPrice)} kr.
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium"
                  style={{ color: "#3A6B2A" }}
                >
                  Se møblet
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 text-center text-xs"
        style={{
          borderTop: "1px solid #D4CCC0",
          color: "#6B6356",
        }}
      >
        Komplet med bordplade og montering fra{" "}
        <strong style={{ color: "#1E1A14" }}>
          {formatDKK(KOMPLET_FRA_PRIS)} kr. inkl. moms
        </strong>
      </div>
    </div>
  );
}
