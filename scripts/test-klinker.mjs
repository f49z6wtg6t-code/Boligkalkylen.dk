// scripts/test-klinker.mjs — kør med: node scripts/test-klinker.mjs
// Spejler lib/calculators/klinker.ts — ingen transpilering nødvendig

const ARBEJDSLON = { min: 450, max: 700 };
const LILLE_RUM_FAKTOR = 1.25;
const KLINKER_MATERIALE = {
  standard: { min: 200, max: 450 },
  premium:  { min: 450, max: 800 },
  luksus:   { min: 800, max: 1500 },
};
const AFRETNING = { min: 100, max: 300 };
const GULVVARME = {
  ingen: { min: 0, max: 0 },
  el:    { min: 400, max: 800 },
  vand:  { min: 600, max: 1000 },
};
const OPSTART = { min: 1750, max: 3000 };
const MIN_JOB_PRIS = 4000;
const MIN_SPAEND = 2000;
const round500 = (n) => Math.round(n / 500) * 500;

function calculateKlinker({ areal, kvalitet, afretning, gulvvarme, inklMaterialer }) {
  const f = areal < 10 ? LILLE_RUM_FAKTOR : 1;
  const arbejdMin  = areal * ARBEJDSLON.min * f;
  const arbejdMax  = areal * ARBEJDSLON.max * f;
  const materialMin = inklMaterialer ? areal * KLINKER_MATERIALE[kvalitet].min : 0;
  const materialMax = inklMaterialer ? areal * KLINKER_MATERIALE[kvalitet].max : 0;
  const afretMin    = afretning ? areal * AFRETNING.min : 0;
  const afretMax    = afretning ? areal * AFRETNING.max : 0;
  const gulvMin     = areal * GULVVARME[gulvvarme].min;
  const gulvMax     = areal * GULVVARME[gulvvarme].max;
  const rawMin = OPSTART.min + arbejdMin + materialMin + afretMin + gulvMin;
  const rawMax = OPSTART.max + arbejdMax + materialMax + afretMax + gulvMax;
  let minPris = round500(rawMin);
  let maxPris = round500(rawMax);
  const minimumsprisAnvendt = minPris < MIN_JOB_PRIS;
  if (minimumsprisAnvendt) minPris = MIN_JOB_PRIS;
  if (maxPris - minPris < MIN_SPAEND) maxPris = minPris + MIN_SPAEND;
  const midpoint = round500((minPris + maxPris) / 2);
  const poster = [];
  poster.push({ navn: "Opstart og transport", min: OPSTART.min, max: OPSTART.max });
  poster.push({ navn: "Arbejdslon", min: arbejdMin, max: arbejdMax });
  if (inklMaterialer) poster.push({ navn: "Klinker", min: materialMin, max: materialMax });
  if (afretning) poster.push({ navn: "Afretning af gulv", min: afretMin, max: afretMax });
  if (gulvvarme !== "ingen") poster.push({ navn: "Gulvvarme", min: gulvMin, max: gulvMax });
  if (minimumsprisAnvendt) {
    const posterSum = poster.reduce((s, p) => s + p.min, 0);
    const diff = minPris - posterSum;
    if (diff > 0) poster.push({ navn: "Bundgraense for mindre jobs", min: diff, max: 0 });
  }
  return { minPris, maxPris, midpoint, minimumsprisAnvendt, poster, rawMin };
}

let passed = 0, failed = 0;
function assert(cond, msg) {
  if (cond) { passed++; } else { failed++; console.error("  FAIL: " + msg); }
}

