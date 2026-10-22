import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Lazy-init så serveren ikke crasher hvis env-vars mangler (f.eks. lokalt)
let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    // Max 5 lead-indsendelser per IP per 60 minutter
    limiter: Ratelimit.slidingWindow(5, "60 m"),
    analytics: false,
    prefix: "bk_leads",
  });
  return ratelimit;
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Returnerer true hvis requesten er tilladt, false hvis rate-limitet er nået.
// Fejler åbent: hvis Redis ikke er konfigureret eller er nede, tillades requesten.
export async function checkLeadRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const rl = getRatelimit();
  if (!rl) return { allowed: true, remaining: 99 };

  try {
    const result = await rl.limit(ip);
    return { allowed: result.success, remaining: result.remaining };
  } catch {
    // Redis nede → lad requesten igennem (fail open)
    return { allowed: true, remaining: 99 };
  }
}
