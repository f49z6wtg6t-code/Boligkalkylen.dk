export type KlinkeKvalitet = "standard" | "premium" | "luksus";
export type KlinkeGulvvarme = "ingen" | "el" | "vand";

export interface KlinkeInput {
  areal: number;
  kvalitet: KlinkeKvalitet;
  /** Skal gulvet afrettes/spartles først? */
  afretning: boolean;
  gulvvarme: KlinkeGulvvarme;
  /** False = kunden køber selv klinkerne, prisen dækker kun arbejdet. */
  inklMaterialer: boolean;
}

export interface KlinkeResult {
  minPris: number;
  maxPris: number;
  midpoint: number;
  minimumsprisAnvendt: boolean;
  /** Til visning: hvad prisen er sammensat af. */
  poster: { navn: string; min: number; max: number }[];
}

/** Kr./m² inkl. moms — arbejdsløn: lægning, tilskæring og fugning. */
const ARBEJDSLON = { min: 450, max: 700 };

/** Multiplier for rum under 10 m² (flere tilskæringer pr. m²). */
const LILLE_RUM_FAKTOR = 1.25;

/** Kr./m² inkl. moms — klinker som materiale. */
const KLINKER_MATERIALE: Record<KlinkeKvalitet, { min: number; max: number }> = {
  standard: { min: 200, max: 450 },
  premium:  { min: 450, max: 800 },
  luksus:   { min: 800, max: 1500 },
};

/** Kr./m² inkl. moms — afretning/spartling. */
const AFRETNING = { min: 100, max: 300 };

/** Kr./m² inkl. moms — gulvvarme. */
const GULVVARME: Record<KlinkeGulvvarme, { min: number; max: number }> = {
  ingen: { min: 0, max: 0 },
  el:    { min: 400, max: 800 },
  vand:  { min: 600, max: 1000 },
};

/** Fast opstartsomkostning inkl. moms: transport, maskiner, afdækning, opstart. */
const OPSTART = { min: 1750, max: 3000 };

/** Bundgrænse for et klinkejob inkl. moms. */
export const MIN_JOB_PRIS = 4000;

/** Prisintervallet må aldrig blive smallere end dette. */
const MIN_SPAEND = 2000;

const round500 = (n: number) => Math.round(n / 500) * 500;

export function calculateKlinker(input: KlinkeInput): KlinkeResult {
  const { areal, kvalitet, afretning, gulvvarme, inklMaterialer } = input;

  const erLilleRum = areal < 10;
  const arbejdsFaktor = erLilleRum ? LILLE_RUM_FAKTOR : 1;

  // Råbeløb per komponent — UAFRUNDET, bruges i poster og til råtotal
  const arbejdMin  = areal * ARBEJDSLON.min * arbejdsFaktor;
  const arbejdMax  = areal * ARBEJDSLON.max * arbejdsFaktor;
  const materialMin = inklMaterialer ? areal * KLINKER_MATERIALE[kvalitet].min : 0;
  const materialMax = inklMaterialer ? areal * KLINKER_MATERIALE[kvalitet].max : 0;
  const afretMin    = afretning ? areal * AFRETNING.min : 0;
  const afretMax    = afretning ? areal * AFRETNING.max : 0;
  const gulvMin     = areal * GULVVARME[gulvvarme].min;
  const gulvMax     = areal * GULVVARME[gulvvarme].max;

  // Råtotal inkl. opstart (ikke afrundet) — bruges af testen
  const rawMin = OPSTART.min + arbejdMin + materialMin + afretMin + gulvMin;
  const rawMax = OPSTART.max + arbejdMax + materialMax + afretMax + gulvMax;

  // Afrund og anvend bundgrænse + minimumsspænd
  let minPris = round500(rawMin);
  let maxPris = round500(rawMax);

  const minimumsprisAnvendt = minPris < MIN_JOB_PRIS;
  if (minimumsprisAnvendt) minPris = MIN_JOB_PRIS;
  if (maxPris - minPris < MIN_SPAEND) maxPris = minPris + MIN_SPAEND;

  const midpoint = round500((minPris + maxPris) / 2);

  // Byg poster — kun dem med værdi > 0, fast rækkefølge
  const poster: { navn: string; min: number; max: number }[] = [];

  poster.push({ navn: "Opstart og transport", min: OPSTART.min, max: OPSTART.max });
  poster.push({ navn: "Arbejdsløn",           min: arbejdMin,   max: arbejdMax   });
  if (inklMaterialer) {
    poster.push({ navn: "Klinker", min: materialMin, max: materialMax });
  }
  if (afretning) {
    poster.push({ navn: "Afretning af gulv", min: afretMin, max: afretMax });
  }
  if (gulvvarme !== "ingen") {
    poster.push({ navn: "Gulvvarme", min: gulvMin, max: gulvMax });
  }

  // Bundgrænse-justeringspost: gør at poster.min summerer til minPris
  if (minimumsprisAnvendt) {
    const posterSum = poster.reduce((s, p) => s + p.min, 0);
    const diff = minPris - posterSum;
    if (diff > 0) {
      poster.push({ navn: "Bundgrænse for mindre jobs", min: diff, max: 0 });
    }
  }

  return { minPris, maxPris, midpoint, minimumsprisAnvendt, poster };
}

/** Eksportér råværdier til brug i test. */
export function _klinkerRawMin(input: KlinkeInput): number {
  const { areal, kvalitet, afretning, gulvvarme, inklMaterialer } = input;
  const f = areal < 10 ? LILLE_RUM_FAKTOR : 1;
  return (
    OPSTART.min +
    areal * ARBEJDSLON.min * f +
    (inklMaterialer ? areal * KLINKER_MATERIALE[kvalitet].min : 0) +
    (afretning ? areal * AFRETNING.min : 0) +
    areal * GULVVARME[gulvvarme].min
  );
}
