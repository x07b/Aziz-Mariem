import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", timeout: 30000, workers: 2,
  use: { baseURL: "http://localhost:3001", browserName: "chromium", headless: true },
  reporter: "list",
});
