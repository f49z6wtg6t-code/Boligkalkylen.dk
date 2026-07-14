// --- Selvforbrugsværdi ---
// Selvforbrugt solcellestrøm er PERMANENT fritaget for elafgift (elafgiftslovens § 2, stk. 1, litra c):
// elektricitet fremstillet på eget anlæg og forbrugt direkte af producenten er afgiftsfri.
// Kilde: info.skat.dk, energy-supply.dk
//
// Værdien sættes til den fulde detailpris husejeren ellers ville betale for netstrøm.
// Kalibreret mod Modstrøms (dansk elselskab, grundlagt 2012) offentlige solcelle-beregner:
// Modstrøm bruger præcis 2,50 kr./kWh for selvforbrugt strøm (verificeret juni 2026).
const SELVFORBRUG_VAERDI = 2.50; // kr/kWh — fast, afgiftsfritaget

// --- Eksportpris ---
// Realistisk gennemsnit for salg af overskudsstrøm til nettet.
// Kalibreret mod Modstrøms produktionsaftale (ca. 0,40 kr/kWh i praksis).
// Erstatter tidligere 0,65 kr/kWh som var for optimistisk.
const EXPORT_PRICE = 0.45; // kr/kWh

// --- Elafgift på NETKØBT strøm (kun relevant for den strøm husejeren STADIG køber fra nettet) ---
// Midlertidigt sænket til EU-minimum i 2026-2027 (kilde: 1KOMMA5° regeloversigt 2026).
// Forventes at vende tilbage til ~90 øre/kWh fra 2028 (ikke lovfæstet endnu).
// OBS: Påvirker IKKE værdien af selvforbrugt solstrøm — den er fast ved 2,50 kr/kWh uanset år.
const ELAFGIFT_2026_2027 = 0.01; // kr/kWh inkl. moms, 2026-2027
const ELAFGIFT_NORMAL = 0.90;    // kr/kWh inkl. moms, forventet fra 2028
const SPOTPRIS_OG_TARIFFER = 1.55; // kr/kWh — basisspotpris + nettariffer ekskl. afgift

// --- Øvrige konstanter ---
const KWP_YIELD = 750;              // kWh produceret pr. kWp/år, syd-vendt DK-gennemsnit
const INSTALL_PRICE_PER_KWP = 9500; // kr/kWp installeret (2026-estimat)
const CO2_PER_KWH = 0.155;          // kg CO2 sparet pr. kWh (fortrænger DK elmix)
const DEGRADATION = 0.005;          // 0,5% effekttab pr. år
const SPOTPRIS_INCREASE = 0.02;     // antaget årlig stigning i spotpris + tariffer (~2%)
const SELF_CONSUMPTION_RATE = 0.35; // andel af produktion brugt direkte
const START_YEAR = 2026;

/**
 * Fuld netkøbspris (spotpris + tariffer + elafgift) for et givet beregningsår.
 * Bruges til at estimere, hvad husejeren betaler for DEN RESTERENDE netstrøm
 * (altså den del af forbruget som solanlægget ikke dækker).
 * year = 1 → 2026, year = 3 → 2028 osv.
 */
function netkoebtElpris(year: number, spotprisMedStigning: number): number {
  const calYear = START_YEAR + year - 1;
  const afgift = calYear <= 2027 ? ELAFGIFT_2026_2027 : ELAFGIFT_NORMAL;
  return spotprisMedStigning + afgift;
}

// Bruges ikke direkte i besparelsesberegningen, men eksporteres til evt. UI-brug
export { netkoebtElpris };

export interface SolcellerResult {
  systemSizeKwp: number;
  annualSavings: number;
  paybackYears: number;
  co2Reduction: number;
  savings25y: number;
  yearlyData: number[];
  installCost: number;
}

export function calculateSolceller(kwh: number, roofFactor: number): SolcellerResult {
  const systemSizeKwp = Math.min(10, kwh / KWP_YIELD / roofFactor);
  const annualProduction = systemSizeKwp * KWP_YIELD * roofFactor;
  const selfConsumed = Math.min(annualProduction * SELF_CONSUMPTION_RATE, kwh);
  const exported = Math.max(0, annualProduction - selfConsumed);

  // Selvforbrugt: fast 2,50 kr./kWh (afgiftsfritaget, kalibreret mod Modstrøm)
  // Eksporteret: 0,45 kr./kWh (realistisk afregningspris)
  const annualSavings = selfConsumed * SELVFORBRUG_VAERDI + exported * EXPORT_PRICE;

  const installCost = systemSizeKwp * INSTALL_PRICE_PER_KWP;
  const paybackYears = installCost / annualSavings;
  const co2Reduction = (annualProduction * CO2_PER_KWH) / 1000; // tons

  // 25-års akkumuleret besparelse.
  // Selvforbrugsværdien stiger ~2%/år i takt med markedsprisen (SELVFORBRUG_VAERDI er 2026-tal).
  // Eksportprisen stiger tilsvarende.
  // Solanlægget degraderer 0,5%/år.
  let cumulative = 0;
  const yearlyData: number[] = [];

  for (let y = 1; y <= 25; y++) {
    const yearProduction = annualProduction * Math.pow(1 - DEGRADATION, y - 1);
    const prisStigningFaktor = Math.pow(1 + SPOTPRIS_INCREASE, y - 1);

    const yearSelfConsumed = Math.min(yearProduction * SELF_CONSUMPTION_RATE, kwh);
    const yearExported = Math.max(0, yearProduction - yearSelfConsumed);

    // Selvforbrugsværdi stiger med markedet (spotpris-delen)
    const yearSelfValue = SELVFORBRUG_VAERDI * prisStigningFaktor;
    const yearExportValue = EXPORT_PRICE * prisStigningFaktor;

    const yearSavings = yearSelfConsumed * yearSelfValue + yearExported * yearExportValue;
    cumulative += yearSavings;
    yearlyData.push(Math.round(cumulative));
  }

  return {
    systemSizeKwp,
    annualSavings,
    paybackYears,
    co2Reduction,
    savings25y: cumulative,
    yearlyData,
    installCost,
  };
}