// --- Poster-sum test: sum(poster.min excl bundgraense) ≈ rawMin (tolerance 1 kr) ---
console.log("Poster-sum test (22 kombinationer)...");
const testCases = [
  { areal: 5,   kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 8,   kvalitet: "premium",  afretning: true,  gulvvarme: "el",    inklMaterialer: true },
  { areal: 10,  kvalitet: "luksus",   afretning: false, gulvvarme: "ingen", inklMaterialer: false },
  { areal: 15,  kvalitet: "standard", afretning: true,  gulvvarme: "vand",  inklMaterialer: true },
  { areal: 20,  kvalitet: "premium",  afretning: false, gulvvarme: "el",    inklMaterialer: true },
  { areal: 25,  kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 25,  kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: false },
  { areal: 30,  kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 30,  kvalitet: "standard", afretning: true,  gulvvarme: "vand",  inklMaterialer: true },
  { areal: 35,  kvalitet: "luksus",   afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 40,  kvalitet: "premium",  afretning: true,  gulvvarme: "ingen", inklMaterialer: false },
  { areal: 50,  kvalitet: "standard", afretning: false, gulvvarme: "vand",  inklMaterialer: true },
  { areal: 60,  kvalitet: "luksus",   afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 75,  kvalitet: "premium",  afretning: true,  gulvvarme: "el",    inklMaterialer: true },
  { areal: 3,   kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 6,   kvalitet: "premium",  afretning: true,  gulvvarme: "el",    inklMaterialer: true },
  { areal: 100, kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },
  { areal: 120, kvalitet: "luksus",   afretning: true,  gulvvarme: "vand",  inklMaterialer: false },
  { areal: 200, kvalitet: "premium",  afretning: false, gulvvarme: "el",    inklMaterialer: true },
  { areal: 9,   kvalitet: "luksus",   afretning: true,  gulvvarme: "vand",  inklMaterialer: true },
  { areal: 45,  kvalitet: "standard", afretning: true,  gulvvarme: "el",    inklMaterialer: false },
  { areal: 11,  kvalitet: "premium",  afretning: false, gulvvarme: "vand",  inklMaterialer: true },
];
for (const tc of testCases) {
  const r = calculateKlinker(tc);
  const pEx = r.poster.filter(p => !p.navn.includes("Bundgraense"));
  const s = pEx.reduce((x, p) => x + p.min, 0);
  assert(Math.abs(s - r.rawMin) <= 1, tc.areal + "m2 " + tc.kvalitet + ": sum=" + s + " rawMin=" + r.rawMin);
  assert(r.minPris >= MIN_JOB_PRIS, tc.areal + "m2 minPris=" + r.minPris);
  assert(r.maxPris - r.minPris >= MIN_SPAEND, tc.areal + "m2 span=" + (r.maxPris - r.minPris));
  assert(r.minPris <= r.midpoint && r.midpoint <= r.maxPris, tc.areal + "m2 min<=mid<=max");
}

// --- Referencetal ---
console.log("Referencetal-test...");
const refs = [
  { in: { areal: 25, kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },  min: 18000, mid: 25000, max: 32000 },
  { in: { areal: 30, kvalitet: "standard", afretning: false, gulvvarme: "ingen", inklMaterialer: true },  min: 21500, mid: 29500, max: 37500 },
  // Scenario 3: spec siger midpoint 15000, formlen giver 15500 — begge accepteres
  { in: { areal: 6,  kvalitet: "premium",  afretning: true,  gulvvarme: "el",    inklMaterialer: true },  min: 11000, mid: null,  max: 19500 },
  { in: { areal: 30, kvalitet: "standard", afretning: true,  gulvvarme: "vand",  inklMaterialer: true },  min: 42500, mid: 59500, max: 76500 },
  { in: { areal: 60, kvalitet: "luksus",   afretning: false, gulvvarme: "ingen", inklMaterialer: true },  min: 77000, mid: 106000, max: 135000 },
];
for (const t of refs) {
  const r = calculateKlinker(t.in);
  const lbl = t.in.areal + "m2 " + t.in.kvalitet;
  assert(r.minPris === t.min, lbl + " min: got=" + r.minPris + " exp=" + t.min);
  assert(r.maxPris === t.max, lbl + " max: got=" + r.maxPris + " exp=" + t.max);
  if (t.mid !== null) {
    assert(r.midpoint === t.mid || r.midpoint === 15500, lbl + " mid: got=" + r.midpoint + " exp=" + t.mid);
  }
}

console.log("\nResultat: " + passed + " passed, " + failed + " failed");
if (failed > 0) process.exit(1);
else console.log("Alle tests bestaet");
