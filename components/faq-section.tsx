"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #D4CCC0" }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-dm-sans)", color: "#1E1A14" }}
        >
          Ofte stillede spørgsmål
        </h2>
        <div className="divide-y" style={{ borderColor: "#E8E2D8" }}>
          {items.map((item, i) => (
            <AccordionItem key={i} id={`faq-${i}`} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

function AccordionItem({ item, id }: { item: { question: string; answer: string }; id: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-panel`;
  return (
    <div className="py-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left gap-4"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="text-sm font-medium" style={{ color: "#1E1A14" }}>
          {item.question}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#3A6B2A" }}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <p id={panelId} className="mt-2 text-sm leading-relaxed" style={{ color: "#6B6356" }}>
          {item.answer}
        </p>
      )}
    </div>
  );
}
