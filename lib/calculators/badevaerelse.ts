export type BadevaerelseInputs = {
  stoerrelse: "lille" | "mellem" | "stor";
  omfang: "overfladisk" | "totalrenovering";
  materialer: "standard" | "premium" | "luksus";
  vvsFlytning: boolean;
};

export interface BadevaerelseResult {
  prisLav: number;
  prisHoej: number;
  uger: number;
  midpoint: number;
}

const BASE_PRICES: Record<BadevaerelseInputs["stoerrelse"], number> = {
  lille: 112500,
  mellem: 232500,
  stor: 375000,
};

const SCOPE_MULTIPLIERS: Record<
  BadevaerelseInputs["omfang"],
  { low: number; high: number }
> = {
  overfladisk: { low: 0.65, high: 0.85 },
  totalrenovering: { low: 1.0, high: 1.3 },
};

const MATERIAL_MULTIPLIERS: Record<
  BadevaerelseInputs["materialer"],
  { low: number; high: number }
> = {
  standard: { low: 0.85, high: 1.0 },
  premium: { low: 1.1, high: 1.4 },
  luksus: { low: 1.5, high: 1.8 },
};

const VVS_ADD: { low: number; high: number } = { low: 15000, high: 35000 };

const DURATION_WEEKS: Record<
  BadevaerelseInputs["stoerrelse"],
  Record<BadevaerelseInputs["omfang"], number>
> = {
  lille: { overfladisk: 2, totalrenovering: 4 },
  mellem: { overfladisk: 3, totalrenovering: 6 },
  stor: { overfladisk: 4, totalrenovering: 9 },
};

export function calculateBadevaerelse(inputs: BadevaerelseInputs): BadevaerelseResult {
  const base = BASE_PRICES[inputs.stoerrelse];
  const scope = SCOPE_MULTIPLIERS[inputs.omfang];
  const material = MATERIAL_MULTIPLIERS[inputs.materialer];

  const prisLavRaw = base * scope.low * material.low + (inputs.vvsFlytning ? VVS_ADD.low : 0);
  const prisHoejRaw = base * scope.high * material.high + (inputs.vvsFlytning ? VVS_ADD.high : 0);

  // Round to nearest 5000
  const round5k = (n: number) => Math.round(n / 5000) * 5000;
  const prisLav = round5k(prisLavRaw);
  const prisHoej = round5k(prisHoejRaw);
  const midpoint = Math.round((prisLav + prisHoej) / 2);

  const uger = DURATION_WEEKS[inputs.stoerrelse][inputs.omfang] + (inputs.vvsFlytning ? 1 : 0);

  return { prisLav, prisHoej, uger, midpoint };
}
