// lib/analytics.ts
// First-party analytics — ingen cookies, sessionStorage-scoped (GDPR compliant)
// Alle events er fire-and-forget: fejl logges ikke til brugeren

const SESSION_KEY = "bk_sid";

export type CalculatorType =
  | "solceller"
  | "badevaerelse"
  | "maler"
  | "gulv"
  | "isolering"
  | "klinker";

export type CalculatorEventType = "started" | "completed" | "abandoned";

// Genererer eller henter session-ID fra sessionStorage.
// sessionStorage er session-scoped: ryddes automatisk når browser-tabben lukkes.
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Fire-and-forget POST — analytics-fejl er aldrig fatale
async function post(path: string, data: Record<string, unknown>): Promise<void> {
  try {
    await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true, // sender selv ved page unload
    });
  } catch {
    // Silently ignore — analytics er aldrig kritisk
  }
}

export function trackPageview(path: string): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  post("/api/track/pageview", {
    path,
    referrer: document.referrer || null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    session_id: getSessionId(),
    user_agent: navigator.userAgent,
  });
}

export function trackCalculatorEvent(
  calculator_type: CalculatorType,
  event_type: CalculatorEventType,
  input_data: Record<string, unknown> = {},
  result_value?: number
): void {
  if (typeof window === "undefined") return;
  post("/api/track/event", {
    calculator_type,
    event_type,
    session_id: getSessionId(),
    input_data,
    result_value: result_value ?? null,
  });
}
