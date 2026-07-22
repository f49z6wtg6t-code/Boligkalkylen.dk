export type GulvTilstand = "god" | "middel" | "daarlig";
export type GulvEfterbehandling = "lakering" | "oliering" | "saebe";

export interface GulvResult {
  minPris: number;
  maxPris: number;
  midpoint: number;
  holdbarhed: string;
}

const GULV_PRICES: Record<GulvEfterbehandling, Record<GulvTilstand, { min: number; max: number }>> = {
  lakering: {
    god: { min: 135, max: 175 },
    middel: { min: 160, max: 200 },
    daarlig: { min: 185, max: 250 },
  },
  oliering: {
    god: { min: 125, max: 165 },
    middel: { min: 150, max: 190 },
    daarlig: { min: 175, max: 230 },
  },
  saebe: {
    god: { min: 120, max: 155 },
    middel: { min: 140, max: 175 },
    daarlig: { min: 165, max: 210 },
  },
};

const HOLDBARHED: Record<GulvEfterbehandling, string> = {
  lakering: "10–15 år",
  oliering: "3–5 år (kræver løbende vedligeholdelse)",
  saebe: "3–5 år (løbende sæbebehandling anbefales)",
};

export function calculateGulv(
  areal: number,
  tilstand: GulvTilstand,
  efterbehandling: GulvEfterbehandling
): GulvResult {
  const prices = GULV_PRICES[efterbehandling][tilstand];
  const round500 = (n: number) => Math.round(n / 500) * 500;
  const minPris = round500(areal * prices.min);
  const maxPris = round500(areal * prices.max);
  const midpoint = round500((minPris + maxPris) / 2);
  return { minPris, maxPris, midpoint, holdbarhed: HOLDBARHED[efterbehandling] };
}
