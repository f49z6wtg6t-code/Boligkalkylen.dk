export type GulvTilstand = "god" | "middel" | "daarlig";
export type GulvEfterbehandling = "lakering" | "oliering" | "saebe";

export interface GulvResult {
  minPris: number;
  maxPris: number;
  midpoint: number;
  holdbarhed: string;
  /** True når arealet er så lille, at bundgrænsen for et job slår igennem. */
  minimumsprisAnvendt: boolean;
}

/** Kr. pr. m² inkl. moms, kun selve slibningen + efterbehandlingen. */
const GULV_PRICES: Record<
  GulvEfterbehandling,
  Record<GulvTilstand, { min: number; max: number }>
> = {
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

/**
 * Fast opstartsomkostning inkl. moms: transport, maskiner, afdækning,
 * opstart og oprydning. Er den samme uanset rummets størrelse, og er
 * grunden til at små jobs koster mere pr. m² end store.
 */
const OPSTART = { min: 1800, max: 2500 };

/** Bundgrænse for et gulvjob inkl. moms. Branchen ligger på 2.500–4.500 kr. */
export const MIN_JOB_PRIS = 3000;

/** Prisintervallet må aldrig blive smallere end dette. */
const MIN_SPAEND = 1500;

const HOLDBARHED: Record<GulvEfterbehandling, string> = {
  lakering: "10–15 år",
  oliering: "3–5 år (kræver løbende vedligeholdelse)",
  saebe: "3–5 år (løbende sæbebehandling anbefales)",
};

const round500 = (n: number) => Math.round(n / 500) * 500;

export function calculateGulv(
  areal: number,
  tilstand: GulvTilstand,
  efterbehandling: GulvEfterbehandling
): GulvResult {
  const prices = GULV_PRICES[efterbehandling][tilstand];

  let minPris = round500(OPSTART.min + areal * prices.min);
  let maxPris = round500(OPSTART.max + areal * prices.max);

  const minimumsprisAnvendt = minPris < MIN_JOB_PRIS;
  if (minimumsprisAnvendt) minPris = MIN_JOB_PRIS;
  if (maxPris - minPris < MIN_SPAEND) maxPris = minPris + MIN_SPAEND;

  const midpoint = round500((minPris + maxPris) / 2);

  return {
    minPris,
    maxPris,
    midpoint,
    holdbarhed: HOLDBARHED[efterbehandling],
    minimumsprisAnvendt,
  };
}
