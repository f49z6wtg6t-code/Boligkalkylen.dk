import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3002",
    headless: true,
  },
  webServer: {
    command: "node_modules/.bin/next dev --port 3002",
    port: 3002,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
