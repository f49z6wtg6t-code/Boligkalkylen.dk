"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageview } from "@/lib/analytics";

// Lytter på Next.js App Router navigation events og sender pageview-events.
// Renderes i root layout som en tom komponent — ingen synlig output.
export default function AnalyticsProvider() {
  const pathname = usePathname();
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Undgå duplikate events ved React Strict Mode double-invoke
    if (fired.current.has(pathname)) return;
    fired.current.add(pathname);
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
