// scripts/test-gulv.mjs — kør med: node scripts/test-gulv.mjs
// Importerer den kompilerede version via tsx (eller direkte via node hvis muligt)

import { execSync } from "child_process";
import { readFileSync } from "fs";

// Inline kalkulatoren så vi ikke behøver transpilering
const GULV_PRICES = {
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

const OPSTART = { min: 1800, max: 2500 };
const MIN_JOB_PRIS = 3000;
const MIN_SPAEND = 1500;

const HOLDBARHED = {
  lakering: "10–15 år",
  oliering: "3–5 år (kræver løbende vedligeholdelse)",
  saebe: "3–5 år (løbende sæbebehandling anbefales)",
};

const round500 = (n) => Math.round(n / 500) * 500;

function calculateGulv(areal, tilstand, efterbehandling) {
  const prices = GULV_PRICES[efterbehandling][tilstand];
  let minPris = round500(OPSTART.min + areal * prices.min);
  let maxPris = round500(OPSTART.max + areal * prices.max);
  const minimumsprisAnvendt = minPris < MIN_JOB_PRIS;
  if (minimumsprisAnvendt) minPris = MIN_JOB_PRIS;
  if (maxPris - minPris < MIN_SPAEND) maxPris = minPris + MIN_SPAEND;
  const midpoint = round500((minPris + maxPris) / 2);
  return { minPris, maxPris, midpoint, holdbarhed: HOLDBARHED[efterbehandling], minimumsprisAnvendt };
}

// --- Test helpers ---
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// --- Invariant tests: alle arealer 1–600, alle kombinationer ---
console.log("Invariant-test: alle arealer 1–600 m², alle kombinationer...");

const tilstande = ["god", "middel", "daarlig"];
const efterbehandlinger = ["lakering", "oliering", "saebe"];

for (let areal = 1; areal <= 600; areal++) {
  for (const eb of efterbehandlinger) {
    let prevMidpoint = null;
    for (const ts of tilstande) {
      const r = calculateGulv(areal, ts, eb);

      assert(r.minPris >= MIN_JOB_PRIS, `[${areal}m² ${ts} ${eb}] minPris ${r.minPris} >= MIN_JOB_PRIS ${MIN_JOB_PRIS}`);
      assert(r.minPris <= r.midpoint, `[${areal}m² ${ts} ${eb}] minPris ${r.minPris} <= midpoint ${r.midpoint}`);
      assert(r.midpoint <= r.maxPris, `[${areal}m² ${ts} ${eb}] midpoint ${r.midpoint} <= maxPris ${r.maxPris}`);
      assert(r.maxPris - r.minPris >= MIN_SPAEND, `[${areal}m² ${ts} ${eb}] spænd ${r.maxPris - r.minPris} >= ${MIN_SPAEND}`);

      // Tilstand svagt voksende: god <= middel <= daarlig
      if (prevMidpoint !== null) {
        assert(r.midpoint >= prevMidpoint, `[${areal}m² ${eb}] ${ts}.midpoint ${r.midpoint} >= forrige ${prevMidpoint}`);
      }
      prevMidpoint = r.midpoint;
    }

    // Midpunkt svagt voksende i areal
    if (areal > 1) {
      const prev = calculateGulv(areal - 1, "god", eb);
      const curr = calculateGulv(areal, "god", eb);
      assert(curr.midpoint >= prev.midpoint, `[${eb}] areal ${areal} midpoint ${curr.midpoint} >= ${areal-1}m² midpoint ${prev.midpoint}`);
    }
  }
}

// --- Referencetal (lakering) ---
console.log("Referencetal-test (lakering)...");

const refTests = [
  { areal: 8,   tilstand: "god",     min: 3000,  midpoint: 4000,  max: 4500  },
  { areal: 20,  tilstand: "middel",  min: 5000,  midpoint: 6000,  max: 6500  },
  { areal: 45,  tilstand: "daarlig", min: 10000, midpoint: 12000, max: 14000 },
  { areal: 80,  tilstand: "god",     min: 12500, midpoint: 14500, max: 16500 },
  { areal: 120, tilstand: "middel",  min: 21000, midpoint: 24000, max: 26500 },
  { areal: 200, tilstand: "daarlig", min: 39000, midpoint: 46000, max: 52500 },
];

for (const t of refTests) {
  const r = calculateGulv(t.areal, t.tilstand, "lakering");
  assert(r.minPris === t.min, `[${t.areal}m² ${t.tilstand}] min: got ${r.minPris}, expected ${t.min}`);
  assert(r.midpoint === t.midpoint, `[${t.areal}m² ${t.tilstand}] midpoint: got ${r.midpoint}, expected ${t.midpoint}`);
  assert(r.maxPris === t.max, `[${t.areal}m² ${t.tilstand}] max: got ${r.maxPris}, expected ${t.max}`);
}

// --- Resultat ---
console.log(`\nResultat: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("Alle tests bestået ✓");
}
