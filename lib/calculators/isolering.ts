export type IsoleringsType = "loftisolering" | "hulmur" | "ydervaeg";
export type LoftTykkelse = "100" | "200" | "300";

export interface IsoleringsResult {
  minPris: number;
  maxPris: number;
  midpoint: number;
  annualSavings: number;
  paybackYears: number;
}

const ISOLERING_PRICES: Record<string, { min: number; max: number }> = {
  loftisolering_100: { min: 99, max: 150 },
  loftisolering_200: { min: 130, max: 200 },
  loftisolering_300: { min: 160, max: 250 },
  hulmur_standard: { min: 130, max: 180 },
  ydervaeg_standard: { min: 800, max: 1400 },
};

const ANNUAL_SAVINGS: Record<string, number> = {
  loftisolering_100: 2500,
  loftisolering_200: 3500,
  loftisolering_300: 4000,
  hulmur_standard: 5000,
  ydervaeg_standard: 6000,
};

export function calculateIsolering(
  areal: number,
  type: IsoleringsType,
  tykkelse: LoftTykkelse = "100"
): IsoleringsResult {
  const priceKey = type === "loftisolering" ? `loftisolering_${tykkelse}` : `${type}_standard`;
  const prices = ISOLERING_PRICES[priceKey];
  const round500 = (n: number) => Math.round(n / 500) * 500;
  const minPris = round500(areal * prices.min);
  const maxPris = round500(areal * prices.max);
  const midpoint = round500((minPris + maxPris) / 2);
  const annualSavings = ANNUAL_SAVINGS[priceKey];
  const paybackYears = Math.round((midpoint / annualSavings) * 10) / 10;
  return { minPris, maxPris, midpoint, annualSavings, paybackYears };
}
