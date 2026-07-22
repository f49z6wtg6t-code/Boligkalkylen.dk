export type MalerOmfang = "vaegge_loft" | "vaegge_loft_traevark" | "fuld_renovering";
export type MalerTilstand = "god" | "middel" | "daarlig";

export interface MalerResult {
  minPris: number;
  maxPris: number;
  midpoint: number;
  dage: number;
}

const BASE_PRICES: Record<MalerOmfang, Record<MalerTilstand, { min: number; max: number }>> = {
  vaegge_loft: {
    god: { min: 150, max: 250 },
    middel: { min: 250, max: 400 },
    daarlig: { min: 400, max: 650 },
  },
  vaegge_loft_traevark: {
    god: { min: 200, max: 320 },
    middel: { min: 320, max: 500 },
    daarlig: { min: 500, max: 750 },
  },
  fuld_renovering: {
    god: { min: 265, max: 400 },
    middel: { min: 400, max: 520 },
    daarlig: { min: 520, max: 750 },
  },
};

export function calculateMaler(
  areal: number,
  omfang: MalerOmfang,
  tilstand: MalerTilstand
): MalerResult {
  const prices = BASE_PRICES[omfang][tilstand];
  const round1k = (n: number) => Math.round(n / 1000) * 1000;
  const minPris = round1k(areal * prices.min);
  const maxPris = round1k(areal * prices.max);
  const midpoint = round1k((minPris + maxPris) / 2);
  const dage = Math.ceil(areal / 50);
  return { minPris, maxPris, midpoint, dage };
}
