import { test, expect } from "@playwright/test";

const CALCULATORS = [
  { name: "solceller",    path: "/solceller" },
  { name: "badevaerelse", path: "/badevaerelse" },
  { name: "maler",        path: "/maler" },
  { name: "gulv",         path: "/gulv" },
  { name: "isolering",    path: "/isolering" },
];

for (const { name, path } of CALCULATORS) {
  test(`${name}: samtykke-checkbox virker og formular kan indsendes`, async ({ page }) => {
    await page.route("/api/leads", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true, source_ref: "test-uuid" }) })
    );
    await page.route("/api/track/**", (route) => route.fulfill({ status: 200, body: "{}" }));

    await page.goto(path);

    // Klik på CTA-knappen for at åbne leadformularen
    await page.getByRole("button", { name: /gratis tilbud/i }).click();

    // Udfyld felterne — brug formular-scope for at undgå konflikt med kalkulator-felter
    const form = page.locator("form");
    await form.getByPlaceholder("Dit fulde navn").fill("Test Bruger");
    await form.getByPlaceholder("12 34 56 78").fill("12345678");
    await form.getByPlaceholder("din@email.dk").fill("test@test.dk");
    await form.getByPlaceholder("2100").fill("2100");

    const checkbox = page.locator('input[name="samtykke"]');

    // Bekræft ikke-afkrydset ved start
    await expect(checkbox).not.toBeChecked();

    // Klik på LABELTEKSTEN (ikke inputtet) → skal blive true
    const label = page.locator(`label[for="${await checkbox.getAttribute("id")}"]`);
    await label.click();
    await expect(checkbox).toBeChecked();

    // Klik igen → skal blive false
    await label.click();
    await expect(checkbox).not.toBeChecked();

    // Sæt true og indsend
    await label.click();
    await expect(checkbox).toBeChecked();

    await form.getByRole("button", { name: /send anmodning/i }).click();

    // Kvitteringstilstand
    await expect(page.getByText(/tak — vi kontakter dig snart/i)).toBeVisible();
  });
}
